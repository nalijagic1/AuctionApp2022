import httpCommon from "../http-common";
class PictureDataService {
    getProductPicture(id) {
      return  httpCommon.get("/pictures/"+id);
    }
  }
  export default new PictureDataService();