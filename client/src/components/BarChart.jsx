"use client"
import Image from "next/image";
import { Chart as ChartJS } from "chart.js/auto"
import { Bar } from "react-chartjs-2";

export default function BarChart() {
  return (
      <div className=''>
        <Bar data={{
          labels: ['Process A', 'Process B', 'Process C', 'Process D', 'Process E', 'Process G'],
          datasets: [{
            label: "Data 1",
            data: [12, 19, 3, 5, 2, 3, 15],
            backgroundColor: "#6e8672",
            borderColor: "#6e8672"
          }]

        }}/>
      </div>
  );
}