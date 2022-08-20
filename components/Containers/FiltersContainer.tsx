import React, { useRef } from "react";
import styles from "../../styles/FiltersContainer.module.scss";

const FiltersContainer = ({
  handleFilterSearch,
}: {
  handleFilterSearch: (query: string | null, type:string) => void;
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const regionSelectRef = useRef<HTMLSelectElement>(null);

  const handleChangeFilterInput = (type: string) => {
    type === "country"
      ? handleFilterSearch(searchInputRef.current?.value!, type)
      : handleFilterSearch(regionSelectRef.current?.value!, type);

    if (type === "country") {
      const countryToFind = searchInputRef.current?.value!;
      handleFilterSearch(countryToFind, type);
    } else if (type === "region") {
      const regionChosen = regionSelectRef.current?.value!;
      handleFilterSearch(regionChosen, type);
    }
    return;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className={styles.filtersContainer}>
            <div className="row">
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for a country"
                  onChange={() => handleChangeFilterInput("country")}
                  ref={searchInputRef}
                />
              </div>
              <div className="col-lg-2 offset-lg-8">
                <select
                  onChange={() => handleChangeFilterInput("region")}
                  className="form-select"
                  aria-label="Select a region"
                  ref={regionSelectRef}
                >
                  <option disabled selected>Filter By Region</option>
                  <option value="Africa">Africa</option>
                  <option value="America">America</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersContainer;
