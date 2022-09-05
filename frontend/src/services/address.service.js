import httpCommon from "../utils/http-common";
import personService from "./person.service";

class AddressDataService {
  saveAddress(location) {
    return httpCommon.post("/address/addAddress/"+ personService.getCurrentUser().id, location);
  }

  getAddressFromUser(personId) {
    return httpCommon.get("/address?personId=" + personId);
  }
}

export default new AddressDataService();
