import React, { useEffect, useState } from "react";

function Cart() {
  const [carts, setCarts] = useState([]);
  const fetchApiData = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/carts");
      const data = await res.json();
      console.log(data);
      setCarts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiData("https://fakestoreapi.com/carts");
  }, []);

  return (
    <div>
      {carts.map((cart) => {
        return <CartItem key={cart.id} cart={cart} />;
      })}
    </div>
  );
}

const CartItem = ({ cart }) => {
  return (
    <div className="  h-auto w-auto">
      {cart.id} User:{cart.userId} <br />
      {cart.products.map((product) => (
        <div key={product.productId}>
          Product ID: {product.productId}
          <br />
          Quantity: {product.quantity}
        </div>
      ))}
      Date: {cart.date}
      <br />
      <br />
    </div>
  );
};

export default Cart;
