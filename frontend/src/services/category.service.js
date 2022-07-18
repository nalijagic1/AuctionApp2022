import http from "../http-common";

class CategoryDataService {
    getAll() {
        return http.get("/categories");
    }

    getCategoriesWithSubcategories() {
        return http.get("/categories/subcategories");
    }
}

export default new CategoryDataService();
