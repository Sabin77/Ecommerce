import React, { useState } from "react";
import bgImage from "../assets/login-bg.png";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

function Login() {
  const [formvalue, setFormvalue] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [usernamePlaceholder, setUsernamePlaceholder] = useState("Username");
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("Password");
  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
    console.log(formvalue);
  };

  const handleLogin = async () => {
    try {
      const { username, password } = formvalue;

      console.log(`Username and password are:`, username, password);
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: "kate_h", password: "kfejk@*_" }),
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
        alert("Login Failed");
      }
    } catch (error) {
      console.log("Login error", error);
    }

    const errors = validate(formvalue);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, [2000]);
    }
  };

  const validate = (values) => {
    const errors = {};
    setFormErrors(errors);
    if (!values.username) {
      errors.username = "UserName must not be empty !";
    }
    if (!values.password) {
      errors.password = " Password must not be empty !";
    }
  };

  const handleUsernameFocus = () => {
    setUsernamePlaceholder("");
  };
  const handlePasswordFocus = () => {
    setPasswordPlaceholder("");
  };

  return (
    <div className="  flex justify-center h-[80vh] text-white ">
      {showAlert && (
        <div className=" fixed top-0 h-auto border-2 px-3 pb-2 rounded-b-lg bg-green-400 z-20">
          <p className="">Logged In Successfully</p>
        </div>
      )}
      <img className=" h-full w-full" src={bgImage} alt="Background" />
      <form className=" absolute w-96 z-10 ">
        <div className=" h-auto w-full py-2 mt-10 shadow-xl border-2 bg-transparent backdrop-blur-sm rounded-lg ">
          <h1 className=" font-bold text-3xl ">LogIn</h1>
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
          <div className=" relative h-14 mt-6">
            <input
              className=" absolute bottom-1 right-12 border-2 h-10 w-3/4 rounded-3xl mt-10 bg-transparent placeholder-white"
              type="password"
              name="password"
              value={formvalue.password}
              onChange={handleInput}
              onFocus={handlePasswordFocus}
              placeholder={passwordPlaceholder}
              style={{ paddingLeft: "20px" }}
            />
            <RiLockPasswordFill className=" absolute top-6 right-16 " />
          </div>
          <div>
            <button
              type="button"
              className=" px-5 py-1 mt-2 border-2 backdrop-blur-lg rounded-xl hover:bg-[#4A3BB5]"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className=" mt-2">
            Don't have an account ?{" "}
            <Link to="/register">
              <p onClick={Register} className=" text-blue-400 hover:underline">
                Register here
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
