import supabase from "../config/db.js";

const generateNumbers = () =>
{
  const set = new Set();
  while (set.size < 5)
  {
    set.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(set);
};

export const runDraw = async (req, res) =>
{
  try
  {
    const numbers = generateNumbers();

    const { data: draw } = await supabase
      .from("draws")
      .insert([{ numbers }])
      .select()
      .single();

    const { data: users } = await supabase
      .from("users")
      .select("id");

    let winners = [];

    for (let user of users)
    {
      const { data: scores } = await supabase
        .from("scores")
        .select("score")
        .eq("user_id", user.id);

      const userScores = scores.map(s => s.score);

      const matchCount = numbers.filter(n =>
        userScores.includes(n)
      ).length;

      if (matchCount >= 3)
      {
        winners.push({
          user_id: user.id,
          draw_id: draw.id,
          match_count: matchCount
        });
      }
    }

    // 💰 TOTAL POOL (dummy for now)
    const totalPool = 1000;

    const prizeMap = {
      5: 0.5,
      4: 0.3,
      3: 0.2
    };

    // group winners
    const grouped = { 3: [], 4: [], 5: [] };

    winners.forEach(w =>
    {
      grouped[w.match_count].push(w);
    });

    let finalWinners = [];

    for (let match of [5, 4, 3])
    {
      const group = grouped[match];

      if (group.length > 0)
      {
        const totalPrize = totalPool * prizeMap[match];
        const perUser = totalPrize / group.length;

        group.forEach(w =>
        {
          finalWinners.push({
            ...w,
            prize_amount: perUser
          });
        });
      }
    }

    if (finalWinners.length > 0)
    {
      await supabase.from("winners").insert(finalWinners);
    }

    res.json({ draw, winners: finalWinners });
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
};

export const getLatestDraw = async (req, res) =>
{
  try
  {
    const { data, error } = await supabase
      .from("draws")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    res.json(data);
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
};
export const getUserWinnings = async (req, res) =>
{
  const userId = req.user.id;

  const { data } = await supabase
    .from("winners")
    .select("*")
    .eq("user_id", userId);

  res.json(data);
};

export const getWinners = async (req, res) =>
{
  try
  {
    const { data, error } = await supabase
      .from("winners")
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