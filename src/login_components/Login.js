import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../config";
import UserContext from "../context/UserContext";
import { useContext } from "react";

export function Login() {
  const navigate = useNavigate();
  const notes = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      password: Yup.string().required("Required")
    }),

    onSubmit: async (values) => {
      try {
        const users = await axios.post(`${config.api}/user/login`, values);

        if (users.data.token) {
          
          notes.setNotes(users.data.content == '#' ? ["# Start your notes here"] : users.data.content);
          
          localStorage.setItem("token", users.data.token);
          localStorage.setItem("email", users.data.email);
          localStorage.setItem("name", users.data.name);
          toast.success(users.data.message);
          console.log(notes)

          navigate("/EazyNotes");
        } else {
          toast.error("Invalid credentials");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  });

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740&t=st=1700407012~exp=1700407612~hmac=e8c685e4865a3b0feba38c273fa6f96d512c8e63b4a2f54e85139c905bff9488/url?sa=i&url=https%3A%2F%2Fvlr.eng.br%2Flogin%2Flogin-images-free-download-on-freepik-ww-1218603&psig=AOvVaw1DX-H_BZwles77MhO4ZGfF&ust=1700493229707000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNj4-Imt0IIDFQAAAAAdAAAAABAR"
              className="img-fluid login-img"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h3 className="d-flex justify-content-center py-5">
             Eazy Notes
            </h3>
            <form onSubmit={formik.handleSubmit}>
              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name={"email"}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email ? (
                  <span style={{ color: "red" }}>{formik.errors.email}</span>
                ) : null}
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name={"password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password ? (
                  <span style={{ color: "red" }}>{formik.errors.password}</span>
                ) : null}
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <lable>
                  {" "}
                  Already a member? <Link to="/register">Sign Up</Link>
                </lable>

                <Link to="/forgotpassword">Forgot password?</Link>
              </div>
              {/* <!-- Submit button --> */}
              <button
                type="submit"
                className="col-lg-12 btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
