import React, { useRef, useState } from "react";
import BreadCrumb from "../BreadCrumb";
import AddImages from "./AddImages";
import FormProduct from "./FormProduct";
import axios from "axios";
import colorNames from "colornames";

export default function AddProduct({ categories, subCategories, products, client }) {
  const imageColorPreviewRef = useRef([]);

  const [productData, setProductData] = useState({
    images: ["", "", "", ""],
    name: "",
    sku: "",
    stock: 0,
    sizes: [],
    colors: [],
    imageColors: [],
    description: "",
    price: 0,
    discountPrice: 0,
    cost: 0,
    subcategory: "",
  });

  const [error, setError] = useState({
    error: "",
    type: "",
  });

  const addImages = (index, file) => {
    setProductData((prevProductData) => {
      // Create a copy of the existing images object
      const newImages = [...prevProductData.images];

      // Update the URL for the given index
      newImages[index] = file;

      // Return a new state object with the updated images
      return { ...prevProductData, images: newImages };
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    if (e.target.type === "number") {
      let newValue = e.target.value;
      if (newValue <= 0) {
        newValue = 0;
      }

      if (isNaN(newValue)) {
        newValue = 1;
      }
      setProductData({
        ...productData,
        [name]: newValue,
      });
    } else {
      setProductData({
        ...productData,
        [name]: e.target.value,
      });
    }
  };

  const handleUpload = () => {
    const formData = new FormData();

    for (let index = 0; index < 4; index++) {
      if (productData.images[index] instanceof File) {
        formData.append(`file_${index}`, productData.images[index]);
      }
    }

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;

    // If the checkbox is checked, add its value to the array
    if (e.target.checked) {
      setProductData({ ...productData, sizes: [...productData.sizes, value] });
    } else {
      // If the checkbox is unchecked, remove its value from the array
      setProductData({
        ...productData,
        sizes: productData.sizes.filter((item) => item !== value),
      });
    }
  };

  const addColor = (e) => {
    e.preventDefault();
    setProductData({ ...productData, colors: [...productData.colors, ['color0',"#000"]] });
  };

  const addImageColor = (e, newImageColor) => {
    e.preventDefault();
    setProductData({ ...productData, imageColors: newImageColor});
  };

  const handleChangeColor = (e, index) => {
    const newColor = [...productData.colors];
    newColor[index] = ['color'+index,e.target.value];
    setProductData({ ...productData, colors: newColor });
  };

  const removeColor = (e, index) => {
    e.preventDefault();
    const newColor = [...productData.colors];
    setProductData({
      ...productData,
      colors: newColor.filter((value, i) => i !== index),
    });
  };

  const removeImageColor = (e, index) => {
    e.preventDefault();
    const newImageColor = [...productData.imageColors];

    setProductData({
      ...productData,
      imageColors: newImageColor.filter((value, i) => i !== index),
    });
    imageColorPreviewRef.current = newImageColor.filter(
      (value, i) => i !== index
    );
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setError({
      error: "",
      type: "",
    });

    if (productData.name.trim() === "") {
      return setError({
        error: "Product Name is empty",
        type: "name",
      });
    }

    if (products.find((value) => value === productData.name)) {
      return setError({
        error: "Product Name is already exist",
        type: "name",
      });
    }

    if (productData.subcategory.trim() === "") {
      return setError({
        error: "Subcategory is empty",
        type: "subcategory",
      });
    }

    if (productData.sku.trim() === "") {
      return setError({
        error: "Sku is empty",
        type: "sku",
      });
    }

    if (productData.discountPrice !== 0) {
      if (productData.price <= productData.discountPrice) {
        return setError({
          error: "Discount Price must be lower than Price",
          type: "discountPrice",
        });
      }
    }

    if (productData.cost !== 0) {
      if (productData.price <= productData.cost) {
        return setError({
          error: "Cost must be lower than Price",
          type: "cost",
        });
      }
    }

    

    const formData = new FormData();
    formData.append(
      "productName",
      productData.name.trim().replace(/\s+/g, "-").toLowerCase()
    );
    productData.images.forEach((file) => {
      formData.append("files", file);
    });

    productData.imageColors.forEach((file) => {
      formData.append("files", file[1]);
    });

    const data = {
      ...productData,
      images: JSON.stringify(productData.images.map(value => value.name !== undefined ? ('/uploads/'+ productData.name.trim().replace(/\s+/g, "-").toLowerCase()+'/' +value.name) : undefined).filter(value => value !== undefined)),
      imageColors : productData.imageColors.map(value => value !== "" ? [value[0],('/uploads/'+ productData.name.trim().replace(/\s+/g, "-").toLowerCase()+'/' +value[1].name)] : undefined).filter(value => value !== undefined)
    }

    await axios.post(`https://akenord.onrender.com/api/product/${client.username}`,{...data,...client})
    .then(async(response) => {

      await axios.post("https://akenord.onrender.com/api/upload",formData)
      .then((response) => {
      }).catch((error) => {
        console.log(error);
      })
    }).catch((error) => {
      console.log(error);
    })

    
   


  
  };
  return (
    <div className="content">
      <BreadCrumb title="Add Product" firstP="Home" secondP="Product" />
      <div className="row">
        <div className="col-12">
          <div className="card card-default">
            <div className="card-header card-header-border-bottom">
              <h2>Add Product</h2>
            </div>

            <div className="card-body">
              <div className="row ec-vendor-uploads">
                <AddImages addImages={addImages} />
                <div className="col-lg-8">
                  <div className="ec-vendor-upload-detail">
                    <FormProduct
                      productData={productData}
                      handleChange={handleChange}
                      handleCheckboxChange={handleCheckboxChange}
                      categories={categories}
                      subCategories={subCategories}
                      handleOnSubmit={handleOnSubmit}
                      addImageColor={addImageColor}
                      addColor={addColor}
                      handleChangeColor={handleChangeColor}
                      removeColor={removeColor}
                      removeImageColor={removeImageColor}
                      imageColorPreviewRef={imageColorPreviewRef}
                      error={error}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
