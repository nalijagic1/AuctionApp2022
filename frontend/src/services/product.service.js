import httpCommon from "../utils/http-common";

class ProductDataService {
  getHighlighted() {
    return httpCommon.get("/products/productRandom");
  }

  getNewestOrLastChance(offer, start, count) {
    return httpCommon.get(
      "/products/" +
        (offer.toString() === "1" ? "newest" : "lastChance") +
        "?start=" +
        start +
        "&count=" +
        count
    );
  }

  getProductsFromCategory(category, count,sort) {
    if (category === "all")
      return httpCommon.get("/products/all?count=" + count+"&sortField="+sort.field+"&sortDirection="+sort.direction);
    return httpCommon.get("/products?category=" + category + "&count=" + count+"&sortField="+sort.field+"&sortDirection="+sort.direction);
  }

  getSearchResult(search, count) {
    return httpCommon.get(
      "products/search?search=" + search + "&count=" + count
    );
  }

  getSelectedProduct(product) {
    return httpCommon.get("/products/" + product);
  }

  getSuggestion(search) {
    return httpCommon.get("/products/checkSpelling?search=" + search);
  }

  updatePayedStatus(payed, product) {
    return httpCommon.put(
      "/products/updatePayedStatus?product=" + product,
      payed
    );
  }

  addProduct(
    productName,
    description,
    subcategoryId,
    personId,
    startingPrice,
    startingDate,
    endingDate,
    pictures,
    address,
    phoneNumber
  ) {
    return httpCommon.post("/products/newProduct", {
      productName,
      description,
      subcategoryId,
      personId,
      startingPrice,
      startingDate,
      endingDate,
      pictures,
      address,
      phoneNumber,
    });
  }
}

export default new ProductDataService();
