import React, { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";

const ImageCarousel = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState();
  const carouselItemsRef = useRef([]);

  useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(
        0,
        images.length
      );

      setSelectedImageIndex(0);
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleSelectedImageChange = (newIdx) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx]);
      setSelectedImageIndex(newIdx);
      if (carouselItemsRef.current[newIdx]) {
        carouselItemsRef.current[newIdx].scrollIntoView({
          inline: "center",
          behavior: "smooth",
        });
      }
    }
  };

  const handleRightClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex + 1;
      if (newIdx >= images.length) {
        newIdx = 0;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  const handleLeftClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex - 1;
      if (newIdx < 0) {
        newIdx = images.length - 1;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  return (
    <div className="carousel-container" >
      <div
        className="selected-image"
        style={{
          backgroundImage: `url(${selectedImage && selectedImage.url})`,
        }}
      >
        <div
          className="image-overlay p-4 d-flex align-items-end"
          // style={{ backgroundImage: `url(${image.url})` }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            nostrum velit sint natus laboriosam aperiam distinctio doloribus.
            Soluta repellat eos, et nam possimus, a, provident cumque ducimus
            doloremque minus sapiente!
          </p>
          <Button color="outline-danger">Delete</Button>
        </div>
      </div>
      <div className="carousel">
        <div className="carousel__images">
          {images &&
            images.map((image, idx) => (
              <div
                onClick={() => handleSelectedImageChange(idx)}
                style={{
                  backgroundImage: `url(${image.url})`,
                  cursor: "pointer",
                }}
                key={image.id}
                className={`carousel__image ${
                  selectedImageIndex === idx && "carousel__image-selected"
                }`}
                ref={(el) => (carouselItemsRef.current[idx] = el)}
              />
            ))}
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center mt-4">
        <div style={{ cursor: "pointer" }} onClick={handleLeftClick}>
          <i class="bi bi-arrow-left-circle"></i>
        </div>
        <h6 className="mx-2 my-auto">
          {selectedImageIndex + 1}/{images.length}
        </h6>
        <div style={{ cursor: "pointer" }} onClick={handleRightClick}>
          <i class="bi bi-arrow-right-circle"></i>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
