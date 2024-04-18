import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import StoreItems from "./StoreItems";
import AddItem from "./AddItem";
import { redirect, useNavigate } from "react-router-dom";

function Body() {
  const [limit, setLimit] = useState(6);

  let API = `https://fakestoreapi.com/products?limit=${limit}`;

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const navigate = useNavigate();
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
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    fetchApiData(API);
  }, [limit]);

  const slides = [
    {
      url: "https://clickamericana.com/wp-content/uploads/1965-dress-styles.jpg",
    },
    {
      url: "https://gjepc.org/solitaire/wp-content/uploads/2023/11/polki-1.jpg",
    },
    {
      url: "https://media.istockphoto.com/id/1293366109/photo/this-one-match-perfect-with-me.jpg?s=612x612&w=0&k=20&c=wJ6yYbRrDfdmoViuQkX39s2z_0lCiNQYgEtLU--0EbY=",
    },
    {
      url: "https://www.dpreview.com/files/p/articles/8615681274/iPhone15-plus-pro4.jpeg",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(3);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const dotClick = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleMoreButton = () => {
    setLimit(limit + 3);
  };

  const isAllItemsLoaded = limit === products.length;

  return (
    <>
      <div className="max-w-[1400px] h-[480px] w-full m-auto py-16 px-4 relative group ">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className=" w-full h-full rounded-2xl bg-cover duration-500"
        ></div>
        <div className=" hidden group-hover:block  absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ">
          <BsChevronCompactLeft onClick={prevSlide} />
        </div>
        <div className=" hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ">
          <BsChevronCompactRight onClick={nextSlide} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => dotClick(slideIndex)}
              className=" text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>

      <div className=" flex flex-wrap relative justify-center">
        {products &&
          products.map((element) => {
            return (
              <StoreItems
                key={element.id}
                id={element.id}
                image={element.image}
                title={element.title ? element.title.slice(0, 36) : ""}
                description={
                  element.description ? element.description.slice(0, 88) : ""
                }
                rating={element.rating.rate}
                price={element.price}
                url={element.url}
              />
            );
          })}
      </div>
      <div>
        <button
          onClick={handleMoreButton}
          className=" bg-green-300 rounded-md px-2 mx-4 h-10 disabled:bg-gray-200 disabled:text-gray-300"
          disabled={!isAllItemsLoaded}
        >
          More Items
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="  right-10 border-2 bg-cyan-600 rounded-md h-10"
        >
          Add Item
        </button>
        {showModal && <AddItem closeModal={closeModal} />}
      </div>
    </>
  );
}

export default Body;
