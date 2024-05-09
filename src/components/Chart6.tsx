import React from "react";
import { Chart as ChartJS, ArcElement } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { drawGradient } from "../utils";

ChartJS.register(ArcElement);

interface ChartProps {
  data: any;
}

export default function Chart6({ data }: ChartProps): JSX.Element {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 120,
        stepSize: 10,
        grid: {
          color: "white",
          drawTicks: false,
          offset: false
        }
      },
      x: {
        grid: {
          color: "white",
          drawTicks: false,
          offset: false
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
    labels: ["F", "C", "A+", "A-", "A", "None", "T", "B"],
    datasets: [
      {
        data: data,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { chartArea } = chart;
          if (!chartArea) return null;

          return drawGradient(chart, "#E15252", "#52E161", true);
        },
        borderRadius: Number.MAX_VALUE,
        barPercentage: 0.4
      }
    ]
  };

  return (
    <div className="p-2">
      <Bar data={finalData} options={options} height={200} />
    </div>
  );
}
