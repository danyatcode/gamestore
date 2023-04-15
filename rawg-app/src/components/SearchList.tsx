import axios, {AxiosResponse} from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeGames, setGames } from '../redux/actions/game-actions';
import { BsNintendoSwitch, BsXbox } from 'react-icons/bs'
import { List, State } from '../redux/constants/types';
import { useParams } from 'react-router-dom';
import { RiComputerLine } from 'react-icons/ri';
import { SiPlaystation2, SiPlaystation3, SiPlaystation4, SiPlaystation5 } from 'react-icons/si';
import ListGame from './ListGame';
import Home from './Home';



const SearchList = (): JSX.Element => {

    const [totalImages, setTotalImages] = useState<number>(0);
    const [loadedImg, setLoadedImg] = useState<number>(0);

    const id = useParams();
    
    const games = useSelector<State, List>((state: State) => state.games)
    const query = useSelector((state) => state.query.searchQuery)

    const dispatch = useDispatch();

    const handleImageLoad = () => {
        setLoadedImg((prevCount) => prevCount + 1);
    }
    const fetchData = async() => {
        try{
            const res = await axios.get("https://api.rawg.io/api/games?search="+query+"&key=242593db55b54d9089bab37814ec14a4") as AxiosResponse;    
            console.log(res)
            const data = res.data;

            dispatch(setGames(data));

            setTotalImages(data.results.length );
        } catch(error){
            console.error(error)
        }
    }
    React.useEffect(() => {
        
        fetchData();
        return () => {
            dispatch(removeGames())
        }
    }, [])
    React.useEffect(() => {
        fetchData();
        return () => {
            dispatch(removeGames())
        }
    }, [query])
    React.useEffect(() => {
        return(
            setLoadedImg(0)
        )
    }, [id])
    console.log(games, query)
  return <div className='item-list'>

      {/* {loadedImg !== totalImages && <div className="loading"><div className='loader'></div></div>} */}
      
      {games?.list?.map( (game) =>{ 
           
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

            return <ListGame 
                key={game.id}
                game={game} 
                platforms={platforms} 
                genres={genres}
                handleImageLoad={handleImageLoad}
                dispatch={dispatch}
                totalImages={totalImages}
                loadedImg={loadedImg}
            />})
        }

    </div>
}

export default SearchList
