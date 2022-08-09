import "./App.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbSearch } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import cloudy from "./assets/cloudy.svg";
import rainy from "./assets/rain.svg";
import sunny from "./assets/sunny.svg";
import serverRain from "./assets/severeRain.svg";

function App() {
  const weather = [
    {
      id: 1,
      day: "Today",
      temp: 32,
      weather: "sunny",
    },
    {
      id: 2,
      day: "Tomorrow",
      temp: 30,
      weather: "cloudy",
    },
    {
      id: 3,
      day: "Wednesday",
      temp: 28,
      weather: "rainy",
    },
    {
      id: 4,
      day: "Thursday",
      temp: 24,
      weather: "severe rain",
    },
    {
      id: 5,
      day: "Friday",
      temp: 28,
      weather: "sunny",
    },
  ];

  return (
    <div className="App h-screen w-screen font-myFont">
      <div className="flex flex-col w-full h-auto space-y-24">
        <div className="flex flex-row justify-center mt-24 items-center w-full h-auto">
          <h1 className="text-4xl font-bold text-white">The Weather Channel</h1>
        </div>
        <div className="flex flex-row justify-center items-center w-full">
          <form className="w-6/12">
            <div className="flex flex-row items-center relative inputBg w-auto">
              <div className="inset-y-0 left-0 items-center pl-5 pointer-events-none">
                <HiOutlineLocationMarker className="text-white/80 text-3xl" />
              </div>
              <input
                type="text"
                placeholder="Enter a City"
                className="h-auto w-5/6 p-6 block bg-transparent text-white/80
              placeholder:text-white/60 focus:outline-none text-xl caret-white focus:text-white"
              />
              <div className="flex flex-row ml-14 pr-5 inset-y-0 justify-end items-center pointer-events-none">
                <TbSearch className="text-white/80 text-3xl" />
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-row justify-center items-center w-full">
          <div className="flex flex-row justify-between items-center w-1/12 inputBg p-2">
            <HiOutlineLocationMarker className="text-white/80 text-xl" />
            <h2 className="text-white/80 text-xl"> Lahore </h2>
            <IoIosClose className="text-white/80 text-3xl" />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center w-full">
          <div className="flex flex-row justify-center items-center space-x-10 px-36 py-12 w-9/12">
            {weather.map((item) => (
              <div className="flex flex-col justify-center items-center w-2/12 weatherBg h-64 space-y-6">
                <div>
                  <h2 className="text-white text-2xl">{item.day}</h2>
                </div>
                <img
                  src={
                    item.weather === "rainy"
                      ? rainy
                      : item && item.weather === "sunny"
                      ? sunny
                      : item && item.weather === "severe rain"
                      ? serverRain
                      : item && item.weather === "cloudy"
                      ? cloudy
                      : item
                  }
                  className="w-24 h-24"
                  alt="weather icon"
                />
                <div>
                  <h2 className="text-white text-2xl font-bold tracking-wider">
                    {item.temp}°C
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
