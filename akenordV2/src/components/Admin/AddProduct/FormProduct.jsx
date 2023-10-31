import React, { useEffect, useRef, useState } from "react";
import { categories } from "../../../actions/CategoryActions";

export default function FormProduct({
  productData,
  handleChange,
  handleCheckboxChange,
  categories,
  subCategories,
  handleOnSubmit,
  addColor,
  handleChangeColor,
  removeColor,
  addImageColor,
  removeImageColor,
  imageColorPreviewRef,
  error
}) {
  const handleImageChange = (e, index) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const ecImagePreview = imageColorPreviewRef.current[index];
        if (ecImagePreview) {
          ecImagePreview.src = e.target.result;
          ecImagePreview.style.display = "none";
          ecImagePreview.style.animation = "fade-in 0.65s";
          ecImagePreview.style.display = "block";
        }
      };
      reader.readAsDataURL(fileInput.files[0]);
      const newImageColor = [...productData.imageColors];
      newImageColor[index] = ['variant'+index,fileInput.files[0]];
      addImageColor(e, newImageColor);
    }
  };

  return (
    <form className="row g-3" onSubmit={handleOnSubmit}>
      <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">
          Product name
        </label>
        {error.type ==="name" && <p style={{color : "red", fontSize : "12px"}}>{error.error}</p>}
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
          className="form-control slug-title"
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Select Categories</label>
        {error.type ==="subcategory" && <p style={{color : "red", fontSize : "12px"}}>{error.error}</p>}
        <select
          name="subcategory"
          id="subcategory"
          className="form-select"
          value={productData.subcategory}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select SubCategory
          </option>
          {categories.map((value) => (
            <optgroup label={value.name} key={value.id}>
              {subCategories.map(
                (sub, index) =>
                  sub._embedded.category.id == value.id && (
                    <option value={sub.name} key={index}>
                      {sub.name}
                    </option>
                  )
              )}
            </optgroup>
          ))}
        </select>
      </div>
      <div className="col-md-12">
        <label htmlFor="slug" className="col-12 col-form-label">
          Sku
        </label>
        {error.type ==="sku" && <p style={{color : "red", fontSize : "12px"}}>{error.error}</p>}
        <div className="col-12">
          <input
            id="sku"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="form-control here set-slug"
            type="text"
          />
        </div>
      </div>
      <div className="col-md-12">
        <label className="form-label">Sort Description</label>
        <textarea
          className="form-control"
          name="description"
          rows="2"
          value={productData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="col-md-4 mb-25">
        <label className="form-label">Colors</label>
        {productData.colors.map((value, index) => (
          <div style={{ display: "inline" }} key={index}>
            <input
              type="color"
              className="form-control form-control-color"
              id={index}
              value={value[1]}
              onChange={(e) => handleChangeColor(e, index)}
              onDoubleClick={(e) => removeColor(e, index)}
              title="Choose your color"
            />
            <button
              type="button"
              onClick={(e) => removeColor(e, index)}
              className="removeColor"
            >
              X
            </button>
          </div>
        ))}
        <div
          style={{ display: "flex", flexWrap: "wrap", marginBottom: "10px" }}
        >
          {productData.imageColors.map((value, index) => (
            <div className="ec-vendor-img-upload" key={index}>
              <div className="ec-vendor-main-img">
                <div className="thumb-upload-set colo-md-12">
                  <div className="thumb-upload" key={index}>
                    <div className="thumb-edit">
                      <input
                        type="file"
                        id={"thumbUpload0" + index}
                        className="ec-image-upload"
                        onChange={(e) => handleImageChange(e, index)}
                        accept=".png, .jpg, .jpeg"
                      />
                      <label
                        htmlFor="imageUpload"
                        style={{ width: "25px", height: "25px" }}
                      >
                        <img
                          src="/img/pencil_edit.svg"
                          className="svg_img header_svg"
                          alt="edit"
                        />
                      </label>
                    </div>
                    <div className="thumb-preview ec-preview">
                      <div
                        className="image-thumb-preview"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <img
                          className="image-thumb-preview ec-image-preview"
                          src="/img/vender-upload-thumb-preview.jpg"
                          ref={(ref) =>
                            (imageColorPreviewRef.current[index] = ref)
                          }
                          alt="edit"
                        />
                      </div>
                    </div>
                  </div>
                  {index === productData.imageColors.length - 1 && (
                    <button
                      type="button"
                      onClick={(e) => removeImageColor(e, index)}
                      className="removeImageColor"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex" }}>
          <button
            type="button"
            className="form-control form-control-color"
            style={{ backgroundColor: "blue", color: "white", fontSize: "9px" }}
            onClick={(e) => addColor(e)}
          >
            Color
          </button>
          <button
            type="button"
            name="image"
            className="form-control form-control-color"
            style={{
              backgroundColor: "blue",
              color: "white",
              fontSize: "9px",
            }}
            onClick={(e) => addImageColor(e, [...productData.imageColors, ""])}
          >
            Image
          </button>
        </div>
      </div>
      <div className="col-md-8 mb-25">
        <label className="form-label">Size</label>
        <div className="form-checkbox-box">
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              name="s"
              value="s"
              onChange={handleCheckboxChange}
            />
            <label>S</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              name="m"
              value="m"
              onChange={handleCheckboxChange}
            />
            <label>M</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              name="l"
              value="l"
              onChange={handleCheckboxChange}
            />
            <label>L</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              name="xl"
              value="xl"
              onChange={handleCheckboxChange}
            />
            <label>XL</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              name="xxl"
              value="xxl"
              onChange={handleCheckboxChange}
            />
            <label>XXL</label>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <label className="form-label">
          Price <span>( In DH )</span>
        </label>
        <input
          type="number"
          className="form-control"
          id="price1"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">
          Discount Price <span>(Optional)</span>
        </label>
        {error.type ==="discountPrice" && <p style={{color : "red", fontSize : "12px"}}>{error.error}</p>}
        <input
          type="number"
          className="form-control"
          id="price1"
          name="discountPrice"
          value={productData.discountPrice}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">
          Cost <span>(In DH)</span>
        </label>
        {error.type ==="cost" && <p style={{color : "red", fontSize : "12px"}}>{error.error}</p>}
        <input
          type="number"
          className="form-control"
          id="price1"
          name="cost"
          value={productData.cost}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          id="quantity1"
          name="stock"
          value={productData.stock}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-12">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
