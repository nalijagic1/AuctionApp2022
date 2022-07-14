import http from "../http-common";

class CategoryDataService {
    getAll() {
        return http.get("/categories");
    }

    getCategoriesWithSubcategories(){
        return http.get("/categoriesWithSubcategories");
    }
}

export default new CategoryDataService();
