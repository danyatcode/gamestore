import axios, {AxiosResponse} from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectedGame, setGames } from '../redux/actions/game-actions';
import { IoStarSharp } from 'react-icons/io5'
import { BsNintendoSwitch, BsPlaystation, BsXbox } from 'react-icons/bs'
import { List, State } from '../redux/constants/types';
import { Link } from 'react-router-dom';
import { RiComputerLine } from 'react-icons/ri';
import { SiPlaystation2, SiPlaystation3, SiPlaystation4, SiPlaystation5 } from 'react-icons/si';



const Home = (): JSX.Element => {

    const [totalImages, setTotalImages] = useState<number>(0);
    const [loadedImg, setLoadedImg] = useState<number>(0);

    const games = useSelector<State, List>((state: State) => state.games)

    const dispatch = useDispatch();

    const handleImageLoad = () => {
        setLoadedImg((prevCount) => prevCount + 1);
    }

    const fetchData = async() => {
        try{
            const res = await axios.get("https://api.rawg.io/api/games?key=242593db55b54d9089bab37814ec14a4&page=4&page_size=20") as AxiosResponse;    
            const data = res.data;

            dispatch(setGames(data));

            setTotalImages(data.results.length);
        } catch(error){
            console.error(error)
        }
    }
    React.useEffect(() => {
        fetchData(); 
    }, [])
    // console.log(games)
  return (
    <div className='item-list'>

      {loadedImg !== totalImages && <div className="loading"><div className='loader'></div></div>}
      
      {games.list.map( (game) =>{ 
           
            const genres = game.genres.map( genre => genre.name);

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

            return <div key={game.id} className='item'>
                <div className='item-img-div'>
                    <Link to={`/game/${game.id}`} onClick={() => dispatch(selectedGame(game))}>
                        <img className='item-img' src={`${game.background_image}`} onLoad={handleImageLoad}/>
                    </Link>
                </div>
                <div className='item-info'>

                    <Link to={`/game/${game.id}`} onClick={() => dispatch(selectedGame(game))}>
                        <h4 className='item-title'>{game.name}</h4>
                    </Link>

                    <span className='item-genres'>{genres.join(', ').toUpperCase()}</span>

                    <p style={{display: 'flex', alignItems: "center", fontSize: "24px"}}>
                        <IoStarSharp style={{marginRight: "15px", fontSize: "24px"}} />
                        {game.rating}
                    </p>

                    <span className='item-platforms'>{platforms}</span>
                </div>
            </div>})
        }

    </div>
  )
}

export default Home
