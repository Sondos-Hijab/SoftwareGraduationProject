import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Average Rates Chart",
      font: {
        size: 18,
        weight: "bold",
      },
      color: "#696969",
      padding: 20,
    },
  },
};

const labels = [
  "Customer service rate",
  "Value of money rate",
  "Product/Service rate",
];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Average rate",
      data: [100, 200, 500, 600, 700, 800, 900, 1000],
      backgroundColor: "#d0f4de",
    },
  ],
};

export default function AverageRatesChart() {
  return (
    <div className="w-4/5 pb-8">
      <Bar className="mt-8" options={options} data={data} />
    </div>
  );
}
