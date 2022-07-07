import httpCommon from "../http-common";
class BidDataService {
   getBidCount(productId){
    return httpCommon.get("/bidCount/"+productId);
   }

   getHighestBid(productId){
    return httpCommon.get("/highestBid/"+productId);
   }
  }
  export default new BidDataService();