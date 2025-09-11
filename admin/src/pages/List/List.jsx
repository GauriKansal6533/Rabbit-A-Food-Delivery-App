
import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data); // 👀 console check
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Food removed successfully");
        fetchList();
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add'>
      <h2>All Foods List</h2>
      <div className="list-table">
        <div className="list-table-header">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-row">
            <img src={`${url}/images/${item.image}`} alt={item.name} className="food-img" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p onClick={() => removeFood(item._id)} className='remove-btn'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
