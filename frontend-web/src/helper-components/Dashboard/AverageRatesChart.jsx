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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = [
  "Customer service rate",
  "Value of money rate",
  "Product/Service rate",
];

// Manually specifying data values
const data = {
  labels: labels,
  datasets: [
    {
      label: "Average rates",
      data: [100, 200, 500, 600, 700, 800, 900, 1000],
      backgroundColor: "#fac100",
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
