export type DataProps = {
    id: number,
    name: string,
    language: string,
    games_count: number,
    background_image: string,
    rating: number,
    genres: Genre[],
    parent_platforms: Platform[]
}

interface Genre {
    name: string[];
}
interface Platform{
    platform: {
        slug: string
    }
}
