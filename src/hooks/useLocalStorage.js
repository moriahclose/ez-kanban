import { useState, useEffect } from "react";

export default function useLocalStorage(storageKey, defaultValue) {
  let [state, setState] = useState("");
  let [hasCheckedStorage, setCheckedStorage] = useState(false);

  useEffect(() => {
    let storedItem = localStorage.getItem(storageKey);
    setState(storedItem || defaultValue);
    setCheckedStorage(true);
  }, [storageKey]);

  function changeState(value) {
    if (value === null) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, value);
    }
    setState(value);
  }

  return [state, changeState, hasCheckedStorage];
}