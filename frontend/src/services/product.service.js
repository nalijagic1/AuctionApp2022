import httpCommon from "../http-common";
class ProductDataService {
    getHighlighted() {
      return  httpCommon.get("/productRandom");
    }
  }
  export default new ProductDataService();
