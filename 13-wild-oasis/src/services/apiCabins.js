import supabase, { supabaseUrl, supabaseKey } from "./supabase";
import axios from "axios";

export async function getCabins() {
  const { data, error } = await axios.get(`${supabaseUrl}/cabins?select=*`, {
    headers: {
      apiKey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  try {
    const res = await axios.patch(`${supabaseUrl}/cabins`, newCabin, {
      headers: {
        apiKey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error.response ? error.res.data : error.message);
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

// export async function deleteCabin(id) {
//   const { data, error } = await supabase.from("cabins").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be deleted");
//   }

//   return data;
// }

export async function deleteCabin(id) {
  try {
    const res = await axios.delete(`${supabaseUrl}/cabins?id=eq.${id}`, {
      headers: {
        apiKey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });
    return res;
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.log("Error status:", error.response.status);
      console.log("Error message:", error.response.data); // Supabase error details
    } else if (error.request) {
      // Request was made but no response
      console.log("No response received:", error.request);
    } else {
      // Other errors (e.g., setup)
      console.log("Axios error:", error.message);
    }
  }
}
