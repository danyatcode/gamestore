export type DataProps = {
    id: number,
    name: string,
    language: string,
    games_count: number,
    background_image: string,
    rating: number,
    genres: Genre[],
    platforms: Platform[],
    image: string
}

export type State = {
    games: List,
    selectedGame: SelectedGame,
    query: searchQuery
}
interface searchQuery{
    searchQuery: string | number | readonly string[] | undefined,
}

export type List = {
    list: DataProps[] 
}
export type GenreList = {
    list: games[]
}

export type SelectedGame = {
    id: number,
    name: string,
    description_raw: string,
    background_image: string,
    genres: Genre[],
    developers: Developer[],
    released: string,
    platforms: Platform[],
    stores: Store[],
}

type Developer = {
    name: string
}
type games = {
    name: string,
    id: number
}

interface Screeshot{
    image: string
}
interface Genre {
    name: string[];
}
interface Platform{
    platform: {
        slug: string
    }
}
interface Store{
    store: {
        slug: string,
        domain: string
    }
}