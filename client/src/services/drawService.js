import API from "./api";

export const getLatestDraw = () =>
{
  return API.get("/draw/latest");
};

export const getWinners = () =>
{
  return API.get("/draw/winners");
};

export const runDraw = (token) =>
{
  return API.post("/draw/run", {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getMyWinnings = (token) =>
{
  return API.get("/draw/my", {
    headers: { Authorization: `Bearer ${token}` }
  });
};