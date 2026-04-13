import { useEffect, useState } from "react";
import {
  fetchSeoulWeather,
  getWindDirection,
  getWeatherIcon,
  type WeatherData,
} from "../../../service/apis/weatherApi";

const getWeatherTitle = (main: string, tempMax: number): string => {
  const tempLabel =
    tempMax >= 30
      ? "무더운"
      : tempMax >= 23
        ? "따뜻한"
        : tempMax >= 15
          ? "선선한"
          : tempMax >= 5
            ? "쌀쌀한"
            : "추운";

  const conditionMap: Record<string, string> = {
    Clear: "맑고",
    Clouds: "흐리고",
    Rain: "비 오고",
    Drizzle: "이슬비 내리고",
    Thunderstorm: "천둥번개 치고",
    Snow: "눈 오고",
    Mist: "안개 끼고",
    Fog: "안개 끼고",
    Haze: "뿌옇고",
  };
  const conditionLabel = conditionMap[main] ?? "변덕스럽고";

  return `${conditionLabel} ${tempLabel} 하루`;
};

const getWeatherSubtitle = (main: string, tempMax: number): string => {
  if (main === "Rain" || main === "Drizzle" || main === "Thunderstorm")
    return "외출 시 우산을 꼭 챙기세요";
  if (main === "Snow") return "눈길 미끄러움에 주의하세요";
  if (main === "Mist" || main === "Fog" || main === "Haze")
    return "시야가 좋지 않으니 이동 시 주의하세요";
  if (tempMax >= 30) return "무더위에 수분 보충을 잊지 마세요";
  if (tempMax >= 23) return "나들이하기 딱 좋은 날이에요";
  if (tempMax >= 15) return "가벼운 겉옷 하나면 딱 좋은 날씨예요";
  if (tempMax >= 5) return "따뜻하게 입고 나가세요";
  return "방한용품을 꼭 챙기세요";
};

const getWeatherDescription = (
  tempMin: number,
  tempMax: number,
  windSpeed: number
): string => {
  const diff = tempMax - tempMin;
  const tempText = `오늘 서울은 최저 ${tempMin}°C, 최고 ${tempMax}°C 입니다.`;
  const diffText =
    diff >= 10
      ? `일교차가 ${diff}°C로 크니 외출 시 얇은 겉옷을 챙기세요.`
      : `일교차는 ${diff}°C로 크지 않은 편입니다.`;
  const windText =
    windSpeed >= 10
      ? " 바람이 강하게 부니 주의하세요."
      : windSpeed >= 5
        ? " 바람이 다소 불고 있습니다."
        : "";

  return `${tempText} ${diffText}${windText}`;
};

const MainPage = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSeoulWeather()
      .then((data) => setWeather(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const tempMin = weather ? Math.round(weather.main.temp_min) : 0;
  const tempMax = weather ? Math.round(weather.main.temp_max) : 0;
  const windSpeed = weather?.wind.speed ?? 0;
  const windDir = weather ? getWindDirection(weather.wind.deg) : "";
  const weatherMain = weather?.weather[0]?.main ?? "";
  const weatherDesc = weather?.weather[0]?.description ?? "";
  const iconUrl = weather ? getWeatherIcon(weather.weather[0].icon) : "";

  const title = weather ? getWeatherTitle(weatherMain, tempMax) : "오늘의 날씨";
  const subtitle = weather
    ? getWeatherSubtitle(weatherMain, tempMax)
    : "실시간 날씨 정보를 불러오는 중입니다";
  const description = weather
    ? getWeatherDescription(tempMin, tempMax, windSpeed)
    : "잠시만 기다려주세요.";

  return (
    <div className="flex w-full min-h-screen">
      {/* 좌측 패널 */}
      <div className="flex flex-col justify-center gap-6 w-1/3 bg-[#1B2A4A] px-12 py-15">
        <h1 className="text-[42px] font-bold text-white font-[Inter] m-0">
          {title}
        </h1>
        <p className="text-base text-[#B0BEC5] font-[Inter]">{subtitle}</p>
        <div className="w-15 h-[3px] bg-white rounded-sm" />
        <p className="text-sm text-[#8899AA] font-[Inter] leading-relaxed">
          {description}
        </p>
      </div>

      {/* 우측 패널 */}
      <div className="flex flex-col items-center justify-center w-2/3 bg-[#D6DEE8] px-20 py-15">
        {loading && <p className="text-[#1B2A4A] text-lg">로딩 중...</p>}
        {error && <p className="text-red-500 text-lg">오류: {error}</p>}
        {weather && (
          <div
            className="flex flex-col items-center gap-8 w-[560px] rounded-3xl bg-white p-12"
            style={{ boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)" }}
          >
            {/* 도시 */}
            <p className="text-[32px] font-bold text-[#1B2A4A] font-[Inter]">
              {weather.name}
            </p>

            {/* 날씨 아이콘 */}
            <div
              className="flex items-center justify-center w-[100px] h-[100px] rounded-full"
              style={{
                background: "linear-gradient(to bottom, #4A90D9, #7CB8F0)",
              }}
            >
              <img
                src={iconUrl}
                alt={weatherDesc}
                className="w-14 h-14"
              />
            </div>

            {/* 날씨 상태 */}
            <p className="text-[28px] font-bold text-[#1B2A4A] font-[Inter]">
              {weatherDesc} ({weatherMain})
            </p>

            {/* 구분선 */}
            <div className="w-20 h-[2px] bg-[#D0D8E0] rounded-sm" />

            {/* 정보 카드 */}
            <div className="flex gap-4 w-full">
              {/* 온도 */}
              <div className="flex flex-col items-center gap-2 flex-1 bg-[#E8EDF4] rounded-2xl py-6 px-5">
                <span className="text-xs font-medium text-[#8899AA] font-[Inter]">
                  최저 / 최고
                </span>
                <span className="text-[22px] font-bold text-[#1B2A4A] font-[Inter]">
                  {tempMin}° / {tempMax}°
                </span>
              </div>

              {/* 풍속 */}
              <div className="flex flex-col items-center gap-2 flex-1 bg-[#E8EDF4] rounded-2xl py-6 px-5">
                <span className="text-xs font-medium text-[#8899AA] font-[Inter]">
                  풍속
                </span>
                <span className="text-[22px] font-bold text-[#1B2A4A] font-[Inter]">
                  {windSpeed} m/s
                </span>
              </div>

              {/* 풍향 */}
              <div className="flex flex-col items-center gap-2 flex-1 bg-[#E8EDF4] rounded-2xl py-6 px-5">
                <span className="text-xs font-medium text-[#8899AA] font-[Inter]">
                  풍향
                </span>
                <span className="text-[22px] font-bold text-[#1B2A4A] font-[Inter]">
                  {windDir}
                </span>
              </div>
            </div>

            {/* 출처 */}
            <span className="text-[11px] text-[#AABBCC] font-[Inter]">
              데이터 출처: Open Weather API
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
