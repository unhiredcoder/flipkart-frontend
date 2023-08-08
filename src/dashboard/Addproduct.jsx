import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { URL } from './DashBoardApp';

const AddProduct = () => {
  const [id, setId] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [longTitle, setLongTitle] = useState('');
  const [mrp, setMRP] = useState('');
  const [cost, setCost] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [tagline, setTagline] = useState('');
  const [url, setURL] = useState('');
  const [category, setCategory] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      id,
      url,
      detailUrl:url,
      title: {
        shortTitle,
        longTitle,
      },
      price: {
        mrp: parseFloat(mrp),
        cost: parseFloat(cost),
        discount,
      },
      category,
      quantity: parseInt(1),
      description,
      discount,
      tagline,
    };

    const response = await fetch(`${URL}/dashboard/products`);
    const products = await response.json();
    const isProductIdPresent = products.some(product => product.id === id);

    if (isProductIdPresent) {
      setShowAlert(true);
      return;
    }

    if (
      !id ||
      !shortTitle ||
      !longTitle ||
      !mrp ||
      !cost ||
      !discount ||
      !description ||
      !tagline ||
      !url||
      !category
    ) {
      setShowAlert(true);
      return false;
    }

    try {
      const apiResult = await axios.post(`${URL}/dashboard/add-product`, newProduct, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("🚀 ~ file: Addproduct.jsx:44 ~ handleSubmit ~ apiResult:", apiResult);
      navigate('/');
      // Clear the form fields
      setId('');
      setShortTitle('');
      setLongTitle('');
      setMRP('');
      setCost('');
      setCategory('')
      setDiscount('');
      setDescription('');
      setTagline('');
      setURL('');

      toast.success('Item Added Successfully!'); // Success notification
    } catch (error) {
      console.error(error);
      toast.error('Please check the id of product'); // Error notification
    }
  };

  return (
    <>
      <h2 className='jk'>Add Product</h2>
      <div className='add-product-form'>
        <form onSubmit={handleSubmit}>
          <div className='column-one'>

            <label>
              Id:
              <input
                type='text'
                placeholder='Enter Product Id'
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              {showAlert && <span className='err'>Id Alredy exists*</span>}
            </label>
            <label>
              Short Title:
              <input
                type='text'
                placeholder='Enter short title'
                value={shortTitle}
                onChange={(e) => setShortTitle(e.target.value)}
              />
              {showAlert && !shortTitle && <span className='err'>Enter valid short title*</span>}
            </label>
            <label>
              Long Title:
              <input
                type='text'
                placeholder='Enter long title'
                value={longTitle}
                onChange={(e) => setLongTitle(e.target.value)}
              />
              {showAlert && !longTitle && <span className='err'>Enter valid long title*</span>}
            </label>
            <label>
              MRP:
              <input
                type='text'
                placeholder='Enter MRP'
                value={mrp}
                onChange={(e) => setMRP(e.target.value)}
              />
              {showAlert && !mrp && <span className='err'>Enter valid MRP*</span>}
            </label>
            <label>
              Cost:
              <input
                type='text'
                placeholder='Enter cost'
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
              {showAlert && !cost && <span className='err'>Enter valid cost*</span>}
            </label>
            <label>
              Discount:
              <input
                type='text'
                placeholder='Enter discount'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </label>
          {/* </div> */}
          {/* <div className='column-two'> */}
            <label>
              Tagline:
              <input
                type='text'
                placeholder='Enter tagline'
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
              {showAlert && !tagline && <span className='err'>Enter valid tagline*</span>}
            </label>
            <label>
              URL:
              <input
                type='text'
                placeholder='Enter URL'
                value={url}
                onChange={(e) => setURL(e.target.value)}
              />
              {showAlert && !url && <span className='err'>Enter valid URL*</span>}
            </label>
            <label style={{textAlign:'center'}}>
              Category:
              <input
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value.trim())}
              />
              {showAlert && !category && <span className='err'>Enter valid category*</span>}
            </label>
            <label style={{textAlign:'center'}}>
              Description:
              <textarea
              cols={100}
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {showAlert && !description && <span className='err'>Enter valid description*</span>}
            </label>
          </div>

          <button type='submit'>Add</button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
