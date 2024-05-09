import React from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { drawGradient } from "../utils";
import { Images } from "../images/images";

ChartJS.register(ArcElement);

interface ChartProps {
  data: any;
}

export default function Chart1({ data }: ChartProps): JSX.Element {
  const options = {
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false
  };

  const finalData = {
    datasets: [
      {
        data: data,

        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { chartArea } = chart;
          if (!chartArea) return null;

          if (context.dataIndex === 0) {
            return drawGradient(chart, "#FAFF00", "#33FF00");
          } else {
            return "#E4E6EF";
          }
        },

        circumference: 180,
        rotation: 180
      }
    ]
  };

  return (
    <div className="relative w-[250px] h-[250px] ml-[25%] flex justify center">
      <div
        className="w-[120px] h-[120px] rounded-full border-gray-200 border-dashed border-2 
        absolute left-[50%] top-[28%] text-center 
        text-base font-bold flex flex-col content-center justify-center flex-wrap"
      >
        <img className="absolute right-[-20%] top-[30%]" src={Images.securityIcon} alt="" width="40" />
        <img className="absolute left-[37%] top-[5%]" src={Images.cIcon} alt="" width="30" />
        <span>{data[0]}</span>
        <span className="text-xs text-mid-gray font-normal">Security Score</span>
      </div>
      <Doughnut data={finalData} options={options} />
    </div>
  );
}
