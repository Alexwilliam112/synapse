"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ data }) => {
  const chartData = {
    labels:
      data.length > 0
        ? data[0].data.map((_, index) => `Point ${index + 1}`)
        : [],
    datasets: data.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: ["#6E8672", "#FFBB59", "#53A653", "#C2E4C8", "#FF7F50"][
        index % 5
      ],
      backgroundColor: ["#6E8672", "#FFBB59", "#53A653", "#C2E4C8", "#FF7F50"][
        index % 5
      ],
      fill: false,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Average Conformance per Process",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + " %";
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineGraph;
