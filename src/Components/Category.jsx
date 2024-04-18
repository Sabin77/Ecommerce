import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Category(props) {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(props.categoryType);

  let API = `https://fakestoreapi.com/products/${props.category}/${categoryName}`;

  const fetchApiData = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiData(API);
  }, [props.categoryType]);

  return (
    <>
      <div className=" flex flex-wrap relative justify-center">
        {products.map((item, index) => (
          <div
            key={index}
            className="item group border-2 rounded-lg h-auto w-52 shadow-lg border-gray-200 mx-4 my-4"
          >
            <Link to={`/${props.category}/${props.categoryType}/${item.id}`}>
              <img
                src={
                  item.image
                    ? item.image
                    : "https://media.timeout.com/images/100909731/image.jpg"
                }
                className=" h-44 w-36 ml-7 rounded-t-lg bg-slate-400 cursor-pointer"
                alt={item.title}
              />
            </Link>
            <h5 className=" text-lg">{item.title ? item.title : "No Title"}</h5>
            <h4 className=" font-bold"> ${item.price ? item.price : "N/A"}</h4>
            <p>Rating: {item.rating.rate}/5</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Category;
