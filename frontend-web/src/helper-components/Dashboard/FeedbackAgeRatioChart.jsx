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
        text: "Percentage",
        color: "#696969",
        font: {
          size: 12,
        },
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

const labels = ["< 18", "18 - 30", "> 30"];

export default function FeedbackAgeRatioChart({ rates, title }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Feedback writing age ratio",
        data: [rates.lessThan18, rates.between18and30, rates.moreThan30],
        backgroundColor: "#d0f4de",
      },
    ],
  };
  return (
    <div className="pb-8 w-full md:w-1/2 ">
      <h2 className="text-center mb-4 text-[#696969] text-base font-bold">
        {title}
      </h2>
      <Bar className="mt-8" options={options} data={data} />
    </div>
  );
}
