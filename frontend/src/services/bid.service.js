import httpCommon from "../http-common";

class BidDataService {
    getBidCount(productId) {
        return httpCommon.get("/bids/bidCount/" + productId);
    }

    getHighestBid(productId) {
        return httpCommon.get("/bids/highestBid/" + productId);
    }

    placeBid(person,product,bid){
        return httpCommon.post("/bids/bid",{product,person,bid})
    }
}

export default new BidDataService();
