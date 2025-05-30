import axios from "axios";
import toast from "react-hot-toast";

export async function getCabins() {
  const { data, error } = await axios.get("http://localhost:8080/cabin");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  try {
    const { image, ...cabinFields } = newCabin;

    const formData = new FormData();
    formData.append(
      "cabin",
      new Blob([JSON.stringify(cabinFields)], { type: "application/json" })
    );
    formData.append("file", image);

    const res = await axios.post(
      `http://localhost:8080/cabin/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.error("Error:", error.response ? error.res.data : error.message);
  }
}

export async function editCabins(cabin) {
  try {
    console.log(cabin);
    const res = await axios.post(
      `http://localhost:8080/cabin/edit/${cabinId}`,
      cabin
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.error("Error:", error.response ? error.res.data : error.message);
    toast.error("error.response.message");
  }
}

export async function deleteCabin(cabinId) {
  try {
    const res = await axios.delete(`http://localhost:8080/cabin`);
    console.log(res);
  } catch (error) {}
}
