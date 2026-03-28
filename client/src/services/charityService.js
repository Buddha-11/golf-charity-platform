import API from "./api";

export const getCharities = () =>
{
  return API.get("/charities");
};

export const selectCharity = (data, token) =>
{
  return API.post("/charities/select", data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};