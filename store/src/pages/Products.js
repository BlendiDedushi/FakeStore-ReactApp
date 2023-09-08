import React, { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductComponent from "../components/ProductComponent";

function Products() {
  const data = useContext(ProductsContext);
  const [searchInput, setSearchInput] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedData, setSortedData] = useState([]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const toggleSortDirection = () => {
    const sorted = [...(sortedData.length > 0 ? sortedData : data)];
    sorted.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortedData(sorted);
  };

  const filteredData = (sortedData.length > 0 ? sortedData : data).filter(
    (product) => product.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center my-3">
        <input
          type="text"
          className="form-control"
          style={{ width: "42.5vh" }}
          placeholder="Search products..."
          onChange={handleSearchInputChange}
        ></input>

        <button className="btn btn-outline-dark" onClick={toggleSortDirection}>
          {sortDirection === "asc" ? (
            <i className="bi bi-sort-alpha-down"></i>
          ) : (
            <i className="bi bi-sort-alpha-up"></i>
          )}
        </button>
      </div>
      <hr></hr>
      <div className="row">
        {data !== null &&
          filteredData.map((product) => (
            <div className="col-3 mb-3" key={product.id}>
              <ProductComponent product={product} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Products;
