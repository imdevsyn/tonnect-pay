import axios from "axios";

export const tonapi = axios.create({
  baseURL: "https://tonapi.io/v2",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TONAPI_KEY}`,
  },
});
