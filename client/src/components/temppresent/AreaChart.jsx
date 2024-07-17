"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const AreaChart = ({ data }) => {
  const chartData = {
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OKT",
      "DES",
    ],
    datasets: [
      {
        label: "Conformance Rate",
        data: data,
        borderColor: "rgba(50, 50, 49, 0.4)",
        backgroundColor: "rgba(50, 50, 49, 0.4)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Overlap Area Chart Example",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          callback: function (value) {
            return value * 100 + " %";
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default AreaChart;
