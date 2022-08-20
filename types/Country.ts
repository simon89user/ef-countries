export type Country = {
  alpha3Code: string;
  name: string;
  flags: { png: string; svg: string };
  capital: string;
  population: string;
  region: string;
  nativeName: string;
  topLevelDomain: string[];
  currencies: Currency[];
  languages: language[];
  subregion: string;
  borders: string[];
};

export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export type language = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};
