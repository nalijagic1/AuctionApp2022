export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PASSWORD_STRONG =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
export const PASSWORD_MEDIUM =
  /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;
export const LETTERS_ONLY = /^[a-zA-Z]+$/;
export const ZIPCODE_REGEX = /^[0-9]{5}(?:-[0-9]{4})?$/;
export const PHONE_NUMBER_REGEX = /^[+]([0-9]+)$/;
export const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://auctionapp2022.herokuapp.com"
    : "http://localhost:3000";
export const STRIPE_PUBLIC =
  "pk_test_51LVB8xBj1vinbdx6NyD5IYpzSgWonLR41HNAETguKGEXelw3DcPqP0l3JQ69NAsJOjrfPue0tK2rjJ423fr5PgJS00fSun4phx";
export const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/dttoyjaor/image/upload";
export const CLOUDINARY_UPLOAD_PRESET = "auction";
