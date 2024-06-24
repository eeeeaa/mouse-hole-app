import styles from "../../styles/common/imagecarousel.module.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

ImageCarousel.propTypes = {
  images: PropTypes.array,
};

export default function ImageCarousel({ images }) {
  const [currentImage, setCurrentImage] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const nextSlide = () => {
    const next = (imageIndex + 1) % images.length;
    setCurrentImage(images[next]);
    setImageIndex(next);
  };
  const previousSlide = () => {
    const prev =
      (((imageIndex - 1) % images.length) + images.length) % images.length;
    setCurrentImage(images[prev]);
    setImageIndex(prev);
  };

  const handleImageLoaded = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[0]);
    }
  }, [images]);

  if (images.length <= 0) return <></>;

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={currentImage}
        alt=""
        onLoad={handleImageLoaded}
      />

      {images.length > 1 && isImageLoaded ? (
        <div className={styles.action}>
          <button onClick={previousSlide}>Previous</button>
          <div>
            {imageIndex + 1} / {images.length}
          </div>
          <button onClick={nextSlide}>Next</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
