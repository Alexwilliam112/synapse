"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const RadialChart = ({ data }) => {
  const chartData = {
    labels: ["Ontime Process", "Non-Conforming"],
    datasets: [
      {
        label: "# of Votes",
        data: [data?.ontime, data?.nonConform],
        backgroundColor: ["#6E8672", "#C2E4C8"],
        borderColor: ["#6E8672", "#C2E4C8"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Set display to false to remove the legend
      },
      title: {
        display: false,
        text: "Chart.js Doughnut Chart in Next.js",
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default RadialChart;
