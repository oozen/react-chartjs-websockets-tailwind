import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Images } from "./images/images";
import Chart1 from "./components/Chart1";
import Chart2 from "./components/Chart2";
import Chart3 from "./components/Chart3";
import Chart4 from "./components/Chart4";
import Chart5 from "./components/Chart5";
import Chart6 from "./components/Chart6";
import Chart7 from "./components/Chart7";
import Explanation from "./components/Explanation";
import Badge from "./components/Badge";

const socket = io("http://localhost:4000");
const refreshTime = 30000;

function App() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    socket.emit("getInitialData");

    const intervalId = setInterval(() => {
      socket.emit("updateData");
    }, refreshTime);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    socket.on("updatedChartDatas", (resp: any) => {
      setData(resp);
    });
    socket.on("initialChartDatas", (resp: any) => {
      setData(resp);
    });
  }, [data]);

  return (
    <div className="font-sans h-dvh">
      <header className="h-[70px] bg-dark-gray flex content-center justify-between">
        <div className="content-center px-3">
          <img src={Images.logo} alt="Brand Logo" />
        </div>
        <div className="flex justify-end gap-4 align-self-center px-3">
          <img src={Images.cart} alt="" />
          <img src={Images.blocks} alt="" />
          <img src={Images.equalizer} alt="" />
          <img src={Images.groupChat} alt="" />
          <div className="flex flex-wrap content-center gap-4 ms-16 font-bold">
            <div className="flex flex-col text-xs">
              <div className="text-mid-gray">Özgür</div>
              <div className="text-white">Frontend Developer</div>
            </div>
            <div className="backdrop-opacity-10 backdrop-invert bg-white/8 w-10 h-10 rounded-md content-center text-center">
              <span className="text-white text-base">Ö</span>
            </div>
          </div>
        </div>
      </header>
      <div className="flex items-stretch h-[calc(100vh-70px)]">
        <aside className="flex flex-col gap-y-3 flex-wrap content-center flex-none w-20 bg-dark-gray p-3 pt-16">
          <a href="/">
            <img src={Images.home} alt="" />
          </a>
          <a href="/" className="align-self-center bg-background-link rounded-full">
            <img src={Images.charts} alt="" />
          </a>
          <a href="/">
            <img src={Images.exchange} alt="" />
          </a>
          <a href="/">
            <img src={Images.plus} alt="" />
          </a>
          <a href="/">
            <span className="absolute left-10 inline-flex items-center rounded-full bg-rose-800 px-2 py-1 text-xs font-bold text-white ring-1 ring-inset ring-red-600/10">9</span>
            <img src={Images.users} alt="" />
          </a>
          <a href="/">
            <img src={Images.wheel} alt="" />
          </a>
          <a href="/">
            <img src={Images.dots} alt="" />
          </a>
        </aside>
        <main className="grow overflow-y-auto bg-background-gray p-4">
          <h2 className="text-title-gray font-bold mb-10">Security Score Card</h2>

          <div className="w-full bg-white rounded-lg p-4 mt-2">
            <h3 className="text-title-gray font-bold mb-4">Brand Information</h3>
            <div className="flex">
              <img src={Images.logo2} alt="" />
              <div className="ml-3">
                <h3 className="text-title-gray font-bold">Comodo Mobile Security Antivirus</h3>
                <span className="text-xs  text-mid-gray">Best Free Mobile Antivirus for Android 2023 with VPN Mobile Security</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-nowrap gap-5 w-full mt-5 ">
            <div className="flex-1 flex-grow bg-white rounded-lg p-4 min-h-[420px] relative">
              <h3 className="text-title-gray font-bold mb-6">Brand Popularity</h3>
              <div className="h-0 w-10/12 pb-40">{data && <Chart1 data={data.chart1} />}</div>
              <Explanation />
            </div>
            <div className="flex-1 flex-grow bg-white rounded-lg p-4 min-h-[420px] relative">
              <h3 className="text-title-gray font-bold mb-6">Weekly Changes</h3>
              <div className="h-0 w-full">{data && <Chart2 data={data.chart2} />}</div>
              <Explanation />
            </div>
          </div>
          <div className="w-full bg-white rounded-lg p-4 mt-5 min-h-[470px] relative">
            <div className="flex content-center justify-between">
              <h3 className="text-title-gray font-bold mb-6">Threatmon Security Score Over Time</h3>
              <div className="flex">
                <Badge color={"#4338CA"} text={"Real Data"} />
                <Badge color={"#818CF8"} text={"Forecast"} />
              </div>
            </div>
            <div className="h-[320px] w-full">{data && <Chart3 data={data.chart3} />}</div>
            <Explanation />
          </div>

          <div className="w-full bg-white rounded-lg p-4 mt-5 min-h-[420px] relative">
            <div className="flex content-center justify-between">
              <h3 className="text-title-gray font-bold mb-6">Representation of Security Vulnerability</h3>
              <div className="flex">
                <Badge color={"#E15252"} text={"cvss 5.6"} />
                <Badge color={"#E18B52"} text={"cvss 6.4"} />
                <Badge color={"#E1C452"} text={"cvss 7.2"} />
                <Badge color={"#C4E152"} text={"cvss 8.0"} />
                <Badge color={"#8BE152"} text={"cvss 8.8"} />
                <Badge color={"#52E161"} text={"cvss 9.6"} />
              </div>
            </div>
            <div className="h-[320px] w-full">{data && <Chart4 data={data.chart4} />}</div>
            <Explanation />
          </div>

          <div className="flex flex-row flex-nowrap gap-5 w-100 mt-5">
            <div className="flex-1 flex-grow bg-white rounded-lg p-4 min-h-[360px] relative">
              <h3 className="text-title-gray font-bold mb-6">Alarm Risk Assessment Categories</h3>
              <div className="flex justify-center gap-3">
                {data && <Chart5 data={data.chart5.first} color="rgba(52, 211, 153, 1)" bgColor="#D1FAE5" />}
                {data && <Chart5 data={data.chart5.second} color="#60A5FA" bgColor="#DBEAFE" />}
                {data && <Chart5 data={data.chart5.third} color="#FBBF24" bgColor="#FEF3C7" />}
                {data && <Chart5 data={data.chart5.fourth} color="#F87171" bgColor="#FEE2E2" />}
              </div>
              <div className="flex mt-10 justify-center">
                <Badge color={"#34D399"} text={"Low"} />
                <Badge color={"#60A5FA"} text={"Medium"} />
                <Badge color={"#FBBF24"} text={"High"} />
                <Badge color={"#F87171"} text={"Critical"} />
              </div>
              <Explanation />
            </div>
            <div className="flex-1 flex-grow bg-white rounded-lg p-4 min-h-[360px] relative">
              <h3 className="text-title-gray font-bold mb-6">SSL Certificate Ratings</h3>
              <div className="h-0 w-full">{data && <Chart6 data={data.chart6} />}</div>
              <Explanation />
            </div>
          </div>

          <div className="w-full bg-white rounded-lg p-4 mt-5 min-h-[420px] relative">
            <div className="flex content-center justify-between">
              <h3 className="text-title-gray font-bold mb-6">Representation of Security Vulnerability</h3>
              <div className="flex">
                <Badge color={"#34D399"} text={"Low"} />
                <Badge color={"#60A5FA"} text={"Medium"} />
                <Badge color={"#FBBF24"} text={"High"} />
                <Badge color={"#F87171"} text={"Critical"} />
              </div>
            </div>
            <div className="h-[320px] w-full">{data && <Chart7 data={data.chart7} />}</div>
            <Explanation />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
