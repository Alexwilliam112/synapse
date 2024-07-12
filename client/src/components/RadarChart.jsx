"use client"
import Image from "next/image";
import { Chart as ChartJS } from "chart.js/auto"
import { Radar } from "react-chartjs-2";

export default function RadarChart() {
  return (
      <div className='w-[50%] h-[50%]'>
        <Radar data={{
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: "Data 1",
            data: [12, 19, 3, 5, 2, 3, 15]
          }]

        }}/>
      </div>
  );
}