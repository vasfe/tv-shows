import { BehaviorSubject } from "rxjs";
import { EpisodeInfo, ShowInfo, CastMemberInfo } from "./types";

export const searchShows$ = new BehaviorSubject<ShowInfo[]>([]);
export const selected$ = new BehaviorSubject<ShowInfo | undefined>(undefined);
export const episodes$ = new BehaviorSubject<EpisodeInfo[]>([]);
export const cast$ = new BehaviorSubject<CastMemberInfo[] >([]);

// export const selectedShow$ = searchShows$.pipe(
//   map(shows => shows.filter(show => show.rating.average > 6)
//   )
// )

export const queryShow = (text: string) => {
    fetch(`https://api.tvmaze.com/search/shows?q=${text}`)
        .then(res => res.json())
        .then(data => searchShows$.next(data))
}

export const queryShowEpisodes = (id: number) => {
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
        .then(res => res.json())
        .then(data => episodes$.next(data))
}

export const queryShowCast = (id: number) => {
    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
        .then(res => res.json())
        .then(data => cast$.next(data))
}