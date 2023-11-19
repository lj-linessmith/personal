export interface Album {
  id: number
  masterID: number
  masterURL: null | string
  resourceURL: string
  thumb: string
  coverImage: string
  title: string
  year: number
  formats: Format[]
  artists: Artist[]
  labels: Label[]
  genres: string[]
  styles: string[]
}

export interface Release {
  id: number
  instanceID: number
  dateAdded: Date
  rating: number
  basicInformation: Album
}

export interface Artist {
  name: string
  anv: Anv
  join: Join
  role: string
  tracks: string
  id: number
  resourceURL: string
}

export enum Anv {
  Bowie = 'Bowie',
  Empty = '',
  HueyLewisAndTheNews = 'Huey Lewis And The News',
  Matchbox20 = 'Matchbox 20',
  MrBruce = 'Mr. Bruce',
  Tchaikovsky = 'Tchaikovsky',
  ViennaFestivalOrchestra = 'Vienna Festival Orchestra',
}

export enum Join {
  Empty = '',
  Join = ',',
}

export interface Format {
  name: Name
  qty: string
  descriptions: string[]
  text?: string
}

export enum Name {
  AllMedia = 'All Media',
  BoxSet = 'Box Set',
  Cassette = 'Cassette',
  Vinyl = 'Vinyl',
}

export interface Label {
  name: string
  catno: string
  entityType: string
  entityTypeName: EntityTypeName
  id: number
  resourceURL: string
}

export enum EntityTypeName {
  Label = 'Label',
}
