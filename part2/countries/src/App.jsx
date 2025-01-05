import { useState, useEffect } from "react";
import axios from "axios";

export const CountryDetails = ({ country }) => {
  let languagesArray = [];

  for (const languageValue of Object.values(country.languages)) {
    languagesArray.push(languageValue);
  }

  return (
    <>
      <h2>{country.name.common}</h2>
      <div>
        <span>capital {country.capital[0]}</span> <br />
        <span>area {country.area}</span>
      </div>
      <div>
        <br />
        <strong>languages</strong>
        <ul>
          {languagesArray.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} alt="" />
    </>
  );
};

const App = () => {
  const [countrySearch, setCountrySearch] = useState("");
  const [countriesNames, setCountriesNames] = useState([]);
  const [countryDetails, setCountryDetails] = useState({});

  const handleCountrySearchChange = (event) => {
    setCountrySearch(event.target.value);
  };

  useEffect(() => {
    if (countrySearch) {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then(({ data }) => {
          const countryNames = data.map((country) =>
            country.name.common.toLowerCase()
          );

          const nameMatches = countryNames.filter((countryName) =>
            countryName.includes(countrySearch)
          );

          setCountriesNames(nameMatches);
        });
    }

    if (countriesNames.length === 1) {
      getCountryDetails(countriesNames[0]).then((countryDetails) => {
        setCountryDetails(countryDetails);
      });
    }
  }, [countrySearch]);

  const getCountryDetails = (countryName) => {
    const countryUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`;
    const request = axios.get(countryUrl);
    return request.then(({ data }) => {
      return data;
    });
  };

  const defineContent = () => {
    if (countriesNames.length === 1) {
      return Object.keys(countryDetails).length !== 0 ? (
        <CountryDetails country={countryDetails} />
      ) : (
        ""
      );
    } else if (countriesNames.length <= 10) {
      return countriesNames.map((countryName) => {
        return (
          <span key={countryName}>
            {countryName}{" "}
            <button onClick={() => handleShowCounty(countryName)}>show</button>{" "}
            <br />{" "}
          </span>
        );
      });
    } else {
      return "Too many maches, specify another filter";
    }
  };

  const handleShowCounty = (countryName) => {
    setCountrySearch(countryName);
    setCountriesNames([countryName]);
  };

  return (
    <div>
      <div>
        find countries{" "}
        <input
          onChange={handleCountrySearchChange}
          value={countrySearch}
          type="text"
        />{" "}
        <br />
        {defineContent()}
      </div>
    </div>
  );
};

export default App;
