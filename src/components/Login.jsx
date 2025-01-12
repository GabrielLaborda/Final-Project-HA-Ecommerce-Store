import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./RegisterAndLogin.css";
import { login } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('123456');
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifyError = (message) =>
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `${baseURL}/login/user`,
        method: "POST",
        data: { password, email },
      });
      if (response.data.token) {
        dispatch(login(response.data));
        return cart.length > 0 ? navigate("/cart") : navigate("/");
      } else if (response.data.error) {
        return navigate(`/login`);
      }
    } catch (err) {
      console.log(err.response.data.msg);
      return notifyError(err.response.data.msg);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col d-none d-sm-none d-lg-flex text-start justify-content-center align-items-center imgLogin">
          <div className="m-5">
            <div className="m-0">
              <h2 className="textTitle">Costumer</h2>
              <h2 className="textTitle">Login</h2>
            </div>
          </div>
        </div>

        {/* Responsive */}

        <div className="col d-flex d-lg-none text-center justify-content-center align-items-center imgLogin  ">
          <div className="">
            <h2 className="textTitle">Costumer</h2>
            <h2 className="textTitle">Login</h2>
          </div>
        </div>

        {/* Termina Responsive */}

        <div className="col-sm-12 col-lg-6 text-start d-flex justify-content-center container-fluid align-items-center">
          <div className="inputWidth w-50">
            <form action="/login" method="post" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="form-label"></label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control rounded-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" className="form-label"></label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control rounded-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <div className="d-grid gap-1">
                <button className="btn btn-dark rounded-0 btn-lg" type="submit">
                  Login
                </button>
              </div>
            </form>
            <p className="text-center mt-4 little-text">
              Don't have an account?<Link to={'/register'}> Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
