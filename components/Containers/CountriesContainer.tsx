import { Country } from "../../types/Country";
import CountryCard from "../Cards/CountryCard";
import InfiniteScroll from "react-infinite-scroller";
import { useEffect, useState } from "react";
import styles from "../../styles/CountriesContainer.module.scss";

const CountriesSection = ({ countries }: { countries: Country[] | [] }) => {
  const [countryList, setCountryList] = useState<Country[] | []>([]);
  let content;

  useEffect(() => {
    let partialListOfCountries: Country[];
    if (countries) {
      partialListOfCountries =
        countries.length > 12 ? countries.slice(0, 12) : countries;
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
          <div id="no-country-div" className={styles.noCountryFounded}>
            <p>Sorry, no country founded</p>
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
        loader={<div className="loader" key={0}></div>}
      >
        {countryList &&
          countryList.map((country, index) => (
            <div key={index} className="col-12 col-lg-3">
              <CountryCard country={country} index={index} />
            </div>
          ))}
      </InfiniteScroll>
    );
  }

  return (
      <div className="container-fluid" id="countries-container">{content}</div>
  );
};

export default CountriesSection;
