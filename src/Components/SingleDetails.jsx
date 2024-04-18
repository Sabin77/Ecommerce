import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleDetails(props) {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        body: JSON.stringify({
          userId: 5,
          date: 2020 / 2 / 3,
          products: [
            { productId: 5, quantity: 1 },
            { productId: 1, quantity: 5 },
          ],
        }),
      });
      const cartData = await res.json();
      console.log(cartData);
    } catch (error) {
      console.log(error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <img className="h-1/2 w-1/2" src={item.image} alt="Item" />
      <div>
        <h1 className="text-pretty text-3xl">{item.title}</h1>
        <p className="font-bold">${item.price}</p>
        <p>Description: {item.description}</p>
        <p>Rating: {item.rating.rate}/5</p>
        <button
          className=" bg-green-400 border-2 rounded-md px-10"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
        <br />
        <button className=" bg-red-400 border-2 rounded-md px-4">
          Add to wishlist
        </button>
      </div>
    </div>
  );
}

export default SingleDetails;
