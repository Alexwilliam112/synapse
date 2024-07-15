import { ReactTyped } from "react-typed";

const MyComponent = () => (
  <div className="w-auto font-mono text-xl text-white">
    <ReactTyped strings={["PROPOSE, 13/07/2024"]} typeSpeed={50} />
    {/* <br /> */}
    {/* <ReactTyped strings={["13/07/2024"]} typeSpeed={40} className="text-xs" /> */}
    {/* <br /> */}
    <br />

    <ReactTyped
      strings={[
        "Freq: 0.973101 Avg.Time: 1.47",
        "Freq: 0.980798 Avg.Time: 2.02",
        "Freq: 0.982181 Avg.Time: 2.13",
        "Freq: 0.964932 Avg.Time: 2.54",
        "Freq: 0.987148 Avg.Time: 2.86",
      ]}
      typeSpeed={50}
      backSpeed={50}
      loop
      className=""
    >
    </ReactTyped>
    <br />
    <ReactTyped strings={["DEPLOY, 18/07/2024"]} typeSpeed={50} />
  </div>
);

export default MyComponent