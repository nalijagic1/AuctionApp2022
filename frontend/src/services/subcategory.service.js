import httpCommon from "../http-common";

class SubcategoryDataService {
    getSubcategoriesFromCategory(catgeoryId){
        return httpCommon.get("subcategories/"+catgeoryId)
    }
}

export default new SubcategoryDataService();