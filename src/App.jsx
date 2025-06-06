import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function App() {
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
        labelStyle={{ color: "white", fontSize: "1.5rem" }}
        className="md:transform md:scale-200"
      />
      {exploded && <Confetti width={width} height={height} />}
    </div>
  );
}

export default App;

// "2025-19-05 17:00:00"
