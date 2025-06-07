import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function FlipClockPage() {
  const [exploded, setExploded] = useState(false);
  const { width, height } = useWindowSize();

  // Get date from URL query string, fallback to default
  const searchParams = new URLSearchParams(window.location.search);
  const dateParam = searchParams.get("date");

  var targetDate = "";

  if (dateParam) {
    if (dateParam == "adios-compis-y-redes") {
      targetDate = new Date("2025-06-06T10:50:00");
    } else if (dateParam == "libertad") {
      targetDate = new Date("2025-06-13T12:50:00");
    } else {
      targetDate = new Date(dateParam);
    }
  } else {
    targetDate = new Date("2025-06-06T11:30:00");
  }

  return (
    <div className="bg-black flex items-center justify-center h-screen w-screen">
      <FlipClockCountdown
        to={targetDate.getTime()}
        onComplete={() => {
          setExploded(true);
        }}
        showLabels={true}
        hideOnComplete={false}
        labelStyle={{
          color: "lightgray",
          fontSize: "2rem",
          // fontWeight: "bold",
          marginTop: "1.5rem",
        }}
        digitBlockStyle={{
          fontSize: "4rem",
          width: "5rem",
          height: "7rem",
          background: "#222",
          color: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        }}
        separatorStyle={{ color: "#fff", size: "0.5rem" }}
        spacing={{ clock: "0.5rem", digitBlock: "0.5rem" }}
      />
      {exploded && <Confetti width={width} height={height} />}
    </div>
  );
}
