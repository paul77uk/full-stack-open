import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const App = () => {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [displayCountries, setDisplayCountries] = useState([]);
  const [message, setMessage] = useState("");

  const getAllCountries = async () => {
    axios.get(`${baseUrl}all`).then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  };

  const getCountry = async (name) => {
    axios.get(`${baseUrl}name/${name}`).then((response) => {
      console.log(response.data);
      return response.data;
    });
  };

  useEffect(() => {
    console.log("filtered countries", filteredCountries);

    if (search === "") {
      setDisplayCountries([]);
      setMessage("");
    } else if (filteredCountries.length > 10) {
      setDisplayCountries([]);
      setMessage("Too many matches, specify another filter");
    } else {
      setDisplayCountries(filteredCountries);
      setMessage("");
    }
  }, [filteredCountries, search]);

  useEffect(() => {
    getAllCountries();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      <div>
        find countries{" "}
        <input type="text" value={search} onChange={handleSearchChange} />
      </div>
      <div>
        {message == ""
          ? displayCountries.map((country) => (
              <div key={country.name.common}>
                <div>{country.name.common}</div>
                {displayCountries.length === 1 && (
                  <>
                    <div>{country.capital}</div>
                    <div>{country.area}</div>
                    <div>{Object.values(country.languages).map(language => (<>
                    <div>{language}</div>
                    </>))}</div>
                  </>
                )}
              </div>
            ))
          : message}
      </div>
    </>
  );
};

export default App;
