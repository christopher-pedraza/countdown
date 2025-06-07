import { DatePicker } from "@heroui/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";

export default function SetupPage() {
  const today = now(getLocalTimeZone());
  const [date, setDate] = useState(today);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <DatePicker
        value={date}
        onChange={setDate}
        label="Select Date"
        className="dark text-foreground bg-background"
      />
    </div>
  );
}
