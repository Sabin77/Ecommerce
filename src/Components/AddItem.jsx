import React, { useState, useEffect } from "react";
function AddItem({ closeModal }) {
  const [formvalue, setFormvalue] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  let API = "https://fakestoreapi.com/products";

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
    console.log(formvalue);
  };

  const postData = async (value) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        body: JSON.stringify({
          title: value,
          price: value,
          description: value,
          image: "https://i.pravatar.cc",
          category: value,
        }),
      });

      const data = res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // closeModal();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formvalue);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    postData();
  };

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "*Title is required";
    }
    if (!values.description) {
      errors.description = "*Description is required.";
    }
    if (!values.price) {
      errors.price = "*Price is required.";
    } else if (isNaN(values.price)) {
      errors.price = " *Price should be a number.";
    }
    if (!values.category) {
      errors.category = " *Category is required.";
    }

    return errors;
  };

  return (
    <>
      <div className="modal-wrapper fixed inset-0  bg-blur"></div>
      {showAlert && (
        <div className=" fixed top-0 bg-slate-50 p-4 rounded-b-xl border-2 ">
          Data Submitted Successfully
        </div>
      )}

      <form
        className=" flex fixed flex-col space-y-4 p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg border-2  border-black bg-slate-200 h-auto w-80 rounded-xl"
        onSubmit={handleFormSubmit}
      >
        <div className="title">
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={formvalue.title}
            onChange={handleInput}
            className=" border-2 rounded-lg"
          />
        </div>
        <p className=" text-rose-600">{formErrors.title}</p>

        <div className="Price">
          <label>Price: </label>
          <input
            type="text"
            name="price"
            value={formvalue.price}
            onChange={handleInput}
            className=" border-2 rounded-lg"
          />
        </div>
        <p className=" text-rose-600">{formErrors.price}</p>

        <div className="Description">
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={formvalue.description}
            onChange={handleInput}
            className=" border-2 rounded-lg"
          />
        </div>
        <p className=" text-rose-600">{formErrors.description}</p>

        <div className="Category">
          <label>Category: </label>
          <input
            type="text"
            name="category"
            value={formvalue.category}
            onChange={handleInput}
            className=" border-2 rounded-lg"
          />
        </div>
        <p className=" text-rose-600">{formErrors.category}</p>

        <button
          onClick={postData}
          className=" border-2 border-black rounded-lg bg-slate-500 mx-28 my-5"
        >
          Submit
        </button>

        <button
          onClick={closeModal}
          className=" border-2 border-black rounded-lg bg-slate-500 mx-28"
        >
          Close
        </button>
      </form>
    </>
  );
}

export default AddItem;
