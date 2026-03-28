import supabase from "../config/db.js";

// GET all charities
export const getCharities = async (req, res) =>
{
  try
  {
    const { data, error } = await supabase
      .from("charities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
};

// SELECT / UPDATE user's charity + percentage
export const selectCharity = async (req, res) =>
{
  try
  {
    const userId = req.user.id;
    const { charity_id, percentage } = req.body;

    if (percentage < 10)
    {
      return res.status(400).json({ message: "Minimum 10% required" });
    }

    const { data, error } = await supabase
      .from("users")
      .update({
        charity_id,
        charity_percentage: percentage
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN: create charity
export const createCharity = async (req, res) =>
{
  try
  {
    const { name, description, image_url } = req.body;

    const { data, error } = await supabase
      .from("charities")
      .insert([{ name, description, image_url }])
      .select();

    if (error) throw error;

    res.json(data);
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
};
export const deleteCharity = async (req, res) =>
{
  const { id } = req.params;

  await supabase.from("charities").delete().eq("id", id);

  res.json({ message: "Deleted" });
};