import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddProduct from "../AddProduct/AddProduct";
import Header from "../Header/Header";
import ManageProduct from "../ManageProduct/ManageProduct";
import "./Admin.css";

const Admin = () => {
  const [adminStatus, setAdminStatus] = useState({
    manageProduct: false,
    addProduct: false,
    editProduct: false,
  });

  const [products, setProducts] = useState([]);
  const [productsLength, setProductsLength] = useState(products?.length);
  
    useEffect(() => {
        fetch('https://nameless-spire-32810.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data);
        })
    }, [productsLength])

  const handleProduct = (status) => {
    const newAdminStatus = { ...adminStatus };
    if (status === 1) {
      newAdminStatus.manageProduct = true;
      newAdminStatus.addProduct = false;
      newAdminStatus.editProduct = false;
      setAdminStatus(newAdminStatus);
    } else if (status === 2) {
      newAdminStatus.manageProduct = false;
      newAdminStatus.addProduct = true;
      newAdminStatus.editProduct = false;
      setAdminStatus(newAdminStatus);
    } else if (status === 3) {
      newAdminStatus.manageProduct = false;
      newAdminStatus.addProduct = false;
      newAdminStatus.editProduct = true;
      setAdminStatus(newAdminStatus);
    }
  };
  return (
    <>
      <Header></Header>
      <section className="App mt-5">
        <div className="container admin">
          <Button
            onClick={() => handleProduct(1)}
            className="ml-4 mr-4 admin-btn"
          >
            Manage Product
          </Button>
          <Button
            onClick={() => handleProduct(2)}
            className="ml-4 mr-4 admin-btn"
          >
            Add Product
          </Button>
          <Button
            onClick={() => handleProduct(3)}
            className="ml-4 mr-4 admin-btn"
          >
            Edit Product
          </Button>
        </div>
        <div className='mt-5'>
          {adminStatus.manageProduct && 
          <div className='container'>
            <p className='manage-product-title'> 
              <span style={{display: 'inline-block', width: '40%'}}>Product Name</span>
              <span style={{display: 'inline-block', width: '20%'}}>ID</span>
              <span style={{display: 'inline-block', width: '20%'}}>Price</span>
              <span style={{display: 'inline-block', width: '20%'}}>Action</span>
            </p>
            {
              products?.map((product => <ManageProduct product={product} productsLength={productsLength} setProductsLength={setProductsLength}></ManageProduct>))
            }
          </div>
          }
          {adminStatus.addProduct && <AddProduct></AddProduct>}
          {adminStatus.editProduct && <h1>Edit Product</h1>}
        </div>
      </section>
    </>
  );
};

export default Admin;
