import httpCommon from "../utils/http-common";

class AddressDataService {
  saveAddress(location) {
    return httpCommon.post("/address/addAddress", location);
  }

  getAddressFromUser(personId) {
    return httpCommon.get("/address?personId=" + personId);
  }
}

export default new AddressDataService();
