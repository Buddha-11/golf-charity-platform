import API from "./api";

export const signup = (data) =>
{
  return API.post("/auth/signup", data);
};

export const login = (data) =>
{
  return API.post("/auth/login", data);
};