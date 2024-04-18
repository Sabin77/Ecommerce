import React, { useEffect, useState } from "react";
import SingleDetails from "./SingleDetails";
import { Link } from "react-router-dom";

function StoreItems(props) {
  const { title, description, url, id, image, rating, price } = props;
  const handleDelete = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
  };

  const handleEdit = async () => {
    fetch("https://fakestoreapi.com/products/7", {
      method: "PATCH",
      body: JSON.stringify({
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <div className="item group border-2 rounded-lg h-72 w-52 shadow-lg border-gray-200 mx-4 my-4 mb-7 bg-white">
      <Link key={id} to={`/products/${id}`}>
        <img
          src={
            image
              ? image
              : "https://media.timeout.com/images/100909731/image.jpg"
          }
          className=" h-44 w-36 ml-7 rounded-t-lg cursor-pointer py-2 border-b-2"
        />
      </Link>
      <h5 className=" text-lg">{title ? title : "No Title"}</h5>
      <h4 className=" font-bold"> ${price ? price : "N/A"}</h4>

      <div className=" text-xs ">
        {[1, 2, 3, 4, 5].map((star) => {
          return (
            <span
              key={star}
              className="start"
              style={{
                cursor: "pointer",
                color: rating >= star ? "gold" : "gray",
                fontSize: `35px`,
              }}
            >
              {" "}
              ★{" "}
            </span>
          );
        })}
      </div>
      <div className="  hidden group-hover:block">
        <button
          onClick={handleDelete}
          className="bg-red-400   px-4 py-2 rounded-sm"
        >
          Delete
        </button>
        <button className=" bg-blue-500 px-4 py-2" onClick={handleEdit}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default StoreItems;
