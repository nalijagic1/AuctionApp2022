import ArchivedUser from "../icons/archivedUser";
import BlackUser from "../icons/blackUser";
import GoldenUser from "../icons/goldenUser";
import RegularUser from "../icons/regularUser";
import RestrictedUser from "../icons/restrictedUser";

export const ROLES = {
  ADMIN: "Admin",
  USER: "User",
  GOLDEN: "Golden status user",
  RESTRICTED: "Restricted user",
  ARCHIVED: "Archived user",
  BLACK: "Black listed user",
};

export const ROLES_TITLES = {
  USER: "Regular",
  GOLDEN: "Golden",
  RESTRICTED: "Restricted",
  ARCHIVED: "Archived",
  BLACK: "Black listed",
};

export const ROLES_ICON = {
  Golden: <GoldenUser className="tooltipIcons"></GoldenUser>,
  Archived: <ArchivedUser className="tooltipIcons"></ArchivedUser>,
  Black: <BlackUser className="tooltipIcons"></BlackUser>,
  Restricted: <RestrictedUser className="tooltipIcons"></RestrictedUser>,
  User: <RegularUser className="tooltipIcons"></RegularUser>,
};

export const ROLES_CODE = {
  ADMIN: 0,
  USER: 1,
  GOLDEN: 2,
  RESTRICTED: 3,
  ARCHIVED: 5,
  BLACK: 4,
};

export const REMOVE_STATUS_MESSAGE = {
  GOLDEN: "Are you sure you want to remove golden status to these users?",
  RESTRICTED: "Are you sure you want remove restriction to these users?",
  BLACK: "Are you sure you want remove these users from black list?",
};

export const REMOVE_STATUS_BUTTON = {
  2: "Remove Golden Status",
  3: "Remove Restriction",
  4: "Remove from Black List",
};

export const STATUS_REASONS = {
  ADMIN_GRANTED:"ADMIN_GRANTED",
  BLACK_LISTED_CARD:"BLACK_LISTED_CARD",
  NO_FUND_CARD:"NO_FUND_CARD",
  SUCCESSFUL_MONTH:"SUCCESSFUL_MONTH",
  REGULAR:"REGULAR",
  NON_ACTIVE:"NON_ACTIVE"
}
