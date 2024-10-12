import css from "./Gallery.module.css";

const Gallery = ({ images }) => {
  return (
    <div className={css.galleryContainer}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.thumb}
          alt={`Camper Image ${index + 1}`}
          className={css.galleryImage}
        />
      ))}
    </div>
  );
};

export default Gallery;
