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
      title: {
        display: true,
        text: "Number of people",
        color: "#696969",
        font: {
          size: 14,
        },
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
    y: {
      title: {
        display: true,
        text: "Ages",
        color: "#696969",
        font: {
          size: 14,
        },
      },
    },
  },
};

const labels = ["< 18", "18 - 30", "> 30"];

export default function AgeChart({ lessThan18, between18and30, moreThan30 }) {
  const data = {
    labels,
    datasets: [
      {
        label: "# of followers",
        data: [
          lessThan18.followers,
          between18and30.followers,
          moreThan30.followers,
        ],
        borderColor: "#fcf6bd",
        backgroundColor: "#fcf6bd",
      },
      {
        label: "# of people who wrote feedback",
        data: [
          lessThan18.writtenFeed,
          between18and30.writtenFeed,
          moreThan30.writtenFeed,
        ],
        borderColor: "#ffbf69",
        backgroundColor: "#ffbf69",
      },
    ],
  };
  return (
    <div className="w-full md:w-4/5 pb-8">
      <Bar className="mt-8" options={options} data={data} />
    </div>
  );
}
