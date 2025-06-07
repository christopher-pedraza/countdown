import FlipClockPage from "./pages/FlipClock";
import SetupPage from "./pages/Setup";

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const dateParam = searchParams.get("date");
  const titleParam = searchParams.get("title");

  return <>{dateParam ? <FlipClockPage /> : <SetupPage />}</>;
}

export default App;
