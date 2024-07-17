"use client";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function RadarChart({ data }) {
  return (
    <div className="">
      <Radar
        data={{
          labels: data.labels,
          datasets: [
            {
              data: data.datasets,
              borderColor: "#6E8672",
              backgroundColor: "rgba(110, 134, 114, 0.2)",
              fill: true,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
