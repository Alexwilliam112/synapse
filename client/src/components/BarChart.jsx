"use client";
import { Bar } from "react-chartjs-2";

export default function BarChart({ data }) {
  // console.log(data, "ini data");
  return (
    <div className="">
      <Bar
        data={{
          labels: data.labels,
          datasets: [
            {
              data: data.datasets,
              backgroundColor: "#6e8672",
              borderColor: "#6e8672",
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
