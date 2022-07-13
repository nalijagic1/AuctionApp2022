import httpCommon from "../http-common";

class PictureDataService {
    getProductPictures(id) {
        return httpCommon.get("/pictures/" + id);
    }

    getProductCoverPicture(id) {
        return httpCommon.get("/pictures/cover/" + id);
    }
}

export default new PictureDataService();
