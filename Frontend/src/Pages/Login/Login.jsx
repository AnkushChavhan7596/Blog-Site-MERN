import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import SendingLoader from "../../Components/SendingLoader/SendingLoader";

const Login = () => {
  const navigate = new useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await axios.post("/api/auth/post-login", {
        email: email,
        password: password,
      });

      if (res.status === 200 && res.data.token) {
        setSending(false);
        Swal.fire("Greate", res.data.msg, "success");

        Cookies.set("jwt", res.data.token, { expires: 7 });

        navigate("/", { replace: true });
      } else {
        setSending(false);
        Swal.fire("Oops", res.data.msg, "info");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error.message);
      Swal.fire("Oops !!", error.message, "info");
      navigate("/login");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="login_heading_wrapper">
          <h2 className="login_heading">Login</h2>
        </div>

        <div className="input_filed">
          <label htmlFor="#">Email : </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="input_filed">
          <label htmlFor="#">Password : </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            required
          />
        </div>

        <div className="login_button_container">
          <button type="submit">Login</button>
          {sending ? <SendingLoader /> : ""}
        </div>

        <div className="bottom_form">
          <p>
            Don't have an account ? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
