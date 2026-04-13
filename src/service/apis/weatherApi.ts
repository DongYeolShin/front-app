import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export interface WeatherData {
  weather: { main: string; description: string; icon: string }[];
  main: { temp: number; temp_min: number; temp_max: number };
  wind: { speed: number; deg: number };
  name: string;
}

const getWindDirection = (deg: number): string => {
  const directions = [
    "북풍", "북북동풍", "북동풍", "동북동풍",
    "동풍", "동남동풍", "남동풍", "남남동풍",
    "남풍", "남남서풍", "남서풍", "서남서풍",
    "서풍", "서북서풍", "북서풍", "북북서풍",
  ];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};

const getWeatherIcon = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

const fetchSeoulWeather = async () => {
  const response = await axios.get<WeatherData>(
    "https://api.openweathermap.org/data/2.5/weather",
    { params: { q: "seoul", units: "metric", appid: API_KEY } }
  );
  return response.data;
};

export { fetchSeoulWeather, getWindDirection, getWeatherIcon };
