import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { config } from "../config";
import UserContext from "../context/UserContext";
import { UserProvider } from "../context/UserContext";


function Navbar() {
  const navigate = useNavigate();
  const UserContextData = useContext(UserContext);

  const name = localStorage.getItem("name");
  const doLogout = () => {
    if (window.confirm("Do you really want to Logout?")) {
      try {
        localStorage.clear();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const data = UserContextData.notes;
  const email = localStorage.getItem("email");
  const SaveData = async (data, email) => {
    try {
      const users = await axios.post(`${config.api}/content/save/${email}`, {
        data: data
      });
      console.log(data);
      toast.success(users.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  // const createNew = (dat,email) => {
  //   // console.log(UserContextData.notes);

  //   const data = [...UserContextData.notes];
  //   // console.log(data);
  //   data.push("new");
  //   // console.log(data)
  //   UserContextData.setNotes(data);
  //   // console.log(UserContextData.notes);
   
  // }



  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top ml-2 mr-2"
      style={{ backgroundColor: "#e3f2fd !important" }}
    >
      <div className="col-lg-8 ml-2 d-flex justify-content-start">
        <h3>{`Welcome | ${name}`} </h3>
      </div>

      <div className="col-lg-4 ">
        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
          
          <button
          
              className="btn btn-outline-primary m-2"
              
              // onClick={() => createNew(data, email)}
            >
              Create New
            </button>

            <button
              className="btn btn-outline-success m-2"
              onClick={() => SaveData(data, email)}
            >
              Save
            </button>
            
            <button
              className="btn btn-outline-danger m-2"
              onClick={() => {
                doLogout();
              }}
            >
              {" "}
              Logout{" "}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
