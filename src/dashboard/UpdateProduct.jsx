import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { URL } from './DashBoardApp';
import { updateProductInCart } from '../redux/actions/cartActions';
import { useDispatch } from 'react-redux';


const UpdateProduct = () => {
  const dispatch = useDispatch()


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
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const res = await axios.get(`${URL}/dashboard/product/${params.id}`);
      const data = res.data;
      console.log("🚀 ~ file: UpdateProduct.jsx:31 ~ getProductDetails ~ data:", data);
      setId(data.id);
      setShortTitle(data.title.shortTitle);
      setLongTitle(data.title.longTitle);
      setMRP(data.price.mrp);
      setCategory(data.category)
      setCost(data.price.cost);
      setDiscount(data.price.discount);
      setDescription(data.description);
      setTagline(data.tagline);
      setURL(data.url);
      // setDetailURL(data.detailUrl);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      id,
      url,
      detailUrl: url,
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

    console.log("🚀 ~ file: UpdateProduct.jsx:68 ~ handleUpdate ~ updatedProduct:", updatedProduct)
    // const user = JSON.parse(localStorage.getItem('userData'));
    // const userId = user ? user._id : null;
    dispatch(updateProductInCart(updatedProduct));
    // dispatch(addItemsToCart(updatedProduct.id, userId));


    if (
      !id ||
      !shortTitle ||
      !longTitle ||
      !mrp ||
      !cost ||
      !discount ||
      !description ||
      !tagline ||
      !url ||
      !category
    ) {
      setShowAlert(true);
      return;
    }

    try {
      const apiResult = await axios.put(`${URL}/dashboard/product/${params.id}`, updatedProduct, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("Product updated successfully:", apiResult);
      navigate('/dashboard');
      // Clear the form fields
      setId('');
      setShortTitle('');
      setLongTitle('');
      setMRP('');
      setCost('');
      setDiscount('');
      setCategory('')
      setDescription('');
      setTagline('');
      setURL('');
      toast.success('Product Updated Successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update product');
    }
  };

  return (
    <>
      <h2 className='jk'>Update Product</h2>
      <div className='add-product-form'>
        <form onSubmit={handleUpdate}>
          <div className='column-one'>

            <label>
              Id:
              <input
                type='text'
                placeholder='Enter Product Id'
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              {showAlert && !id && <span className='err'>Id exists already*</span>}
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
            <label>
              Category:
              <input
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value.trim())}
              />
              {showAlert && !category && <span className='err'>Enter valid category*</span>}
            </label>
            <label>
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
          <button type='submit'>Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
