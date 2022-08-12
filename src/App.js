import "./App.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbSearch } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import cloudy from "./assets/cloudy.svg";
import rainy from "./assets/rain.svg";
import sunny from "./assets/sunny.svg";
import serverRain from "./assets/severeRain.svg";
import partlyCloudy from "./assets/partlyCloudy.svg";
import scatteredThunderstorm from "./assets/scatteredThunderstorms.svg";
import rainIcon from "./assets/rainIcon.svg";
import { useEffect, useState } from "react";

function App() {
  const [weatherDetails, setWeatherDetails] = useState([]);
  const [city, setCity] = useState("Lahore");
  const [tempCity, setTempCity] = useState("Lahore");
  const [isFound, setIsFound] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (city) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "445593ac70msh0786922cd3f2c7cp153684jsne0ab32be161e",
        "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
      },
    };

    setIsLoading(true);

    const response = await fetch(
      `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`,
      options
    );
    // check if the city is found
    if (response.ok) {
      setIsLoading(false);
      setIsFound(true);
    } else {
      setIsFound(false);
    }
    return response;
  };

  const resetData = () => {
    setWeatherDetails([]);
    setCity("");
    setTempCity("");
  };

  const convertToCelsius = (temp) => {
    let newTemp = (temp - 32) * (5 / 9);
    newTemp = Math.round(newTemp);
    return newTemp;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTempCity(city);
    getWeatherDetails(city);
  };

  const getWeatherDetails = async (city) => {
    const response = await (await fetchData(city)).json();
    let i = 0;
    let updatedWeatherDetails = [];

    while (i < 5) {
      updatedWeatherDetails.push({
        day: response.forecasts[i].day,
        temp: convertToCelsius(response.forecasts[i].high),
        weather: response.forecasts[i].text,
      });
      i++;
    }
    setWeatherDetails(updatedWeatherDetails);
  };

  useEffect(() => {
    getWeatherDetails(city);
  }, []);

  return (
    <div className="App h-screen w-screen font-myFont">
      <div className="flex flex-col w-full h-auto space-y-24">
        <div className="flex flex-row justify-center mt-24 items-center w-full h-auto">
          <h1 className="text-4xl font-bold text-white">Weather Data</h1>
        </div>
        <div className="flex flex-row justify-center items-center w-full">
          <form className="w-6/12" onSubmit={handleSubmit}>
            <div className="flex flex-row items-center relative inputBg w-auto">
              <div className="inset-y-0 left-0 items-center pl-5 pointer-events-none">
                <HiOutlineLocationMarker className="text-white/80 text-3xl" />
              </div>
              <input
                type="text"
                placeholder="Enter a City"
                className="h-auto w-5/6 p-6 block bg-transparent text-white/80
              placeholder:text-white/60 focus:outline-none text-xl caret-white focus:text-white"
                onChange={(e) => setCity(e.target.value)}
              />
              <div className="flex flex-row ml-14 pr-5 inset-y-0 justify-end items-center cursor-pointer">
                <TbSearch
                  onClick={handleSubmit}
                  className="text-white/80 text-3xl cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
        {tempCity !== "" && (
          <div className="flex flex-row justify-center items-center w-full">
            <div className="flex flex-row justify-around items-center w-auto inputBg p-1">
              <h2 className="text-white/80 text-lg ml-2"> {tempCity} </h2>
              <IoIosClose
                onClick={resetData}
                className="text-white/80 text-3xl cursor-pointer"
              />
            </div>
          </div>
        )}
        <div className="flex md:flex-cols flex-col lg:flex-row justify-center">
          <div className="flex flex-row justify-center items-center space-x-10 px-36 py-2 w-9/12">
            {isLoading && (
              <h1 className="text-white/80 font-bold text-center text-lg">
                Loading...
              </h1>
            )}
            {isFound &&
              !isLoading &&
              weatherDetails.map((item, index) => (
                <div
                  key={index}
                  className="scale-100 ease-in duration-100 hover:scale-110 hover:ease-in hover:duration-100 flex flex-col justify-center items-center w-64 weatherBg h-72 space-y-6">
                  <div>
                    <h2 className="text-white text-2xl">{item.day}</h2>
                  </div>
                  <img
                    src={
                      item.weather === "Thunderstorms"
                        ? rainy
                        : item &&
                          (item.weather === "Sunny" ||
                            item.weather === "Mostly Sunny")
                        ? sunny
                        : item && item.weather === "Mostly Cloudy"
                        ? cloudy
                        : item && item.weather === "Partly Cloudy"
                        ? partlyCloudy
                        : item && item.weather === "Scattered Thunderstorms"
                        ? scatteredThunderstorm
                        : item && item.weather === "Scattered Showers"
                        ? serverRain
                        : item && item.weather === "Showers"
                        ? rainy
                        : item && item.weather === "Rain"
                        ? rainIcon
                        : item
                    }
                    className="w-24 h-24"
                    alt="weather icon"
                  />
                  <div>
                    <h2 className="text-white text-3xl font-bold tracking-wider">
                      {item.temp}°C
                    </h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {!isFound && (
          <div className="flex flex-cols justify-center items-center mb-10">
            <h1 className="text-white text-xl font-normal tracking-wider">
              Error in fetch data. Check spellings and try again after 1 minute
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
