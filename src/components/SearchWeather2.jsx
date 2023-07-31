import React, { useState, useEffect } from "react";
import "../components/Elements.css";

const SearchWeather2 = () => {
  const [search, setSearch] = useState("jakarta");
  const [data, setData] = useState({});
  const [input, setInput] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=9cebc13b78cf080fe5e14eaac5784f0b`
      );
      if (componentMounted) {
        const result = await response.json();
        setData(result);
        setDataLoaded(true);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  };

  let emoji = null;
  if (dataLoaded && typeof data.main !== "undefined") {
    if (data.weather[0].main === "Clouds" || data.weather[0].main === "Clear") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main === "Rain") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main === "Snow") {
      emoji = "fa-snow-flake";
    } else if (data.weather[0].main === "Haze") {
      emoji = "fa-cloud-meatball";
    } else {
      emoji = "fa-smog";
    }
  }

  let temp,
    temp_min,
    temp_max,
    date,
    year,
    month,
    day,
    time = "";

  if (dataLoaded && typeof data.main !== "undefined") {
    temp = (data.main.temp - 273.15).toFixed(2);
    temp_min = (data.main.temp_min - 273.15).toFixed(2);
    temp_max = (data.main.temp_max - 273.15).toFixed(2);

    //   date
    let d = new Date(data.dt * 1000);
    date = d.getDate();
    year = d.getFullYear();
    month = d.toLocaleString("default", { month: "long" });
    day = d.toLocaleString("default", { weekday: "long" });

    //   time
    time = d.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    let timezoneOffsetInSeconds = data.timezone;

    //   calculate destination city time
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let destinationCityTime = utc + timezoneOffsetInSeconds * 1000;
    let nd = new Date(destinationCityTime);

    time = nd.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <>
      <div className="container z-2">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="search"
                  className="glassmorph"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  autoComplete="off"
                  required
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </form>
            <div className="py-3 text-white">
              {dataLoaded && typeof data.main !== "undefined" ? (
                <>
                  <div className="text-center">
                    <div className="lead fw-bolder fw-semibold mb-3 mt-2">
                      {data.weather[0].main}
                    </div>
                    <i className={`fas fw-bold ${emoji} fa-8x`}></i>
                    <p className="lead mt-3">{time}</p>
                  </div>
                  <div className="d-flex justify-content-between col-md-12">
                    <div className="text-left">
                      <h2 className="city-head">{data.name}</h2>
                      <p className="text-date lead fs-5 fw-normal">
                        {month} {date}, {year}
                      </p>
                    </div>

                    <div className="text-end">
                      <h2 className="celcius-head">{temp}&deg;</h2>
                      <p className="text-date lead fs-5 fw-normal">
                        {temp_min} &deg; / {temp_max} &deg;
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p>Data not found. Please try another search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchWeather2;
