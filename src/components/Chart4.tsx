import React from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ChartProps {
  data: any;
}

export default function Chart4({ data }: ChartProps): JSX.Element {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    scales: {
      y: {
        min: 0,
        max: 100,
        stepSize: 10
      },
      x: {
        grid: {
          color: "white",
          drawTicks: false,
          offset: false
        }
      }
    }
  };

  const finalData = {
    labels: [
      "Vulnerable NGINX Version Discovered",
      "Vulnerable NGINX Version Discovered",
      "Vulnerable NGINX Version Discovered",
      "Vulnerable NGINX Version Discovered",
      "Vulnerable NGINX Version Discovered",
      "Vulnerable NGINX Version Discovered",
      "Vulnerable NGINX Version Discovered",
      "Vulnerable NGINX Version Discovered",
      "Vulnerable NGINX Version Discovered"
    ],
    datasets: [
      {
        data: data,
        backgroundColor: ["#52E161", "#8BE152", "#8BE152", "#C4E152", "#E1C452", "#E1C452", "#E1C452", "#E18B52", "#E15252"],
        borderRadius: 10
      }
    ]
  };

  return (
    <div className="rounded-lg p-2">
      <Bar data={finalData} options={options} height={248} />
    </div>
  );
}
