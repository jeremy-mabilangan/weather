import { RainChanceChart, SunChart, TemperatureChart, UVIndexChart } from '../../components';
import ViewModel from './useViewModel';

function App() {
  const { temperatureChartData, uvIndexChartData, rainChanceChartData, sunChartData } = ViewModel();

  return (
    <div className="w-full h-screen grid lg:grid-cols-12">
      <section className="md:grid md:grid-cols-2 md:items-center lg:block lg:col-span-3 py-5 bg-white-100">
        <section className="text-base xl:text-lg">
          <p className="text-center">Tuesday, 11:47</p>
          <div className="flex justify-center py-2">
            <img src="https://cdn.weatherapi.com/weather/64x64/day/353.png" alt="" />
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
        <div className="grid md:grid-cols-2">
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
        <div className="pt-10">
          <div className="bg-red-300 w-full h-full">
            <p>Hello World!</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
