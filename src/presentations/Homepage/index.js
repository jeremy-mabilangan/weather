import React from "react";
import {
  RainChanceChart,
  TemperatureChart,
  UVIndexChart,
  Maps,
} from "../../components";
import ViewModel from "./useViewModel";
import { ReactComponent as RainSVG } from "../../../src/common/assets/rain.svg";
import { ReactComponent as SunSVG } from "../../../src/common/assets/sun.svg";
import { ReactComponent as WindSVG } from "../../../src/common/assets/wind.svg";
import { ReactComponent as HumiditySVG } from "../../../src/common/assets/humidity.svg";
import { ReactComponent as SearchSVG } from "../../../src/common/assets/search.svg";
import { ReactComponent as WeatherLogo } from "../../../src/common/assets/weather-logo.svg";

function App() {
  const { locationInput, handleSubmit, data, showErrorMessage, MAPS_API_KEY } =
    ViewModel();
  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <section className="px-[15px] md:px-[30px] lg:px-[60px] xl:px-[20%] py-5">
        <section className="mb-3">
          <div>
            {!data && (
              <div className="flex justify-center mt-5 mb-5">
                <WeatherLogo />
              </div>
            )}
            <div className="relative">
              <form onSubmit={handleSubmit}>
                <input
                  className="border-2 border-gray-300 bg-white h-14 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
                  type="search"
                  name="search"
                  placeholder="Search your location"
                  autoComplete="off"
                  ref={locationInput}
                ></input>
                {showErrorMessage.show && (
                  <div
                    className="p-[16px_16px_0px_16px] text-sm md:mb-1 text-red-800 rounded-lg dark:text-red-400"
                    role="alert"
                  >
                    <span className="font-medium">
                      {showErrorMessage.message}
                    </span>
                  </div>
                )}
              </form>
              <button
                type="submit"
                className="absolute right-0 top-0 mt-4 mr-4"
                onClick={handleSubmit}
              >
                <SearchSVG />
              </button>
              {!data && (
                <div className="text-gray-700 mt-3 ml-3 text-sm">
                  <h2>Example</h2>

                  <ul className="pl-5">
                    <li>Manila</li>
                    <li>New York</li>
                    <li>Santo Tomas Batangas</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="h-full text-lg pl-4 mt-3">{data?.name || ""}</p>
          </div>
        </section>
        {data ? (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* grid grid-cols-2 xs:max-md:grid-cols-3 md:max-xl:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-6 */}
              <section
                className="shadow-xl rounded-xl p-5 bg-white animate-slideInFromLeft opacity-0"
                style={{ "--delay": "0.25s" }}
              >
                <section className="text-base xl:text-lg">
                  <p className="font-bold text-2xl">Current Weather</p>
                  <p className="text-sm">{data?.currentWeather.day}</p>
                  <div className="grid grid-cols-2 mt-5 gap-5">
                    <div className="content-center">
                      <div className="flex justify-end">
                        <img
                          className="size-16"
                          src={data?.currentWeather.condition.icon}
                          alt="Weather Icon"
                        />
                      </div>

                      <p className="text-sm text-right">
                        {data?.currentWeather.condition.label}
                      </p>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-start">
                        <p className="text-7xl font-light">
                          {data?.currentWeather.degree}
                        </p>
                        <p className="font-sans pt-1 font-bold">&#8451;</p>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="flex justify-between mt-4">
                  <RainSVG />
                  <SunSVG />
                  <WindSVG />
                  <HumiditySVG />
                </section>
                <section className="flex justify-between mt-2">
                  <p className="text-center w-9">
                    {data?.currentWeather.rain_chance}%
                  </p>
                  <p className="text-center w-9">{data?.currentWeather.uv}</p>
                  <p className="text-center w-9">
                    {data?.currentWeather.wind}kph
                  </p>
                  <p className="text-center w-9">
                    {data?.currentWeather.humidity}
                  </p>
                </section>
              </section>
              <section
                className="shadow-xl rounded-xl p-5 bg-white animate-slideInFromRight opacity-0"
                style={{ "--delay": "0.25s" }}
              >
                <p className="font-bold text-2xl">Forecast</p>
                {data?.forecast.map((f) => (
                  <div
                    key={Math.random()}
                    className="grid grid-cols-5 gap-2 mt-6 px-3"
                  >
                    <div className="col-span-3 content-center">
                      <div className="flex">
                        <img
                          className="size-12 mr-3"
                          src={f.icon}
                          alt="weather icon"
                        />
                        <div>
                          <p className="text-lg content-center font-bold">
                            {f.label}
                          </p>
                          <p className="text-sm content-center">
                            {f.max_temp}&deg;/{f.min_temp}&deg;
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 content-center">
                      <p className="text-xl text-right ">
                        <span className="font-bold">{f.day}</span>{" "}
                        <span className="text-sm">{f.md}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            </section>
            <section
              className="shadow-xl rounded-xl mt-5 p-[20px_20px_40px_20px] bg-white animate-slideInFromBottom opacity-0"
              style={{ "--delay": "0.5s" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="h-[300px]">
                  {data.location && (
                    <Maps
                      apiKey={MAPS_API_KEY}
                      map={{
                        center: data.location,
                        defaultZoom: 11,
                        gestureHandling: "greedy",
                        disableDefaultUI: true,
                        zoomControl: true,
                        scaleControl: true,
                        draggable: false,
                      }}
                      marker={{ position: data.location }}
                    />
                  )}
                </div>
                <div className="pb-10 md:pb-0">
                  <RainChanceChart chartData={data?.rainChart} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="py-5">
                  <TemperatureChart chartData={data?.temperatureChart} />
                </div>
                <div className="py-5">
                  <UVIndexChart chartData={data?.uvIndexChart} />
                </div>
              </div>
            </section>
          </>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
}

export default App;
