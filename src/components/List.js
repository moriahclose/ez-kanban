import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createListItem, getListItems } from "../api";

import ListItem from "./ListItem";

export default function List({ id, title, color, items }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const { register, errors, handleSubmit, setValue } = useForm();

  useEffect(() => {
    getListItems(id).then(({ data }) => {
      console.log("items", data);
      setCurrentItems(data);
    });
  }, [id]);

  function submit(values) {
    createListItem({ ...values, list_id: id })
      .then(({ data }) => {
        console.log("response", data);
        setCurrentItems((currentItems) => [...currentItems, data]);
        setValue("title", "");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  return (
    <div className="list-container w-72">
      <div className="list-title flex justify-between">
        <div>
          <label className="text-lg font-medium mr-6">{title}</label>
          <label className="text-gray-400">{currentItems.length}</label>
        </div>
        <buton className="text-gray-400 font-bold cursor-pointer">...</buton>
      </div>
      <div className="list" style={{ borderColor: color }}>
        <ul className="items-container">
          {currentItems &&
            currentItems.length > 0 &&
            currentItems.map((item) => <ListItem key={item.id} {...item} />)}
          {!isAddingItem && (
            <button
              onClick={() => setIsAddingItem(true)}
              className="add-button"
            >
              Add an item...
            </button>
          )}
          {isAddingItem && (
            <form onSubmit={handleSubmit(submit)} className="list-item-form">
              <input
                name="title"
                ref={register({ required: true })}
                placeholder="My New Item"
                className="list-item-input primary-font"
              ></input>
              {errors.title && "Please enter a title."}
            </form>
          )}
        </ul>
      </div>
    </div>
  );
}
