import ArchivedUser from "../icons/archivedUser";
import BlackUser from "../icons/blackUser";
import GoldenUser from "../icons/goldenUser";
import RestrictedUser from "../icons/restrictedUser";

export const ROLES = {
  ADMIN: "Admin",
  USER: "User",
  GOLDEN: "Golden status user",
  RESTRICTED: "Restricted user",
  ARCHIVED: "Archived user",
  BLACK: "Black listed user",
};

export const ROLES_ICON = {
  Golden: <GoldenUser></GoldenUser>,
  Archived: <ArchivedUser></ArchivedUser>,
  Black: <BlackUser></BlackUser>,
  Restricted: <RestrictedUser></RestrictedUser>,
  User: "",
};

export const ROLES_CODE = {
  ADMIN: 0,
  USER: 1,
  GOLDEN: 2,
  RESTRICTED: 3,
  ARCHIVED: 5,
  BLACK: 4,
};
