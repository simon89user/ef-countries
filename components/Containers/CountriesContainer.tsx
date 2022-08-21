import { Country } from "../../types/Country";
import CountryCard from "../Cards/CountryCard";
import InfiniteScroll from "react-infinite-scroller";
import { useEffect, useState } from "react";
import styles from "../../styles/CountriesContainer.module.scss";

const CountriesSection = ({ countries }: { countries: Country[] | [] }) => {
  const [countryList, setCountryList] = useState<Country[] | []>([]);
  let content;

  let partialListOfCountries: Country[];
  useEffect(() => {
    if (countries) {
      partialListOfCountries =
        countries.length > 20 ? countries.slice(0, 20) : countries;
    }
    setCountryList((prevState) => (prevState = partialListOfCountries));
  }, [countries]);

  const handleLoadMore = () => {
    setCountryList((prevState) => (prevState = countries));
  };

  if (countryList.length === 0) {
    content = (
      <div className="row">
        <div className="col-12">
          <div className={styles.noCountryFounded}>
            <p>
              Sorry, no country founded
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <InfiniteScroll
        className="row"
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {countryList &&
          countryList.map((country) => (
            <div key={country.alpha3Code} className="col-12 col-lg-3">
              <CountryCard country={country} />
            </div>
          ))}
      </InfiniteScroll>
    );
  }

  return (
    <>
      <div className="container-fluid">{content}</div>
    </>
  );
};

export default CountriesSection;
