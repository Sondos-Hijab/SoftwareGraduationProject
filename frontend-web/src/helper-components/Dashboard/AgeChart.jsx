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
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Age Chart",
    },
  },
};

const labels = ["< 18", "18 - 30", "> 30"];

export const data = {
  labels,
  datasets: [
    {
      label: "# of followers",
      data: [15, 89, 61, 100],
      borderColor: "#0db783",
      backgroundColor: "#0db783",
    },
    {
      label: "# of people who wrote feedback",
      data: [80, 10, 30, 100],
      borderColor: "#fac100",
      backgroundColor: "#fac100",
    },
  ],
};

export default function AgeChart() {
  return (
    <div className="w-4/5 pb-8">
      <Bar className="mt-8" options={options} data={data} />
    </div>
  );
}
