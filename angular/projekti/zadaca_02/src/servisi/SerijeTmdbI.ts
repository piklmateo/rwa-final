export interface SerijeTmdbI {
    id: number;
    overview: String;
    original_title: String;
    name: String;
    page:number;
    results:Array<SerijeTmdbI>;
    total_pages:number;
    total_results:number;
}
export interface SerijaTmdbI {
    name:string;
    adult:boolean;
    backdrop_path:string;
    genre_ids:Array<number>;
    id:number;
    original_language:string;
    original_title:string;
    overview:string;
    popularity:number;
    poster_path:string;
    release_date:string;
    first_air_date:string;
    title:string;
    video:boolean;
    vote_average:number;
    vote_count:number;
    number_of_episodes:number;
    number_of_seasons:number;
    homepage:string;
}