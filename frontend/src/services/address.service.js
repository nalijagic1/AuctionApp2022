import httpCommon from "../utils/http-common";

class AddressDataService {
  saveAddress(location) {
    return httpCommon.post("/address/addAddress", location);
  }
}

export default new AddressDataService();
