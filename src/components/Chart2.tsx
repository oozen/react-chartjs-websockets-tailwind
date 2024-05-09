import React from "react";
import { Chart as ChartJS, ArcElement } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement);

interface ChartProps {
  data: any;
}

export default function Chart2({ data }: ChartProps): JSX.Element {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 180000,
        stepSize: 10000,

        ticks: {
          color: "white"
        }
      },
      x: {
        ticks: {
          color: "white"
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const finalData = {
    labels: ["Mon", "Thu", "Wed", "Thr", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: data,
        backgroundColor: "white",
        borderRadius: Number.MAX_VALUE,
        barPercentage: 0.4
      }
    ]
  };

  return (
    <div className="bg-dark-blue rounded-lg p-2">
      <Bar data={finalData} options={options} height={200} />
    </div>
  );
}
