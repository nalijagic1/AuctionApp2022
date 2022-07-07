import httpCommon from "../http-common";

class ProductDataService {
    getHighlighted() {
        return httpCommon.get("/products/productRandom");
    }

    getNewestOrLastChance(offer, start, count) {
        return httpCommon.get("/products/" + (offer.toString() === '1' ? "newest" : "lastChance") + "?start=" + start + "&count=" + count);
    }
<<<<<<< HEAD
}

export default new ProductDataService();
=======
    getSelectedProduct(product){
      return httpCommon.get("/product/"+product)
    }
  }
  export default new ProductDataService();
>>>>>>> c6131fd (Implemented bidding field and button)
