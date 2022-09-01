import httpCommon from "../utils/http-common";
import { CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET } from "../utils/constants";

class PictureDataService {
  getProductPictures(id) {
    return httpCommon.get("/pictures/" + id);
  }

  getProductCoverPicture(id) {
    return httpCommon.get("/pictures/cover/" + id);
  }

  async saveImageOnCloudinary(image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.secure_url !== "") {
      return data.secure_url;
    }
  }
}

export default new PictureDataService();
