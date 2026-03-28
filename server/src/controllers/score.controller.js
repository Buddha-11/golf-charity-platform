import supabase from "../config/db.js";

// ADD SCORE (maintain only 5)
export const addScore = async (req, res) =>
{
  try
  {
    const userId = req.user.id;
    const { score, date } = req.body;

    // get existing scores
    const { data: scores } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: true });

    // if already 5 → delete oldest
    if (scores.length >= 5)
    {
      const oldest = scores[0];

      await supabase
        .from("scores")
        .delete()
        .eq("id", oldest.id);
    }

    // insert new score
    const { data, error } = await supabase
      .from("scores")
      .insert([
        { user_id: userId, score, date }
      ])
      .select();

    if (error) throw error;

    res.json(data);
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
};

// GET SCORES (latest first)
export const getScores = async (req, res) =>
{
  try
  {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) throw error;

    res.json(data);
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
};