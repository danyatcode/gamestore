import axios, {AxiosResponse} from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGames } from '../redux/actions/game-actions';
import { IoStarSharp } from 'react-icons/io5'
import { BsNintendoSwitch, BsPlaystation, BsSteam, BsXbox } from 'react-icons/bs'
import { DataProps } from '../redux/constants/types';


type List = {
    list: DataProps[] 
}

type State = {
    games: List,
    selectedGame: DataProps,
}


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
            // console.log(data.results)
            dispatch(setGames(data))
            setTotalImages(data.results.length)
        } catch(error){
            console.error(error)
        }
    }
    React.useEffect(() => {
        fetchData(); 
    }, [])

  return (
    <div className='item-list'>

      {/* {loadedImg !== totalImages && <div className="loading">...Loading</div>} */}
      
      {games.list.map( game =>{ 
           
            const genres = game.genres.map( genre => genre.name);

            const parentPlatforms = game.parent_platforms.map( (platforms, i) => {
                switch(platforms.platform.slug){
                    case "pc": return <BsSteam key={i} />
                    case "playstation": return <BsPlaystation key={i} />
                    case "xbox": return <BsXbox key={i} />
                    case "nintendo": return <BsNintendoSwitch key={i} />
                }
            });

            return <div key={game.id} className='item'>
                <div className='item-img-div'>
                    <img className='item-img' src={`${game.background_image}`} onLoad={handleImageLoad}/>
                </div>
                <div className='item-info'>
                    <h4 className='item-title'>{game.name}</h4>
                    <span className='item-genres'>{genres.join(', ').toUpperCase()}</span>
                    <p style={{display: 'flex', alignItems: "center", fontSize: "24px"}}><IoStarSharp style={{marginRight: "15px", fontSize: "24px"}} /> {game.rating}</p>
                    <span className='item-platforms'>{parentPlatforms}</span>
                </div>
            </div>})
        }

    </div>
  )
}

export default Home
