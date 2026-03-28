import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../config/db.js";

// SIGNUP
export const signup = async (req, res) =>
{
  try
  {
    const { name, email, password } = req.body;

    // check existing user
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser)
    {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashedPassword
        }
      ])
      .select()
      .single();

    if (error)
    {
      return res.status(500).json({ error });
    }

    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: data });
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req, res) =>
{
  try
  {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user || error)
    {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
    {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  }
  catch (err)
  {
    res.status(500).json({ message: err.message });
  }
};