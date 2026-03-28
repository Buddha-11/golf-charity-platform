import API from "./api";

export const addScore = (data, token) =>
{
  return API.post("/scores", data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getScores = (token) =>
{
  return API.get("/scores", {
    headers: { Authorization: `Bearer ${token}` }
  });
};