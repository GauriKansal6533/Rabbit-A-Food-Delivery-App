import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = currState === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(url + apiUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        // Safely set userId only if available
        if (response.data.user && response.data.user._id) {
          localStorage.setItem("userId", response.data.user._id);
        }

        setShowLogin(false);

        Swal.fire({
          icon: 'success',
          title: currState === "Login" ? "Logged in Successfully!" : "Account Created Successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        setData({ name: "", email: "", password: "" });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message || "Something went wrong!",
        });
      }

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Please try again later!',
      });
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} alt="Close" onClick={() => setShowLogin(false)} />
        </div>

        <div className="login-popup-input">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit">
          {currState === "Login" ? "Login" : "Create Account"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        <p>
          {currState === "Login" ? "Create a new account?" : "Already have an account?"}{" "}
          <span onClick={() => setCurrState(currState === "Login" ? "Sign Up" : "Login")}>
            Click Here
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
