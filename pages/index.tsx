import type { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import CountriesContainer from "../components/Containers/CountriesContainer";
import FiltersContainer from "../components/Containers/FiltersContainer";
import { Country } from "../types/Country";

const Home = ({ countries }: { countries: Country[] | [] }) => {
  const [countriesDisplayed, setCountriesDisplayed] = useState(countries);

  const handleFilterSearch = (query: string | null, type: string) => {
    if (!query) {
      return setCountriesDisplayed((prevState) => {
        return countries ?? null;
      });
    }

    let countriesFind: Country[] | undefined;

    if (type === "country") {
      countriesFind = countries?.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );
    } else if (type === "region") {
      countriesFind = countries?.filter((country) =>
        country.region.toLowerCase().includes(query.toLowerCase())
      );
    }

    setCountriesDisplayed((prevState) => {
    
      return countriesFind ?? [];
    });
  };

  return (
    <>
      <Head>
        <title>EF Countries</title>
        <meta
          name="description"
          content="An amazing webapp providing usefull informations about countries worldwide "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FiltersContainer handleFilterSearch={handleFilterSearch} />
      <CountriesContainer countries={countriesDisplayed} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://restcountries.com/v2/all");
  if (response.ok) {
    const countries: Country[] = await response.json();
    return {
      props: {
        countries: countries,
      },
    };
  } else {
    return {
      props: {
        countries: {},
      },
    };
  }
};

export default Home;
