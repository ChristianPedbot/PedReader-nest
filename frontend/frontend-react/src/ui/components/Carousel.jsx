import React from "react";
import '../styles/components/carousel.css';

const Carousel = () => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://res.cloudinary.com/dechfylvy/image/upload/v1714146548/SPECIAL_1_yb9zti.png" className="d-block w-100" alt="First slide" />
        </div>
        <div className="carousel-item">
          <img src="https://res.cloudinary.com/dechfylvy/image/upload/v1714147447/kids_bvfkvq.png" className="d-block w-100" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img src="https://res.cloudinary.com/dechfylvy/image/upload/v1714148017/EDUC_q2u1ad.png" className="d-block w-100" alt="Third slide" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
