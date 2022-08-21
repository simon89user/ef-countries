import { GetStaticProps } from "next";
import BackNavigation from "../../components/layout/BackNavigation";
import { Country } from "../../types/Country";
import Image from "next/image";
import styles from "../../styles/[code].module.scss";
import Link from "next/link";
import logo from "../../public/vercel.svg";

const Country = ({
  country,
  borderCountries,
}: {
  country: Country;
  borderCountries: { name: string; code: string }[];
}) => {
  return (
    <>
      <BackNavigation />
      <div className="container">
        <div className={styles.countryContainer}>
          <div className="row">
            <div className="col-lg-6">
              <div className={styles.imageContainer}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={country.flags?.png ?? logo}
                    layout="fill"
                    className={styles.image}
                    priority
                    alt={`${country.name} offical flag`}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className={
                  styles.informationContainer +
                  " d-flex h-100 flex-column justify-content-center"
                }
              >
                <div className={styles.titleWrapper}>
                  <h1 className={styles.title}>{country.name}</h1>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className={styles.detailsWrapper}>
                      <div className={styles.detail}>
                        <p>
                          <span className={styles.detailTitle}>
                            Native Name:{" "}
                          </span>
                          {country.nativeName ?? "unknown"}
                        </p>
                      </div>
                      <div className={styles.detail}>
                        <p>
                          <span className={styles.detailTitle}>
                            Population:{" "}
                          </span>
                          {country.population ?? "unknown"}
                        </p>
                      </div>
                      <div className={styles.detail}>
                        <p>
                          <span className={styles.detailTitle}>Region: </span>
                          {country.region ?? "unknown"}
                        </p>
                      </div>
                      <div className={styles.detail}>
                        <p>
                          <span className={styles.detailTitle}>
                            Sub region:{" "}
                          </span>
                          {country.subregion ?? "unknown"}
                        </p>
                      </div>
                      <div className={styles.detail}>
                        <p>
                          <span className={styles.detailTitle}>Capital: </span>
                          {country.capital ?? "unknown"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className={styles.detailsWrapper}>
                      <div className={styles.detail}>
                        <p>
                          <span className={styles.detailTitle}>
                            Top Level Domain:
                          </span>{" "}
                          {country.topLevelDomain ?? "unknown"}
                        </p>
                      </div>
                      <div className={styles.detail}>
                        <p>
                          <span className={styles.detailTitle}>
                            Currencies:
                          </span>{" "}
                          {country.currencies
                            ?.map((currency) => currency.name)
                            .join(", ")}
                        </p>
                      </div>
                      <div className={styles.detail}>
                        <p>
                          <span className={styles.detailTitle}>
                            Languages:{" "}
                          </span>
                          {country.languages
                            ?.map((language) => language.name)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className={styles.borderWrapper}>
                    <div className="d-flex flex-column flex-lg-row">
                      <div>
                        <p style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                          Border Countries:{" "}
                        </p>
                      </div>
                      <div className={styles.borderInnerDiv}>
                        {borderCountries.map((border) => (
                          <Link
                            key={border.code}
                            href={`/countries/${border.code}`}
                          >
                            <a
                              className={
                                styles.btnBorder +
                                " btn btn-light theming-bg-dark"
                              }
                            >
                              {border.name}
                            </a>
                          </Link>
                        ))}
                        {borderCountries.length === 0 && (
                          <p>None, this is an island</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const response = await fetch("https://restcountries.com/v2/all");

  if (!response.ok) {
    throw new Error("Fail to fetch Api");
  }

  let countries: Country[] = await response.json();

  let countryCodes = countries.map(
    (country) => `/countries/${country.alpha3Code.toLowerCase()}`
  );

  return {
    paths: countryCodes,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const countryParam = context!.params?.code;
  if (!countryParam) return { notFound: true };

  const response = await fetch(
    `https://restcountries.com/v2/alpha/${countryParam}`
  );

  if (!response.ok) {
    return { notFound: true };
  }

  const country: Country = await response.json();
  if (!country) return { notFound: true };

  const responseAll = await fetch("https://restcountries.com/v2/all");

  if (!responseAll.ok) {
    throw new Error("Fail to fetch Api");
  }

  let countries: Country[] = await responseAll.json();

  let borderCountries: { name: string; code: string }[] = [];

  country.borders?.forEach((border: string) => {
    const countryDetail = countries.filter(
      (country) => country.alpha3Code.toLowerCase() === border.toLowerCase()
    );
    borderCountries.push({
      name: countryDetail[0].name,
      code: countryDetail[0].alpha3Code.toLowerCase(),
    });
  });

  return {
    props: {
      country,
      borderCountries,
    },
  };
};

export default Country;
