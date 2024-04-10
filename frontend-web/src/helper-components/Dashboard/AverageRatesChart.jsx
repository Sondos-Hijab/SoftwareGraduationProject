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
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Rates",
        color: "#696969",
        font: {
          size: 14,
        },
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Average",
        color: "#696969",
        font: {
          size: 14,
        },
      },
      suggestedMin: 0,
      suggestedMax: 5,
    },
  },
};

const labels = [
  "Customer service rate",
  "Value of money rate",
  "Product/Service rate",
];

export default function AverageRatesChart({ rates }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Average rate",
        data: [
          rates.customerService,
          rates.valueOfMoney,
          rates.productServiceRate,
        ],
        backgroundColor: "#d0f4de",
      },
    ],
  };
  return (
    <div className="pb-8 w-full md:w-4/5">
      <Bar className="mt-8" options={options} data={data} />
    </div>
  );
}
