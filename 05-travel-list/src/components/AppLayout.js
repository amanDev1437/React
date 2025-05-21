import Logo from "./Logo";
import { Form } from "./Form";
import PackingList from "./PackingList";
import { Stats } from "./Stats";
import { useEffect, useState } from "react";

export default function AppLayout() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/items");
      const data = await response.json();
      setItems(data);
    }
    fetchData();
  }, []);

  async function handleAddItem(item) {
    try {
      const response = await fetch("http://localhost:8080/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const newItem = await response.json();

      setItems((items) => [...items, newItem]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
    // setItems((items) => [...items, item]);
  }

  async function handleDeleteItem(id) {
    try {
      const response = await fetch(`http://localhost:8080/item?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setItems((items) => items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    //setItems((items) => items.filter((item) => item.id !== id));
  }

  async function handleToggleTab(id) {
    const item1 = items.find((item) => item.id === id);
    try {
      const response = await fetch(
        `http://localhost:8080/item/update?id=${id}&isPacked=${!item1.packed}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      setItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, packed: !item.packed } : item
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleClearList() {
    try {
      const response = await fetch("http://localhost:8080/items", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to clear list");
      }

      setItems([]);
    } catch (error) {
      console.error("Error clearing list:", error);
    }
  }

  return (
    <>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleTab}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </>
  );
}
