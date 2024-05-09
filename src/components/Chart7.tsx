import React from "react";
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js/auto";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, LinearScale, Tooltip, Legend);

interface ChartProps {
  data: any;
}

export default function Chart7({ data }: ChartProps): JSX.Element {
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      y: {
        min: 0,

        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value: any, index: number, ticks: any) {
            switch (index) {
              case 0:
                return "Vulnerable NGINX Version Discovered";
              case 1:
                return "Vulnerable PHP Version Discovered";
              case 2:
                return "XMLRPC PHP File Discovered";
              case 3:
                return "Vulnerable Apache Version Discovered";
              case 4:
                return "Vulnerable Wordpress Version Discovered";
              case 5:
                return "SSL Expire Discovered";
              case 6:
                return "Possible Impersonating Domain Discovered";
              case 7:
                return "Mail Server in Blacklist Discovered";
              case 8:
                return "Malware Infected Computer Discovered";

              default:
                break;
            }
          }
        }
      },
      x: {
        min: 0,
        max: 2000,
        stepSize: 250
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const finalData = {
    datasets: [
      {
        data: data.first,
        borderColor: "#34D399",
        backgroundColor: "#A7F3D0",
        radius: 6
      },
      {
        data: data.second,
        borderColor: "#60A5FA",
        backgroundColor: "#95c0f5",
        radius: 6
      },
      {
        data: data.third,
        borderColor: "#FBBF24",
        backgroundColor: "#FDE68A",
        radius: 6
      },
      {
        data: data.fourth,
        borderColor: "#F87171",
        backgroundColor: "#FECACA",
        radius: 6
      }
    ]
  };

  return (
    <div className="rounded-lg p-2">
      <Scatter data={finalData} options={options} height={250} />
    </div>
  );
}
