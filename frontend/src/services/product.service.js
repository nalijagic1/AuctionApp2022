import httpCommon from "../http-common";

class ProductDataService {
    getHighlighted() {
        return httpCommon.get("/products/productRandom");
    }
    getSelectedProduct(product){
        return httpCommon.get("/product/"+product)
    }
    getNewestOrLastChance(offer, start, count) {
        return httpCommon.get("/products/" + (offer.toString() === '1' ? "newest" : "lastChance") + "?start=" + start + "&count=" + count);
    }

    getProductsFromCategory(category){
        return httpCommon.get("/products?categoryId="+category)
    }
}

export default new ProductDataService();
