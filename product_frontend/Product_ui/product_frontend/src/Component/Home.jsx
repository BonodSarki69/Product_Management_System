import React, { useEffect, useState } from "react";
import ProductService from "../service/ProductService";
import { Link } from "react-router-dom";

const Home = () => {

    const [productList, setProductList] = useState([]);

    const [msg, setMessage] = useState("");

    useEffect(()=>{
       init(); 
    },[]);

    const init=() => {
        ProductService.getAllProduct().then((res)=>{
            setProductList(res.data);
        }).catch((error)=>{
            console.log(error);
        });
    };

    const deleteProduct = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
          ProductService.deleteProduct(id)
            .then((res) => {
              setMessage("Product Deleted Successfully");
              init(); // Refresh the product list after deletion
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };

  return (
    <>
      <div className="container mt-3 ">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header fs-3 text-center">
                All Product List
               <div>{msg && <p className="fs-4 text-center text-success">{msg}</p>}</div>
              </div>
              <div className="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Serial No</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {productList.map((p, num) => {
                      return (
                        <tr key={p.id}> {/* Ensure to add a unique key */}
                          <td>{num + 1}</td>
                          <td>{p.productName}</td>
                          <td>{p.description}</td>
                          <td>{p.price}</td>
                          <td>{p.status}</td>
                          <td>
                            <Link to={'editProduct/'+p.id} className="btn btn-sm btn-primary">Edit</Link>
                            <button onClick={()=> deleteProduct(p.id)} className="btn btn-sm btn-danger ms-4">Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
