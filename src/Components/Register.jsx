import React, { useEffect, useState } from "react";
import bgImage from "../assets/login-bg.png";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Navigate } from "react-router-dom";

function Register() {
  const [formvalue, setFormvalue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [usernamePlaceholder, setUsernamePlaceholder] = useState("Username");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
    console.log(formvalue);
  };

  const handleRegister = async () => {
    try {
      const { username, email, password, confirmPassword } = formvalue;

      console.log(`Username and password are:`, username, password);
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "kate_h",
          email: "kate@gmail.com",
          password: "kfejk@*_",
          confirmPassword: "kfejk@*_",
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        const token = data.token;
        if (token) {
          localStorage.setItem("token", token);
          return navigate("/");
        }
        console.log(token);
      } else {
        const data = await res.json();
        console.log(data);
        alert("Register Failed");
      }
    } catch (error) {
      console.log("Register error", error);
    }
    const errors = validate(formvalue);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, [3000]);
    }
  };
  useEffect(() => {}, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 4) {
      errors.username = " Username should be more than 4 characters !";
    }
    if (!values.email) {
      errors.email = "Email should not be empty !";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid emal format!";
    }

    if (!values.password) {
      errors.password = "Password must not be empty !";
    } else if (values.password.length < 4) {
      errors.password = "Password should be more than 4 characters.";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
        values.password
      )
    ) {
      errors.password =
        "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character!";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm password !";
    } else if (!(values.password == values.confirmPassword)) {
      errors.confirmPassword = "Please confirm same password";
    }
    return errors;
  };
  const handleUsernameFocus = () => {
    setUsernamePlaceholder("");
  };

  const handleBackClick = () => {
    navigate("/login");
  };

  return (
    <div className="  flex justify-center h-[80vh] text-white ">
      {showAlert && (
        <div className=" fixed top-0 h-auto border-2 px-3 pb-2 rounded-b-lg bg-green-400 z-20">
          <p className="">Registered Successfully</p>
        </div>
      )}
      <img className=" h-full w-full" src={bgImage} alt="Background" />
      <form className=" absolute w-96 z-10 ">
        <div className=" h-auto w-full py-2 mt-10 shadow-xl border-2 bg-transparent backdrop-blur-sm rounded-lg ">
          <IoMdArrowRoundBack
            onClick={handleBackClick}
            className=" text-2xl m-2 cursor-pointer"
          />
          <h1 className=" font-bold text-3xl -my-3 ">Register</h1>
          <div className=" relative h-14 mt-8">
            <input
              className=" absolute bottom-1 right-12 border-2 h-10 w-3/4 rounded-3xl mt-10 bg-transparent placeholder-white "
              type="text"
              name="username"
              value={formvalue.username}
              onChange={handleInput}
              placeholder={usernamePlaceholder}
              onFocus={handleUsernameFocus}
              style={{ paddingLeft: "20px" }}
            />
            <FaUser className=" absolute top-6 right-16 " />
          </div>
          <p className=" text-red-500">{formErrors.username}</p>
          <div className=" relative h-14 mt-6">
            <input
              className=" absolute bottom-1 right-12 border-2 h-10 w-3/4 rounded-3xl mt-10 bg-transparent placeholder-white"
              type="test"
              name="email"
              value={formvalue.email}
              onChange={handleInput}
              placeholder="Your email"
              style={{ paddingLeft: "20px" }}
            />
            <MdEmail className=" absolute top-6 right-16 " />
          </div>
          <p className=" text-red-500">{formErrors.email}</p>
          <div className=" relative h-14 mt-6">
            <input
              className=" absolute bottom-1 right-12 border-2 h-10 w-3/4 rounded-3xl mt-10 bg-transparent placeholder-white"
              type="password"
              name="password"
              value={formvalue.password}
              onChange={handleInput}
              placeholder="Password"
              style={{ paddingLeft: "20px" }}
            />
            <RiLockPasswordFill className=" absolute top-6 right-16 " />
          </div>
          <p className=" text-red-500">{formErrors.password}</p>
          <div className=" relative h-14 mt-6">
            <input
              className=" absolute bottom-1 right-12 border-2 h-10 w-3/4 rounded-3xl mt-10 bg-transparent placeholder-white"
              type="password"
              name="confirmPassword"
              value={formvalue.confirmPassword}
              onChange={handleInput}
              placeholder="Confirm Password"
              style={{ paddingLeft: "20px" }}
            />
            <RiLockPasswordFill className=" absolute top-6 right-16 " />
          </div>
          <p className=" text-red-500">{formErrors.confirmPassword}</p>
          <div>
            <button
              type="button"
              className=" px-5 py-1 my-6 border-2 backdrop-blur-lg rounded-xl hover:bg-blue-700"
              onClick={handleRegister}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
