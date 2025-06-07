import { DatePicker, NumberInput, Button } from "@heroui/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";

export default function SetupPage() {
  const today = now(getLocalTimeZone());
  const [date, setDate] = useState(today);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const handleDateCountdown = () => {
    // Convert to local time format that preserves the user's timezone
    const jsDate = date.toDate(getLocalTimeZone());
    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const day = String(jsDate.getDate()).padStart(2, "0");
    const hours = String(jsDate.getHours()).padStart(2, "0");
    const minutes = String(jsDate.getMinutes()).padStart(2, "0");
    const seconds = String(jsDate.getSeconds()).padStart(2, "0");
    const localISOString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    const queryParams = new URLSearchParams({
      date: localISOString,
      title: "Custom Countdown",
    });
    window.location.href = `/countdown/?${queryParams.toString()}`;
  };
  const handleDateFromNowCountdown = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);
    targetDate.setHours(targetDate.getHours() + hours);
    targetDate.setMinutes(targetDate.getMinutes() + minutes);
    targetDate.setSeconds(targetDate.getSeconds() + seconds);

    // Format in local time to avoid timezone issues
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, "0");
    const day = String(targetDate.getDate()).padStart(2, "0");
    const hoursStr = String(targetDate.getHours()).padStart(2, "0");
    const minutesStr = String(targetDate.getMinutes()).padStart(2, "0");
    const secondsStr = String(targetDate.getSeconds()).padStart(2, "0");
    const localISOString = `${year}-${month}-${day}T${hoursStr}:${minutesStr}:${secondsStr}`;

    const queryParams = new URLSearchParams({
      date: localISOString,
      title: "Custom Countdown",
    });
    window.location.href = `/countdown/?${queryParams.toString()}`;
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-[250px] flex flex-col items-center">
        <p className="mb-1 font-bold">Select Date:</p>
        <DatePicker
          value={date}
          onChange={(value) => setDate(value)}
          hideTimeZone
          showMonthAndYearPickers
          defaultValue={now(getLocalTimeZone())}
          minValue={today}
          label="Event Date"
          variant="bordered"
          size="sm"
          classNames={{ base: "dark text-foreground bg-background" }}
        />
        <Button
          className="mt-4"
          variant="bordered"
          color="primary"
          onPress={handleDateCountdown}
        >
          Start Countdown
        </Button>
        <p className="mt-4 mb-4 font-light">OR</p>
        <p className="mb-1 font-bold">Time from now:</p>
        <div className="flex flex-row items-center justify-center mb-2">
          <NumberInput
            value={days}
            onValueChange={setDays}
            minValue={0}
            maxValue={1000}
            label="Days"
            variant="bordered"
            size="sm"
            className="mr-2"
          />
          <NumberInput
            value={hours}
            onValueChange={setHours}
            minValue={0}
            maxValue={23}
            label="Hours"
            variant="bordered"
            size="sm"
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <NumberInput
            value={minutes}
            onValueChange={setMinutes}
            minValue={0}
            maxValue={59}
            label="Minutes"
            variant="bordered"
            size="sm"
            className="mr-2"
          />
          <NumberInput
            value={seconds}
            onValueChange={setSeconds}
            minValue={0}
            maxValue={59}
            label="Seconds"
            variant="bordered"
            size="sm"
          />
        </div>
        <Button
          className="mt-4"
          variant="bordered"
          color="primary"
          onPress={handleDateFromNowCountdown}
        >
          Start Countdown from Now
        </Button>
      </div>
    </div>
  );
}
