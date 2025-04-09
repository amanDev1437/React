import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import { Form } from "./components/Form";
import PackingList from "./components/PackingList";
import { Stats } from "./components/Stats";


export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/items")
      const data = await response.json();
      setItems(data);
    }
    fetchData();
  }, []);


  async function handleAddItem(item) {
    try {
      const response = await fetch("http://localhost:8080/item",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  function handleToggleTab(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  async function handleClearList(){
    try {
      const response = await fetch("http://localhost:8080/items", {
        method: "DELETE",
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
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleTab}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}










