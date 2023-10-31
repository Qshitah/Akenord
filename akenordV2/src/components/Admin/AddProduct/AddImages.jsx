import React, { useRef } from "react";

export default function AddImages({ addImages }) {
  const imagePreviewRef = useRef([]);

  const handleImageChange = (e, index) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const ecImagePreview = imagePreviewRef.current[index];
        ecImagePreview.src = e.target.result;
        ecImagePreview.style.display = "none";
        ecImagePreview.style.animation = "fade-in 0.65s";
        ecImagePreview.style.display = "block";
      };
      reader.readAsDataURL(fileInput.files[0]);
      addImages(index, fileInput.files[0]);
    }
  };

  

  return (
    <div className="col-lg-4">
      <div className="ec-vendor-img-upload">
        <div className="ec-vendor-main-img">
          <div className="avatar-upload">
            <div className="avatar-edit">
              <input
                type="file"
                multiple 
                id="imageUpload"
                className="ec-image-upload"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => handleImageChange(e, 0)}
              />
              <label htmlFor="imageUpload">
                <img
                  src="/img/pencil_edit.svg"
                  className="svg_img header_svg"
                  alt="edit"
                />
              </label>
            </div>
            <div className="avatar-preview ec-preview">
              <div className="imagePreview ec-div-preview">
                <img
                  className="ec-image-preview"
                  src="/img/vender-upload-preview.jpg"
                  ref={(ref) => (imagePreviewRef.current[0] = ref)}
                  alt="edit"
                />
              </div>
            </div>
          </div>

          <div className="thumb-upload-set colo-md-12">
            {Array.from({ length: 3 }, (_, index) => (
              <div className="thumb-upload" key={index}>
                <div className="thumb-edit">
                  <input
                    type="file"
                    multiple 
                    id={"thumbUpload0" + index}
                    className="ec-image-upload"
                    onChange={(e) => handleImageChange(e, index + 1)}
                    accept=".png, .jpg, .jpeg"
                  />
                  <label htmlFor="imageUpload">
                    <img
                      src="/img/pencil_edit.svg"
                      className="svg_img header_svg"
                      alt="edit"
                    />
                  </label>
                </div>
                <div className="thumb-preview ec-preview">
                  <div className="image-thumb-preview">
                    <img
                      className="image-thumb-preview ec-image-preview"
                      src="/img/vender-upload-thumb-preview.jpg"
                      ref={(ref) => (imagePreviewRef.current[index + 1] = ref)}
                      alt="edit"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
