import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';   //use this both import in your react project( where you want to show alert)to display beautiful alerts 
import { NavLink } from "react-router-dom"
import { URL } from './DashBoardApp';
import Swal from 'sweetalert2';

function ProductList() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getproduct()
  }, []);

 const getproduct = async () => {
    try {
      const response = await fetch(`${URL}/dashboard/products`);
      const data = await response.json();
      console.log("🚀 ~ file: ProductList.jsx:19 ~ getproduct ~ data:", data)
      
      setProduct(data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false)

    }
  };




  const deleteProduct = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    });

    if (!confirmed.isConfirmed) {
      return; // If the user cancels the deletion, return without further action.
    }

    try {
      let response = await fetch(`${URL}/dashboard/product/${id}`, {
        method: 'DELETE'
      });
      response = await response.json();

      if (response) {
        setProduct(prevProducts => prevProducts.filter(product => product.id !== id));
        toast.success('Item deleted successfully!');
      } else {
        toast.error('Failed to delete item.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('An error occurred while deleting the item.');
    }
  }








  const searchHandle = async (e) => {
    const key = e.target.value;
    if (key) {
      let response = await fetch(`${URL}/dashboard/search/${key}`)
      response = await response.json();
      console.log("🚀 ~ file: ProductList.jsx:47 ~ searchHandle ~ response:", response)
      if (response) {
        setProduct(response)
      }
    } else {
      getproduct();
    }
  }
  return (
    <>
      <h1 className='jk'>Product List</h1>
      <div className="f">
        <input
          type="search"
          onChange={searchHandle}
          className='se'
          placeholder='Search Product Here...'
          id="se"
        />
      </div>

      <div className="table-container">
        <table className='table'>
          <thead>
            <tr>
              <th style={{ border: '1px solid black' }}>productId</th>
              <th style={{ border: '1px solid black' }}>IMAGE</th>
              <th style={{ border: '1px solid black' }}>NAME</th>
              <th style={{ border: '1px solid black' }}>PRICE</th>
              <th style={{ border: '1px solid black' }}>DELETE</th>
              <th style={{ border: '1px solid black' }}>UPDATE</th>
            </tr>
          </thead>
          <tbody>
            {loading ? ( // Show loading image when loading is true
              <tr>
                <td colSpan={6} style={{ textAlign: 'center',background:'white' }}>
                  <img src="/loooding.svg" width={50} alt="Loading" />
                </td>
              </tr>
            ) : product.length > 0 ? (
                product.map((item, i) => (
                  <tr key={i}>
                    <td data="S.no" style={{ border: '1px solid black' }}>{item.id}</td>
                    <td data="Image" style={{ border: '1px solid black' }}>
                      <img src={item.url} width={40} style={{ mixBlendMode: 'multiply' }} alt={item.url} />
                    </td>
                    <td data="Name" style={{ border: '1px solid black' }}>{item.title.shortTitle}</td>
                    <td data="Price" style={{ border: '1px solid black' }}>₹ {item.price.cost.toLocaleString()}/-</td>
                    <td data="Delete" style={{ border: '1px solid black' }}>
                      <button className='del' onClick={() => deleteProduct(item.id)}>Delete</button>
                    </td>
                    <td data="Update" style={{ border: '1px solid black' }}>
                      <NavLink to={"/dashboard/update/" + item.id}>
                        <button className='up'>Update</button>
                      </NavLink>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{textAlign:'center'}} colSpan={6}>No result found :(</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductList;
