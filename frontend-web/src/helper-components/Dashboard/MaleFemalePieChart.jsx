import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Male", "Female"],
  datasets: [
    {
      data: [12, 19],
      backgroundColor: ["#a9def9", "#ffe5ec"],
      borderColor: ["#a9def9", "#ffe5ec"],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
};

export default function MaleFemalePieChart({ title }) {
  return (
    <div className="w-full md:w-1/2 p-12 ">
      <h2 className="text-center mb-4 text-[#696969] text-base font-bold">
        {title}
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
}
