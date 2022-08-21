import Image from "next/image";
import Link from "next/link";
import { Country } from "../../types/Country";
import styles from "../../styles/CountryCard.module.scss";

const CountryCard = ({
  country,
  index,
}: {
  country: Country;
  index: number;
}) => {
  return (
    <div className={styles.countryCard}>
      <div className={styles.imageWrapper}>
        <Image
          alt={`${country.name} official flag`}
          layout="fill"
          priority={[0, 1].includes(index) ? true : false}
          quality={40}
          src={country.flags.png}
        />
      </div>
      <div className={styles.detailsWrapper+" theming-bg-dark"}>
        <div className={styles.countryTitleWrapper}>
          <Link
            href={`/countries/${country.alpha3Code.toLowerCase()}`}
            passHref
          >
            <a className={styles.countryTitle}>{country.name}</a>
          </Link>
        </div>

        <div className={styles.details}>
          <p>
            <span className={styles.detailTitle}>Population: </span>
            {country.population ?? "unknown"}
          </p>
        </div>

        <div className={styles.details}>
          <p>
            <span className={styles.detailTitle}>Capital: </span>
            {country.capital ?? "unknown"}
          </p>
        </div>
        <div className={styles.details}>
          <p>
            <span className={styles.detailTitle}>Region: </span>
            {country.region ?? "unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
