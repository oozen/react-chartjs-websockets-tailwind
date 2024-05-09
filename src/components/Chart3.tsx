import React from "react";
import { Chart as ChartJS, ArcElement } from "chart.js/auto";
import { Line } from "react-chartjs-2";

ChartJS.register(ArcElement);

interface ChartProps {
  data: any;
}

export default function Chart3({ data }: ChartProps): JSX.Element {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,

        ticks: {
          color: "gray"
        }
      },
      x: {
        ticks: {
          color: "gray"
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      filler: {
        propagate: false
      }
    }
  };

  const finalData = {
    labels: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        data: data.up,
        borderColor: "#4338CA",

        tension: 0.4,
        fill: "-1"
      },
      {
        data: data.down,
        borderColor: "#818CF8",
        tension: 0.4,
        backgroundColor: "#b0aceb6b",
        fill: "-1"
      }
    ]
  };

  return <Line data={finalData} options={options} height={"30%"} />;
}
