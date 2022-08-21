import type { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import CountriesContainer from "../components/Containers/CountriesContainer";
import FiltersContainer from "../components/Containers/FiltersContainer";
import { Country } from "../types/Country";

const Home = ({
  countries,
  regions,
}: {
  countries: Country[] | [];
  regions: string[] | [];
}) => {
  const [countriesDisplayed, setCountriesDisplayed] = useState(countries);
  const handleFilterSearch = (query: string | null, type: string) => {
    if (!query) {
      return setCountriesDisplayed((prevState) => {
        return (prevState = countries ?? null);
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
      return (prevState = countriesFind ?? []);
    });
  };

  return (
    <>
      <Head>
        <title>EF Countries Informations</title>
        <meta
          name="description"
          content="An amazing web app providing usefull informations about countries worldwide "
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Simon Bekishev" />
        <meta name="robots" content="noindex,nofollow"/>
        <link
          rel="canonical"
          href="https://ef-countries.vercel.app"
        />
      </Head>
      <FiltersContainer
        handleFilterSearch={handleFilterSearch}
        regions={regions}
      />
      <CountriesContainer countries={countriesDisplayed} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://restcountries.com/v2/all");
  if (response.ok) {
    const countries: Country[] = await response.json();

    const regions: string[] = [];
    countries.forEach((country) => {
      if (!regions.includes(country.region)) {
        regions.push(country.region);
      }
    });

    return {
      props: {
        countries,
        regions,
      },
    };
  } else {
    return {
      props: {
        countries: [],
        regions: [],
      },
    };
  }
};

export default Home;
