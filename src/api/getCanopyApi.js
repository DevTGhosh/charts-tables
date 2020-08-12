import axios from "axios";

export async function getNetworth() {
  const url = "https://canopy-frontend-task.now.sh/api/networth";
  const { data } = await axios.get(url);
  return data;
}

export async function getHoldings() {
  const url = "https://canopy-frontend-task.now.sh/api/holdings";
  const { data } = await axios.get(url);
  return data;
}
