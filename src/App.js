import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [singleCity, setSingleCity] = useState("");
  const [submit, setSubmit] = useState(false);
  const feachCounties = async () => {
    try {
      const country = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      setCountries(country.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCity = (country) => {
    setSubmit(false);
    setSingleCity(null);
    setSingleCountry(country);
    const findCity = countries.find((c) => c.country === country);
    setCities(findCity.cities);
  };

  const submitHandl = () => {
    if (singleCountry && singleCity) {
      setSubmit(true);
    }
  };
  useEffect(() => {
    feachCounties();
  }, []);
  return (
    <div className="App">
      <div className="App-Header">
        <h1>Select Your Hometown</h1>

        <div>
          {countries && (
            <select
              onChange={(e) => fetchCity(e.target.value)}
              value={singleCountry}
            >
              <option disabled selected hidden>
                select country
              </option>
              {countries.map((country) => (
                <option key={`${country.country}}`} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          )}

          {cities && (
            <select
              onChange={(e) => setSingleCity(e.target.value)}
              value={singleCity}
            >
              <option disabled selected hidden>
                select city
              </option>
              {cities.map((city) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
          <button onClick={submitHandl}>Go</button>
        </div>
        {submit && (
          <h3>
            Your country {singleCountry} and your city is {singleCity}
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
