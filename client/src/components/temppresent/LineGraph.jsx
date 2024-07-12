"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: [
    'JAN 2023', 'FEB 2023', 'MAR 2023', 'APR 2023', 'MAY 2023', 'JUN 2023',
    'JUL 2023', 'AUG 2023', 'SEP 2023', 'OCT 2023',
  ],
  datasets: [
    {
      label: 'Marketing',
      data: [75, 80, 70, 85, 50, 65, 75, 80, 85, 90],
      borderColor: '#6E8672',
      backgroundColor: '#6E8672',
      fill: false,
    },
    {
      label: 'Operations',
      data: [55, 60, 50, 55, 40, 50, 55, 60, 65, 70],
      borderColor: '#FFBB59',
      backgroundColor: '#FFBB59',
      fill: false,
    },
    {
      label: 'Merchandising',
      data: [65, 70, 60, 75, 45, 55, 60, 70, 75, 80],
      borderColor: '#53A653',
      backgroundColor: '#53A653',
      fill: false,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Average Conformance per Process',
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

const MultiLineChart = () => {
  return <Line data={data} options={options} />;
};

export default MultiLineChart;
