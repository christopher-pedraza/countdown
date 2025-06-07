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
    const queryParams = new URLSearchParams({
      date: date.toDate(getLocalTimeZone()).toISOString().slice(0, 19),
      title: "Custom Countdown",
    });
    window.location.href = `/?${queryParams.toString()}`;
  };

  const handleDateFromNowCountdown = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);
    targetDate.setHours(targetDate.getHours() + hours);
    targetDate.setMinutes(targetDate.getMinutes() + minutes);
    targetDate.setSeconds(targetDate.getSeconds() + seconds);
    const queryParams = new URLSearchParams({
      date: targetDate.toISOString(),
      title: "Custom Countdown",
    });
    window.location.href = `/?${queryParams.toString()}`;
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
