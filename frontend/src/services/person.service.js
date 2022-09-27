import moment from "moment";
import httpCommon from "../utils/http-common";

class PersonDataService {
  logIn(email, password) {
    return httpCommon
      .post("/people/login", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  createAccount(firstName, lastName, email, password) {
    return httpCommon
      .post("/people/register", { firstName, lastName, email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) return user.user;
    return null;
  }

  getAllUsers(page, count, filters, sort, search, viewed) {
    return httpCommon.post(
      filters.length === 0 ? "/people" : "/people/filtered",
      { page, count, filters, sort, search, viewed }
    );
  }

  updateStatus(personId, status, statusReason) {
    return httpCommon.put(
      "/people/updateUserStatus?status=" +
        status +
        "&personId=" +
        personId +
        "&statusReason=" +
        statusReason
    );
  }

  getUpdatedStatusCount(status) {
    return httpCommon.get("/people/updatedStatusCount/" + status);
  }

  updateViewedStatus(viewed, status) {
    httpCommon.put(
      "/people/updateViewedStatus?viewedStatus=" + viewed + "&status=" + status
    );
  }

  sendResetEmail(email) {
    return httpCommon.post("/people/sendResetEmail?email=" + email);
  }

  changePassword(email, password) {
    return httpCommon.put("/people/changePassword", { email, password });
  }
}

export default new PersonDataService();
