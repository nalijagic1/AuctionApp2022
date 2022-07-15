import httpCommon from "../http-common";

class ProductDataService {
    getHighlighted() {
        return httpCommon.get("/products/productRandom");
    }

    getNewestOrLastChance(offer, start, count) {
        return httpCommon.get("/products/" + (offer.toString() === '1' ? "newest" : "lastChance") + "?start=" + start + "&count=" + count);
    }
    getSelectedProduct(product) {
        return httpCommon.get("/products/" + product);
    }
}

export default new ProductDataService();
