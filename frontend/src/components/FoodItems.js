import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CartContext } from '../CartContext';

const FoodItems = () => {
  const [foodItems, setFoodItems] = useState([]);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('/api/food');
        const items = response.data.map(item => ({
          ...item,
          images: item.images || [], // Ensure images is an array
          quantity: 0 // Initialize quantity for each item
        }));
        setFoodItems(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFoodItems();
  }, []);

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Food Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <Carousel showThumbs={false} className="w-full mb-4">
                {item.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={item.name} className="w-full h-48 object-cover" />
                  </div>
                ))}
              </Carousel>
              <div className="flex-1 text-center">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <div className="flex items-center mt-4">
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  -
                </button>
                <span className="mx-2">{cart.find(cartItem => cartItem.id === item.id)?.quantity || 0}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md">No food items available</div>
        )}
      </div>
      <button
        onClick={goToCart}
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Go to Cart
      </button>
    </div>
  );
};

export default FoodItems;