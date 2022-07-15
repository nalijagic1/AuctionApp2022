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

    getProductsFromCategory(category,count){
        return httpCommon.get("/products?category="+category+"&count="+count)
    }

    getSearchResult(search,count){
        return httpCommon.get("/search?search="+search+"&count="+count)
    }
}

export default new ProductDataService();
