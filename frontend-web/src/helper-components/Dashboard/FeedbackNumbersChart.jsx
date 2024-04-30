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
        text: "Feedback Type",
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
        text: "Percentage of feedback",
        color: "#696969",
        font: {
          size: 14,
        },
      },
      suggestedMin: 0,
      suggestedMax: 50,
    },
  },
};

const labels = ["Positive Feedback", "Neutral Feedback", "Negative Feedback"];

export default function FeedbackNumbersChart({ numbers, title }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Feedback Number",
        data: [numbers.positive, numbers.neutral, numbers.negative],
        backgroundColor: "#d0f4de",
      },
    ],
  };
  return (
    <div className="pb-8 w-full md:w-4/5 mt-8">
      <h2 className="text-center mb-4 text-[#696969] text-base font-bold">
        {title}
      </h2>
      <Bar className="mt-8" options={options} data={data} />
    </div>
  );
}
