import React from "react";
import { Chart as ChartJS, ArcElement } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);

interface ChartProps {
  data: any;
  color: string;
  bgColor: string;
}

export default function Chart5({ data, color, bgColor }: ChartProps): JSX.Element {
  const options = {
    cutout: "85%",
    responsive: true,
    maintainAspectRatio: false
  };

  const finalData = {
    datasets: [
      {
        data: data,
        backgroundColor: [color, bgColor],
        borderWidth: 0,
        borderRadius: Number.MAX_VALUE,
        barPercentage: 0.2
      }
    ]
  };

  return (
    <div className="relative w-[130px] h-[130px]">
      <div className="w-[103px] h-[102px] rounded-full absolute left-[13px] top-[19px] text-center content-center" style={{ backgroundColor: `${bgColor}` }}>
        {data[0]}%
      </div>
      <Doughnut data={finalData} options={options} width={130} height={145} />
    </div>
  );
}
