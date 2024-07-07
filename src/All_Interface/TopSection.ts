export interface State {
  err: boolean;

  totalPerson: number;
  counterPage: number;
  arrayAllLinks: [];
  allPeopleInfo: [];
  isLoad: boolean;
}
export interface ElementType {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: [];
  starships: [];
  url: string;
  vehicles: string;
}
