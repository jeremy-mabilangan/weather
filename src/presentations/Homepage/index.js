import { RainChanceChart, SunChart, TemperatureChart, UVIndexChart } from '../../components';
import ViewModel from './useViewModel';

function App() {
  const { temperatureChartData, uvIndexChartData, rainChanceChartData, sunChartData } = ViewModel();

  return (
    <div className="h-screen grid lg:grid-cols-12">
      <section className="md:grid md:grid-cols-2 md:items-center lg:block lg:col-span-3 py-5 bg-white-100">
        <section className="text-base xl:text-lg">
          <p className="text-center">Tuesday, 11:47</p>
          <div className="flex justify-center py-2">
            <img src="https://cdn.weatherapi.com/weather/64x64/day/353.png" alt="weather icon" />
          </div>

          <p className="text-center">Light rain shower</p>
          <div className="flex justify-center text-orange-500 pt-5">
            <p className="text-8xl font-light">+26</p>
            <p className="font-sans pt-1 font-bold">&#8451;</p>
          </div>

          <p className="text-center">Feels like +29</p>
        </section>

        <section className="px-8 mt-10 md:mt-0 lg:mt-10 text-base xl:text-lg">
          <div className="grid grid-cols-2 mb-3">
            <p className="2xl:text-right">Rain Chance</p>
            <p className="pl-3">12%</p>
          </div>
          <div className="grid grid-cols-2 mb-3">
            <p className="2xl:text-right">Wind Speed</p>
            <p className="pl-3">24.1 kph</p>
          </div>
          <div className="grid grid-cols-2 mb-3">
            <p className="2xl:text-right">Humidity</p>
            <p className="pl-3">63%</p>
          </div>
          <div className="grid grid-cols-2 mb-3">
            <p className="2xl:text-right">Air Quality</p>
            <p className="pl-3">23 AQI</p>
          </div>
          <div className="grid grid-cols-2 mb-3">
            <p className="2xl:text-right">Pressure</p>
            <p className="pl-3">1016 mb</p>
          </div>
          <div className="grid grid-cols-2 text-base">
            <p className="2xl:text-right">UV Index</p>
            <p className="pl-3">3</p>
          </div>
        </section>
      </section>

      <section className="grid md:grid-rows-[600px_auto] lg:col-span-9">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-5">
            <TemperatureChart chartData={temperatureChartData} />
          </div>
          <div className="p-5">
            <UVIndexChart chartData={uvIndexChartData} />
          </div>
          <div className="p-5">
            <SunChart chartData={sunChartData} />
          </div>
          <div className="p-5">
            <RainChanceChart chartData={rainChanceChartData} />
          </div>
        </div>

        <section className="p-5 pt-12">
          <div className="grid grid-cols-2 xs:max-md:grid-cols-3 md:max-xl:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-6">
            <div className="w-48">
              <div className="flex">
                <p className="mr-4 text-lg">Wed</p>
                <p className="text-gray-400 text-lg">Aug 31</p>
              </div>
              <div className="grid grid-cols-[35%_65%] grid-rows-[40px] pt-2">
                <p className="text-3xl">+32</p>
                <img
                  className="size-12 object-contain ml-3"
                  src="//cdn.weatherapi.com/weather/64x64/night/116.png"
                  alt="weather icon"
                />
              </div>
              <div className="grid grid-cols-[40%_60%]">
                <p className="text-base text-right pr-5">+15</p>
                <p className="text-gray-400 text-[11px] pt-[6px] pl-3">Partly Cloudy</p>
              </div>
            </div>

            <div className="w-48">
              <div className="flex">
                <p className="mr-4 text-lg">Wed</p>
                <p className="text-gray-400 text-lg">Aug 31</p>
              </div>
              <div className="grid grid-cols-[35%_65%] grid-rows-[40px] pt-2">
                <p className="text-3xl">+32</p>
                <img
                  className="size-12 object-contain ml-3"
                  src="//cdn.weatherapi.com/weather/64x64/night/116.png"
                  alt="weather icon"
                />
              </div>
              <div className="grid grid-cols-[40%_60%]">
                <p className="text-base text-right pr-5">+15</p>
                <p className="text-gray-400 text-[11px] pt-[6px] pl-3">Partly Cloudy</p>
              </div>
            </div>

            <div className="w-48">
              <div className="flex">
                <p className="mr-4 text-lg">Wed</p>
                <p className="text-gray-400 text-lg">Aug 31</p>
              </div>
              <div className="grid grid-cols-[35%_65%] grid-rows-[40px] pt-2">
                <p className="text-3xl">+32</p>
                <img
                  className="size-12 object-contain ml-3"
                  src="//cdn.weatherapi.com/weather/64x64/night/116.png"
                  alt="weather icon"
                />
              </div>
              <div className="grid grid-cols-[40%_60%]">
                <p className="text-base text-right pr-5">+15</p>
                <p className="text-gray-400 text-[11px] pt-[6px] pl-3">Partly Cloudy</p>
              </div>
            </div>

            <div className="w-48">
              <div className="flex">
                <p className="mr-4 text-lg">Wed</p>
                <p className="text-gray-400 text-lg">Aug 31</p>
              </div>
              <div className="grid grid-cols-[35%_65%] grid-rows-[40px] pt-2">
                <p className="text-3xl">+32</p>
                <img
                  className="size-12 object-contain ml-3"
                  src="//cdn.weatherapi.com/weather/64x64/night/116.png"
                  alt="weather icon"
                />
              </div>
              <div className="grid grid-cols-[40%_60%]">
                <p className="text-base text-right pr-5">+15</p>
                <p className="text-gray-400 text-[11px] pt-[6px] pl-3">Partly Cloudy</p>
              </div>
            </div>

            <div className="w-48">
              <div className="flex">
                <p className="mr-4 text-lg">Wed</p>
                <p className="text-gray-400 text-lg">Aug 31</p>
              </div>
              <div className="grid grid-cols-[35%_65%] grid-rows-[40px] pt-2">
                <p className="text-3xl">+32</p>
                <img
                  className="size-12 object-contain ml-3"
                  src="//cdn.weatherapi.com/weather/64x64/night/116.png"
                  alt="weather icon"
                />
              </div>
              <div className="grid grid-cols-[40%_60%]">
                <p className="text-base text-right pr-5">+15</p>
                <p className="text-gray-400 text-[11px] pt-[6px] pl-3">Partly Cloudy</p>
              </div>
            </div>

            <div className="w-48">
              <div className="flex">
                <p className="mr-4 text-lg">Wed</p>
                <p className="text-gray-400 text-lg">Aug 31</p>
              </div>
              <div className="grid grid-cols-[35%_65%] grid-rows-[40px] pt-2">
                <p className="text-3xl">+32</p>
                <img
                  className="size-12 object-contain ml-3"
                  src="//cdn.weatherapi.com/weather/64x64/night/116.png"
                  alt="weather icon"
                />
              </div>
              <div className="grid grid-cols-[40%_60%]">
                <p className="text-base text-right pr-5">+15</p>
                <p className="text-gray-400 text-[11px] pt-[6px] pl-3">Partly Cloudy</p>
              </div>
            </div>

            <div className="w-48">
              <div className="flex">
                <p className="mr-4 text-lg">Wed</p>
                <p className="text-gray-400 text-lg">Aug 31</p>
              </div>
              <div className="grid grid-cols-[35%_65%] grid-rows-[40px] pt-2">
                <p className="text-3xl">+32</p>
                <img
                  className="size-12 object-contain ml-3"
                  src="//cdn.weatherapi.com/weather/64x64/night/116.png"
                  alt="weather icon"
                />
              </div>
              <div className="grid grid-cols-[40%_60%]">
                <p className="text-base text-right pr-5">+15</p>
                <p className="text-gray-400 text-[11px] pt-[6px] pl-3">Partly Cloudy</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default App;
