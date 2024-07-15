"use client"
import Image from "next/image";
import { Chart as ChartJS } from "chart.js/auto"
import { Radar } from "react-chartjs-2";

export default function RadarChart() {
  return (
      <div className=''>
        <Radar data={{
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: "Data 1",
            data: [52, 19, 14, 25, 32, 43, 25],
            borderColor: "#6E8672",
            backgroundColor: "#6E8672",
            fill: true
          }]
        }}/>
      </div>
  );
}
