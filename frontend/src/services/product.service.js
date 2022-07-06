import httpCommon from "../http-common";
class ProductDataService {
    getHighlighted() {
      return  httpCommon.get("/productRandom");
    }
    getNewestOrLastChance(offer,start,count){
      if(offer == 1){
        return httpCommon.get("/newest?start="+start+"&count="+count)
      }else if(offer == 2){
        return httpCommon.get("/lastChance?start="+start+"&count="+count)
      }
    }
  }
  export default new ProductDataService();
