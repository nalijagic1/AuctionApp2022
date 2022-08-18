import httpCommon from "../utils/http-common";
import authHeader from "../auth-header";

class BidDataService {
    getBidCount(productId) {
        return httpCommon.get("/bidCount/" + productId);
    }

    getHighestBid(productId) {
        return httpCommon.get("/highestBid/" + productId);
    }

    placeBid(person, product, bid) {
        return httpCommon.post("/auth/placeBid", {product, person, bid}, {headers: authHeader()})
    }
}

export default new BidDataService();
