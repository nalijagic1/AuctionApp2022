import httpCommon from "../http-common";

class ProductDataService {
    getHighlighted() {
        return httpCommon.get("/productRandom");
    }

    getNewestOrLastChance(offer, start, count) {
        return httpCommon.get("/" + (offer === 1 ? "newest" : "lastChance") + "?start=" + start + "&count=" + count);
    }
}

export default new ProductDataService();
