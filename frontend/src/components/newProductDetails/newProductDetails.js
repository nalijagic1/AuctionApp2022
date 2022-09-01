import { React, useState, useEffect } from "react";
import Field from "../field/field";
import categoryService from "../../services/category.service";
import ImagePreview from "../imagePreview/imagePreview";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import validation from "../../utils/validation";
import "./newProductDetails.css";
function NewProductDetails(props) {
  const [productName, setProductName] = useState("");
  const [subcategory, setSubcategory] = useState(0);
  const [categories, setCategories] = useState();
  const [pictures, setPictures] = useState([]);
  const [description, setDescription] = useState();
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState({
    productName: "",
    subcategory: "",
    description: "",
    pictures: "",
  });

  function deleteImage(imageIndex) {
    setPictures((p) => {
      p.splice(imageIndex, 1);
      return p;
    });
  }
  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setError({
        productName: error.productName,
        subcategory: error.subcategory,
        description: error.description,
        pictures: "",
      });
      setPictures((p) => p.concat(e.dataTransfer.files[0]));
    }
  }

  function dataValidation() {
    let validationResult = validation.validateProductDetails({
      productName,
      subcategory,
      description,
      pictures,
    });
    setError(validationResult.errorMessages);
    return validationResult.valid;
  }
  const navigate = useNavigate();
  useEffect(() => {
    categoryService.getCategoriesWithSubcategories().then((response) => {
      if (response.status === 200) setCategories(response.data);
    });
  }, []);
  return (
    <div className="newProductDetails">
      <h5>ADD ITEM</h5>
      <div className="newProductBasicInfo">
        <Field
          placeHolder="eg. Targeal 7.1 Surround Sound Gaming Headset for PS4"
          fieldClass="loginAndRegisterField"
          label="What do you sell?"
          type="text"
          id="productName"
          onChange={(e) => {
            setError({
              productName: "",
              subcategory: error.subcategory,
              description: error.description,
              pictures: error.pictures,
            });
            setProductName(e.target.value);
          }}
          value={productName}
          error={error.productName}
        />
        <select
          className={`categorySelector ${
            error.subcategory ? "errorStyle" : ""
          }`}
          onChange={(e) => {
            setError({
              productName: error.productName,
              subcategory: "",
              description: error.description,
              pictures: error.pictures,
            });
            setSubcategory(e.target.value);
          }}
          value={`${subcategory}`}
        >
          <option key="0" value="0" disabled>
            Select your category
          </option>
          {categories &&
            categories.map((category) => {
              return (
                <optgroup
                  key={category.category.id}
                  label={category.category.name}
                >
                  {category.subcategories.map((subcategory) => {
                    return (
                      <option
                        key={subcategory.subcategoryId}
                        value={subcategory.subcategoryId}
                      >
                        {subcategory.name}
                      </option>
                    );
                  })}
                </optgroup>
              );
            })}
        </select>
        {error.subcategory && (
          <p className="errorMessage">{error.subcategory}</p>
        )}
        <label className={`descriptionLabel `}>Description</label>
        <textarea
          className={`descriptionTextarea  ${
            error.description ? "errorStyle" : ""
          }`}
          maxLength={700}
          value={description}
          onChange={(event) => {
            setError({
              productName: error.description,
              subcategory: error.subcategory,
              description: "",
              pictures: error.pictures,
            });
            setDescription(event.target.value);
          }}
        />
        {error.description ? (
          <p className="errorMessage ">{error.description}</p>
        ) : (
          <p className="textAreaLimit">100 words (700 characters)</p>
        )}
        {pictures.length === 0 ? (
          <div
            className={`imageUploader ${dragActive ? "dragActive" : ""}  ${
              error.pictures ? "errorStyle" : ""
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <label htmlFor="imageInput" className="imageInputField">
              Upload image
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setError({
                    productName: error.productName,
                    subcategory: error.subcategory,
                    description: error.description,
                    pictures: "",
                  });
                  setPictures((p) => p.concat(event.target.files[0]));
                }}
              />
            </label>
            <br></br>
            Or just drag and drop
            <p className="photoLimit">(Add at least 3 photos)</p>
          </div>
        ) : (
          <div
            className={`imageUploaded  ${error.pictures ? "errorStyle" : ""}`}
          >
            {pictures.map((picture) => {
              return (
                <ImagePreview
                  image={URL.createObjectURL(picture)}
                  index={pictures.indexOf(picture, 0)}
                  name={productName}
                  deleteImage={(index) => deleteImage(index)}
                />
              );
            })}
            <label htmlFor="imageInput" className="imageMoreInput">
              <AiOutlinePlusCircle className="addIcon" />
              Add more photos
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setPictures((p) => p.concat(event.target.files[0]));
                }}
              />
            </label>
          </div>
        )}
        {error.pictures && <p className="errorMessage ">{error.pictures}</p>}
      </div>
      <div className="stepsButtons">
        <Button
          label="CANCEL"
          buttonClass="cancel"
          onClick={() => navigate("/")}
        />
        <Button
          label="NEXT"
          buttonClass="purpleButton"
          onClick={() => {
            if (dataValidation()) {
              props.setProductInfo({
                productName: productName,
                subcategoryId: subcategory,
                description: description,
                pictures: pictures,
              });
              props.nextStep();
            }
          }}
        />
      </div>
    </div>
  );
}

export default NewProductDetails;
