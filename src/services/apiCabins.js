import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}

export async function createEditCabin(newCabin, id) {
  // https://qgvmjhrgenblumiegwkz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  //creating cabin
  const hasPath = newCabin.image?.startsWith?.(supabaseUrl);

  let query = supabase.from("cabins");

  const imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const path = hasPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

  //if theres no id, meaning we are not editing a cabin
  if (!id) query = query.insert([{ ...newCabin, image: path }]);

  //we are editing a cabin
  if (id)
    query = query
      .update({ ...newCabin, image: path })
      .eq("id", id)
      .select();

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be added");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }
  return data;
}
