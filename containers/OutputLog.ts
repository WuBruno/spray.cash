import { createContainer } from "unstated-next";
import { useState } from "react";

type LogItem = {
  message: string;
  url: string;
};

export function useOutputLog() {
  const [logItems, setLogItems] = useState<LogItem[]>([]);

  const addLogItem = (x: string, type: string) => {
    const url = `https://arbiscan.io/tx/${x}`;
    const message = `Transaction ${type} Sent:`;
    setLogItems((prev) => [{ url, message }, ...prev]);
  };

  const clear = () => setLogItems([]);

  return {
    logItems,
    addLogItem,
    clear,
  };
}

export default createContainer(useOutputLog);
