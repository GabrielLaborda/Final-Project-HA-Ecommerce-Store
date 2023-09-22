import "./EditAccount.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function EditPassword(props) {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password === confirmPassword) {
        await axios({
          method: "PATCH",
          url: `${baseURL}/users/${params.id}`,
          params: { transaction: "changePassword" },
          data: { password },
        });
        navigate(`/account/${params.id}`);
      } else {
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col d-none d-lg-flex text-start justify-content-center align-items-center imgEdit">
          <div className="m-5">
            <div className="m-0">
              <h2 className="textTitle">Reset</h2>
              <h2 className="textTitle">Password</h2>
            </div>
          </div>
        </div>

        {/* Responsive */}
        <div className="col d-flex d-lg-none text-center justify-content-center align-items-center imgEdit">
          <div className="mt-2">
            <h2 className="textTitle">Reset</h2>
            <h2 className="textTitle">Password</h2>
          </div>
        </div>

        {/* Termina Responsive */}
        <div className="container-fluid col-sm-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-start">
            <div className="d-flex back" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left ps-3"></i>
              <p className="ms-2">Back</p>
            </div>
            <div className="px-3 inputWidth mt-2">
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label hidden htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control my-2 rounded-0"
                      id="password"
                      name="password"
                      required
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label hidden htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control my-2 rounded-0"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <br />
                  <div className="d-grid p-0">
                    <button
                      type="submit"
                      className="btn btn-dark rounded-0 btn-lg p-1"
                    >
                      Change
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditPassword;
