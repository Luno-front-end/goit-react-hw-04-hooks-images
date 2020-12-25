import React from "react";
import PropTypes from "prop-types";

import "../styles/styles.css";
import ImageGalleryItem from "./ImageGalleryItem";

export default function ImageGallery({ arrayImages, onSubmit }) {
  return (
    <ul className="ImageGallery">
      {arrayImages.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          onClick={onSubmit}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  arrayImages: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
