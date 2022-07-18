import httpCommon from "../http-common";

class BidDataService {
    getBidCount(productId) {
        return httpCommon.get("/bids/bidCount/" + productId);
    }

    getHighestBid(productId) {
        return httpCommon.get("/bids/highestBid/" + productId);
    }
}

export default new BidDataService();
