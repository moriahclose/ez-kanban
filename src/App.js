import React, { useEffect, useState } from "react";
import { createMockUserAndList, getUserLists } from "./api";

import List from "./components/List";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [user, setUser, hasCheckedLocalStorage] = useLocalStorage(
    "ez-kanban-user-id",
    null
  );
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("user", user);
    if (!hasCheckedLocalStorage) {
      return;
    }

    setIsLoading(true);
    if (user) {
      getUserLists(user).then(({ data }) => {
        setLists(data);
        setIsLoading(false);
      });
    } else {
      createMockUserAndList().then((list) => {
        setLists([list]);
        setUser(list.user_id);
        setIsLoading(false);
      });
    }
  }, [hasCheckedLocalStorage, user]);

  return (
    <div className="app-container bg-gray-100 p-6 h-screen w-screen">
      <header>
        <h1 className="app-title text-2xl font-medium">EZ Kanban</h1>
      </header>
      <div className="content-container p-6">
        {lists.map((list) => (
          <List key={list.id} {...list} />
        ))}
        <button
          className="add-list-button add-button"
        >
          Add a list...
        </button>
      </div>
    </div>
  );
}
