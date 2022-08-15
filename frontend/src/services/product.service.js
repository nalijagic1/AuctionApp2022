import httpCommon from "../utils/http-common";

class ProductDataService {
    getHighlighted() {
        return httpCommon.get("/products/productRandom");
    }

    getNewestOrLastChance(offer, start, count) {
        return httpCommon.get("/products/" + (offer.toString() === '1' ? "newest" : "lastChance") + "?start=" + start + "&count=" + count);
    }

    getProductsFromCategory(category, count) {
        if (category === "all") return httpCommon.get("/products/all?count=" + count);
        return httpCommon.get("/products?category=" + category + "&count=" + count);
    }

    getSearchResult(search, count) {
        return httpCommon.get("products/search?search=" + search + "&count=" + count);
    }

    getSelectedProduct(product) {
        return httpCommon.get("/products/" + product);
    }

    getSuggestion(search) {
        return httpCommon.get("/products/check?search=" + search)
    }
}

export default new ProductDataService();
