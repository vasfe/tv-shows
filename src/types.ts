export type ShowInfo = {
  score: number;
  show: Show;
}

type Show = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite?: any;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network;
  webChannel?: any;
  dvdCountry?: any;
  externals: Externals;
  image: Image;
  summary: string;
  updated: number;
  _links: Links;
}

type Links = {
  self: Self;
  previousepisode: Self;
}

type Self = {
  href: string;
}

type Image = {
  medium: string;
  original: string;
}

type Externals = {
  tvrage: number;
  thetvdb: number;
  imdb: string;
}

type Network = {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
}

type Country = {
  name: string;
  code: string;
  timezone: string;
}

type Rating = {
  average?: any;
}

type Schedule = {
  time: string;
  days: string[];
}

export type EpisodeInfo = {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  rating: Rating;
  image: Image;
  summary: string;
  _links: EpisodeLinks;
}

type EpisodeLinks = {
  self: Self;
  show: Self;
}

export type CastMemberInfo = {
  person: Person;
  character: Character;
  self: boolean;
  voice: boolean;
}

type Character = {
  id: number;
  url: string;
  name: string;
  image: Image;
}

type Person = {
  id: number;
  url: string;
  name: string;
  country: Country;
  birthday: string;
  deathday?: any;
  gender: string;
  image: Image;
  updated: number;
}

