import React from "react";

function SliderComponent({ images }) {
  return (
    <div>
      <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {images.length > 0 &&
            images.map((slide, index) =>
              slide.id === 1 ? (
                <button
                  type="button"
                  key={slide.id}
                  data-bs-target="#slider"
                  data-bs-slide-to={index}
                  className="active"
                  aria-current="true"
                  aria-label={`Slide ${slide.id}`}
                ></button>
              ) : (
                <button
                  type="button"
                  key={slide.id}
                  data-bs-target="#slider"
                  data-bs-slide-to={index}
                  aria-label={`Slide ${slide.id}`}
                ></button>
              )
            )}
        </div>
        <div className="carousel-inner">
          {images.length > 0 &&
            images.map((slide) => (
              <div
                className={`carousel-item ${slide.id === 1 ? "active" : ""}`}
                key={slide.id}
                data-bs-interval="5000"
              >
                <img
                  src={slide.url}
                  className="d-block w-100"
                  style={{ height: "45vh" }}
                  alt={slide.alt}
                />
              </div>
            ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default SliderComponent;
