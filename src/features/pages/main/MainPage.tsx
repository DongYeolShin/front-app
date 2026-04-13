import { useEffect, useState } from "react";
import {
  fetchSeoulWeather,
  getWindDirection,
  getWeatherIcon,
  type WeatherData,
} from "../../../service/apis/weatherApi";

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

  return (
    <div className="flex w-full min-h-screen">
      {/* 좌측 패널 */}
      <div className="flex flex-col justify-center gap-6 w-1/3 bg-[#1B2A4A] px-12 py-15">
        <h1 className="text-[42px] font-bold text-white font-[Inter] m-0">
          오늘의 날씨
        </h1>
        <p className="text-base text-[#B0BEC5] font-[Inter]">
          Open API를 활용한 실시간 날씨 정보를 확인하세요
        </p>
        <div className="w-15 h-[3px] bg-white rounded-sm" />
        <p className="text-sm text-[#8899AA] font-[Inter] leading-relaxed">
          현재 위치 기반의 정확한 날씨 데이터를 제공합니다. 온도, 풍속, 풍향 등
          다양한 기상 정보를 한눈에 확인하세요.
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
