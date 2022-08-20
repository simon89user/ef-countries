import { Country } from "../../types/Country";
import CountryCard from "../Cards/CountryCard";

const CountriesSection = ({ countries }: { countries: Country[] | null }) => {
  let content;
  if (!countries) {
    content = (
      <div>
        <p>Sorry, no country to display</p>
      </div>
    );
  } else {
    content = (
      <div className="container-fluid">
        <div className="row">
          {countries.map((country) => (
            <div className="col-12 col-lg-3">
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <>{content}</>;
};

export default CountriesSection;
