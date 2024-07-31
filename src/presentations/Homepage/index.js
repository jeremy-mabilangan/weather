import React from 'react';
import { RainChanceChart, TemperatureChart, UVIndexChart } from '../../components';
import ViewModel from './useViewModel';
import { ReactComponent as RainSVG } from '../../../src/common/assets/rain.svg';
import { ReactComponent as SunSVG } from '../../../src/common/assets/sun.svg';
import { ReactComponent as WindSVG } from '../../../src/common/assets/wind.svg';
import { ReactComponent as HumiditySVG } from '../../../src/common/assets/humidity.svg';
import { ReactComponent as SearchSVG } from '../../../src/common/assets/search.svg';

function App() {
  const { temperatureChartData, uvIndexChartData, rainChanceChartData } = ViewModel();

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <section className="px-[15px] md:px-[30px] lg:px-[60px] xl:px-[20%] py-5">
        <section className="relative mb-5 w-full md:w-[calc(50%_-_10px)]">
          <input
            className="border-2 border-gray-300 bg-white h-12 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
            type="search"
            name="search"
            placeholder="Search"
          ></input>
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <SearchSVG />
          </button>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white">
          {/* grid grid-cols-2 xs:max-md:grid-cols-3 md:max-xl:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-6 */}
          <section className="shadow-xl rounded-xl p-5">
            <section className="text-base xl:text-lg">
              <p className="font-bold text-2xl">Current Weather</p>
              <p className="text-sm">Tuesday, 11:47</p>
              <div className="grid grid-cols-2 mt-5 gap-5">
                <div className="content-center">
                  <div className="flex justify-end">
                    <img
                      className="size-16"
                      src="//cdn.weatherapi.com/weather/64x64/night/353.png"
                      alt="weather icon"
                    />
                  </div>

                  <p className="text-sm text-right">Light rain shower</p>
                </div>
                <div className="pt-2">
                  <div className="flex justify-start">
                    <p className="text-8xl font-light">26</p>
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
              <p className="text-center w-9">80%</p>
              <p className="text-center w-9">6</p>
              <p className="text-center w-9">20kph</p>
              <p className="text-center w-9">83</p>
            </section>
          </section>
          <section className="shadow-xl rounded-xl p-5">
            <p className="font-bold text-2xl">Forecast</p>
            <div className="grid grid-cols-5 gap-4 mt-4 px-3">
              <img
                className="size-12 object-contain ml-3 content-center"
                src="//cdn.weatherapi.com/weather/64x64/night/116.png"
                alt="weather icon"
              />
              <p className="text-xl content-center">24&deg;/22&deg;</p>
              <div className="col-span-3 content-center">
                <p className="text-xl text-right ">
                  <span className="font-bold">31</span> <span className="text-sm">Jul, Wed</span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-4 px-3">
              <img
                className="size-12 object-contain ml-3"
                src="//cdn.weatherapi.com/weather/64x64/night/116.png"
                alt="weather icon"
              />
              <p className="text-xl content-center">24&deg;/22&deg;</p>
              <div className="col-span-3 content-center">
                <p className="text-xl text-right ">
                  <span className="font-bold">1</span> <span className="text-sm">Aug, Thur</span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-4 px-3">
              <img
                className="size-12 object-contain ml-3"
                src="//cdn.weatherapi.com/weather/64x64/night/116.png"
                alt="weather icon"
              />
              <p className="text-xl content-center">24&deg;/22&deg;</p>
              <div className="col-span-3 content-center">
                <p className="text-xl text-right ">
                  <span className="font-bold">2</span> <span className="text-sm">Aug, Fri</span>
                </p>
              </div>
            </div>
          </section>
        </section>
        <section className="shadow-xl rounded-xl pb-10 mt-5 bg-white">
          <div className="p-5">
            <RainChanceChart chartData={rainChanceChartData} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 pt-5">
            <div className="p-5">
              <TemperatureChart chartData={temperatureChartData} />
            </div>
            <div className="p-5">
              <UVIndexChart chartData={uvIndexChartData} />
            </div>
            {/* <div className="p-5">
            <SunChart chartData={sunChartData} />
          </div> */}
          </div>
        </section>
      </section>
    </div>
  );
}

export default App;
