export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PASSWORD_STRONG =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
export const PASSWORD_MEDIUM =
  /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;
export const LETTERS_ONLY = /^[a-zA-Z]+$/;
export const ZIPCODE_REGEX = /^[0-9]{5}(?:-[0-9]{4})?$/;
export const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://auctionapp2022.herokuapp.com/"
    : "http://localhost:3000";
