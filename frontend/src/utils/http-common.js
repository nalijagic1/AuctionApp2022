import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://auctionbackend2022.herokuapp.com"
      : "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
});
