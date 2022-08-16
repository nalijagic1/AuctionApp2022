import http from "../http-common";

class CountryDataService {
    getAll() {
        return http.get("/countries");
    }
}

export default new CountryDataService();