import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataProps, State } from '../redux/constants/types'
import axios, { AxiosResponse } from 'axios'
import { removeSelectedGame, selectedGame } from '../redux/actions/game-actions'
import { useParams } from 'react-router'
import { BsNintendoSwitch, BsSteam, BsXbox } from 'react-icons/bs'
import { RiComputerLine } from 'react-icons/ri'
import { SiPlaystation2, SiPlaystation3, SiPlaystation4, SiPlaystation5 } from 'react-icons/si'
import {TbBrandXbox } from 'react-icons/tb'

const SelectedGame = ():JSX.Element => {
    const [gamesData, setGamesData] = React.useState<DataProps[]>()

    const game = useSelector((state: State) => state.selectedGame);

    const { gameID } = useParams();

    const dispatch = useDispatch();

    const fetchData = async() => {
        try{
            const res = await axios.get(`https://api.rawg.io/api/games/${gameID}?key=242593db55b54d9089bab37814ec14a4`) as AxiosResponse;    
            const data = res.data;
            dispatch(selectedGame(data))
        } catch(error){
            console.error(error)
        }
    }
    const fetchSecondData = async() => {
        try{
            const res = await axios.get(`https://api.rawg.io/api/games?key=242593db55b54d9089bab37814ec14a4&page=4&page_size=20`) as AxiosResponse;    
            const data = res.data;
            setGamesData(data.results)
        } catch(error){
            console.error(error)
        }
    }
    React.useEffect(() => {
        if(gameID && gameID !== '') {
            fetchData() 
            fetchSecondData()
        }; 
        return () => {
            dispatch(removeSelectedGame())
        }
    }, [gameID])

    const gallery = gamesData?.filter(res => res.name === game.name)[0]?.short_screenshots?.map( (screenshot, i) => <a key={i} href={screenshot.image} target="value"><img  src={screenshot.image} alt="game screenshot" /></a>);
    const genres = game?.genres?.map( genre => genre.name).join(', ');
    const developers = game?.developers?.map( developer => developer.name).join(', ');
    const descriptArray = game?.description_raw?.split('.');

    console.log(gallery)

    let descr = '';

    for (let i = 0; i < descriptArray?.length; i++) {
        if (i % 5 === 0 && i !== 0) {
            descr += '. <hr />';
        }
        descr += descriptArray[i];
    }

    if(descr)document.getElementsByClassName('selected-game-descr')[0].innerHTML = descr;

    const platforms = game?.platforms?.map( (platforms, i) => {
        switch(platforms.platform.slug){
            case "pc": return <RiComputerLine key={i} />
            case "playstation2": return <SiPlaystation2 key={i} />
            case "playstation3": return <SiPlaystation3 key={i} />
            case "playstation4": return <SiPlaystation4 key={i} />
            case "playstation5": return <SiPlaystation5 key={i} />
            case "xbox-one" || "xbox360": return <BsXbox key={i} />
            case "nintendo-switch": return <BsNintendoSwitch key={i} />
        }
    });

    const store = game?.stores?.map( (store, i) => {
        switch(store.store.slug){
            case "steam": return <a className='store-links' href={'https://' + store.store.domain} key={i} target='value'><BsSteam /></a>
            case "playstation-store": return <a className='store-links' href={'https://' + store.store.domain} key={i} target='value'><SiPlaystation5 /></a>
            case "xbox-store": return <a className='store-links' href={'https://' + store.store.domain} key={i} target='value'><TbBrandXbox /></a>
            case "xbox360": return <a className='store-links' href={'https://' + store.store.domain} key={i} target='value'><BsNintendoSwitch /></a>
        }
    });

  return (
    <div className='game'>
        <div className='row'>
            <div className='selected-game-img-div'>
                <img loading='lazy' alt={game.name} src={game.background_image} className='selected-game-image'/>
            </div>
            <div className='selected-game-info'>
                <h1 className='game-title'>{game.name}</h1>
                <div className='game-genres'>
                    Genres: <span>{genres}</span>
                </div>
                <div className='game-developers'>
                    Developed: <span>{developers}</span>
                </div>
                <div className='game-released'>
                    Release: <span>{game.released}</span>
                </div>
        
                <span className='platforms-title title'>Available On Platforms</span>
                <div className='item-platforms selected-game-platforms' style={{display: "flex", justifyContent: "center"}}>
                    {platforms}
                </div>
            </div>
        </div>

        <div className='gallery'>{gallery}</div>

        <h2 className='description-title title'>Description </h2>

        <p className={`selected-game-descr`}></p>

        <h2 className='description-title title'>Store</h2>

        <p className={`selected-game-store`}>{store}</p>

        
    </div>
  )
}

export default SelectedGame
