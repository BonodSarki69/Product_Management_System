
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../service/ProductService";

const EditProduct = () => {
  const [product, setProduct] = useState({
    id: "",
    productName: "",
    description: "",
    price: "",
    status: "",
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const [msg, setMessage] = useState("");

  useEffect(() => {
    ProductService.getProductById(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const ProductUpdate = (e) => {
    e.preventDefault();

    ProductService.editProduct(product)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Some things error");
      });
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header fs-3 text-center">Add Product</div>
              {msg && <p className="fs-4 text-center text-succes">{msg}</p>}
              <div className="card-body">
                <form onSubmit={(e) => ProductUpdate(e)}>
                  <div className="mb-3">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.productName}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.description}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Price</label>
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.price}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Status</label>
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.status}
                    />
                  </div>
                  <button className="btn btn-primary col-md-12">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;