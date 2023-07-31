import React, { useEffect, useState } from "react";

const SearchWeather = () => {
  const [search, setSearch] = useState("jakarta");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=9cebc13b78cf080fe5e14eaac5784f0b`
      );
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
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
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main == "Thunderstorm") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main == "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main == "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main == "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>...loading</div>;
  }

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  //   date
  let d = new Date(data.dt * 1000);
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  //   time
  let time = d.toLocaleString([], {
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

  return (
    <>
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card text-white text-center border-0 ">
                <img
                  src={`https://source.unsplash.com/600x500/?${data.weather[0].main}`}
                  className="card-img"
                  alt="..."
                />
                <div className="card-img-overlay">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-4 w-full mx-auto">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search City"
                        aria-label="Search City"
                        aria-describedby="basic-addon2"
                        name="search"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="input-group-text"
                        id="basic-addon2"
                      >
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </form>
                  <div className="bg-dark bg-opacity-50 py-3">
                    <h2 className="card-title">{data.name}</h2>
                    <p className="card-text lead">
                      {day}, {month} {date}, {year}
                      <br />
                      {nd.toLocaleString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                    <hr />
                    <i className={`fas ${emoji} fa-4x`}></i>
                    <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
                    <div className="lead fw-bolder mb-0">
                      {data.weather[0].main}
                    </div>
                    <p className="lead">
                      {temp_min} &deg;C | {temp_max} &deg;C
                    </p>
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

export default SearchWeather;
