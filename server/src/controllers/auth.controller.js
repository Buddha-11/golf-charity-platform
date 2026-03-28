import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// TEMP in-memory DB (replace later with Supabase)
let users = [];

export const signup = async (req, res) =>
{
  const { name, email, password } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser)
  {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    role: "user"
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    "SECRET_KEY",
    { expiresIn: "7d" }
  );

  res.json({ token, user: newUser });
};

export const login = async (req, res) =>
{
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user)
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
    "SECRET_KEY",
    { expiresIn: "7d" }
  );

  res.json({ token, user });
};