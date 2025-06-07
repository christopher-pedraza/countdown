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

  // Responsive sizing for the clock
  // Set min/max for usability
  const minDigitHeight = 60; // px
  const maxDigitHeight = 160; // px
  const minDigitWidth = 40; // px
  const maxDigitWidth = 120; // px
  const minFontSize = 32; // px
  const maxFontSize = 80; // px
  const minLabelFont = 16; // px
  const maxLabelFont = 36; // px

  // Calculate base size from viewport (responsive to both width and height)
  const base = Math.min(width, height);
  const digitHeight = Math.max(
    minDigitHeight,
    Math.min(base * 0.11, maxDigitHeight)
  );
  const digitWidth = Math.max(
    minDigitWidth,
    Math.min(base * 0.07, maxDigitWidth)
  );
  const digitFontSize = Math.max(
    minFontSize,
    Math.min(base * 0.055, maxFontSize)
  );
  const labelFontSize = Math.max(
    minLabelFont,
    Math.min(base * 0.025, maxLabelFont)
  );

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
          fontSize: labelFontSize + "px",
          marginTop: "1.5rem",
        }}
        digitBlockStyle={{
          fontSize: digitFontSize + "px",
          width: digitWidth + "px",
          height: digitHeight + "px",
          background: "#222",
          color: "#fff",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        }}
        separatorStyle={{ color: "#fff", fontSize: digitFontSize + "px" }}
        spacing={{ clock: "0.5rem", digitBlock: "0.5rem" }}
      />
      {exploded && <Confetti width={width} height={height} />}
    </div>
  );
}
