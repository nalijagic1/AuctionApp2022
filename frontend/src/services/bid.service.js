import httpCommon from "../http-common";
import authHeader from "../auth-header";

class BidDataService {
    getBidCount(productId) {
        return httpCommon.get("/bidCount/" + productId);
    }

    getHighestBid(productId) {
        return httpCommon.get("/highestBid/" + productId);
    }

    placeBid(person, product, bid) {
        return httpCommon.post("/auth/bid", {product, person, bid}, {headers: authHeader()})
    }
}

export default new BidDataService();
