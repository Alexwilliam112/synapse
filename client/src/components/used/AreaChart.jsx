"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';

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

const data = {
  labels: [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'
  ],
  datasets: [
    {
      label: 'Dataset 1',
      data: [50, 75, 60, 80, 45, 70, 85],
      borderColor: 'rgba(50, 50, 49, 0.4)',
      backgroundColor: 'rgba(50, 50, 49, 0.4)',
      fill: true,
    },
    {
      label: 'Dataset 2',
      data: [30, 60, 40, 55, 30, 50, 60],
      borderColor: 'rgba(150, 161, 166, 0.45)',
      backgroundColor: 'rgba(150, 161, 166, 0.45)',
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Overlap Area Chart Example',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: function (value) {
          return value + ' %';
        },
      },
    },
  },
};

const AreaChart = () => {
  return <Line data={data} options={options} />;
};

export default AreaChart;
