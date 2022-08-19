import httpCommon from "../utils/http-common";
import authHeader from "../utils/auth-header";

class BidDataService {
  getBidCount(productId) {
    return httpCommon.get("/bidCount/" + productId);
  }

  getHighestBid(productId) {
    return httpCommon.get("/highestBid/" + productId);
  }

  placeBid(personId, productId, bid) {
    return httpCommon.post(
      "/registered/placeBid",
      { productId, personId, bid },
      { headers: authHeader() }
    );
  }
}

export default new BidDataService();
