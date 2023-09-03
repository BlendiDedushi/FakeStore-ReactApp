import React, { useState, useEffect } from "react";
import { getCategories } from "../helpers/api";
import { Link } from "react-router-dom";

function CategoriesComponent() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  const getImageForCategory = (category) => {
    switch (category) {
      case "electronics":
        return "https://media.istockphoto.com/id/1328836875/vector/realistic-electronic-devices-and-gadgets-in-isometry-vector-isometric-illustration-of.jpg?s=612x612&w=0&k=20&c=4iwItEQ1P3lhjl350QXRl5IrgC8ufDImaoc-7_H5vVA=";
      case "jewelery":
        return "https://media.istockphoto.com/id/1023260538/vector/diamond-gemstones-and-jewelry-related-thin-line-icon-set.jpg?s=612x612&w=0&k=20&c=3SD-zuCGjSKrvKIuytpr7cTMqq1Cme3I7Zhv9zqm8-c=";
      case "men's clothing":
        return "https://media.istockphoto.com/id/1489370479/vector/suits-and-business-items-icon-simple-illustration-set-material.jpg?s=612x612&w=0&k=20&c=3NwV69wwW6LKcVPuDBCajsuEGDGFxp5tHszTgT4uzVI=";
      case "women's clothing":
        return "https://media.istockphoto.com/id/486926856/vector/fashion-design.jpg?s=612x612&w=0&k=20&c=f720coFse3vhnHrfUWhLqKsoWFJXplT9FPBZ5Eg4tPc=";
      default:
        return "https://imgs.search.brave.com/Jp6ngmaC-F_2y5_7UN2IF8HtgALS20IY1-qn-o5x8EA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzI5LzQyLzQy/LzM2MF9GXzQyOTQy/NDI3OV9kb2tFRndu/U29KZU9LcHF2VjF0/dFh1bThwaUVTc0Y1/TC5qcGc";
    }
  };

  return (
    <section className="container">
      <div className="d-flex justify-content-center my-4">
        <h2>Categories</h2>
      </div>
      <div className="d-flex justify-content-between">
        {categories !== null &&
          categories.map((category, index) => (
            <div className="card" style={{ width: "18rem" }} key={index}>
              <img
                src={getImageForCategory(category)}
                className="card-img-top"
                style={{ height: "30vh" }}
                alt="Category"
              />
              <div className="card-body d-flex justify-content-between">
                <h5 className="card-title">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h5>
                <Link to={`/products/category/${category}`} className="btn btn-sm btn-outline-dark">
                  <i className="bi bi-box-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default CategoriesComponent;
