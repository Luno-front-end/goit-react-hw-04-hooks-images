import React from "react";
import PropTypes from "prop-types";

import "../styles/styles.css";

export default function ImageGalleryItem({
  webformatURL,
  tags,
  largeImageURL,
  onClick,
}) {
  return (
    <li
      onClick={() => onClick(largeImageURL, tags)}
      className="ImageGalleryItem"
    >
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,

  onClick: PropTypes.func.isRequired,
};
