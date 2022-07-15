// import React, { useState } from 'react';
// import Swal from "sweetalert2";
// import axios from "axios";
// import { useNavigate, Outlet } from "react-router-dom";
// import Cookies from 'js-cookie';

// const PrivateRoute = async () => {

//   const navigate = new useNavigate();

//   const [userVerified, setUserVerified] = useState(false);

//   try{

//     if(Cookies.get("jwt")){

//       const res = await axios.post("/verify-user", {token : Cookies.get("jwt")});

//       if(res.status === 200  && res.data.isAuth === true){
//          console.log("User is Genuine !!");
//          setUserVerified(true);
//       }
//       else{
//         setUserVerified(false);
//         Swal.fire("Oops !!", "Please Login first", "info");
//         navigate("/login", { replace : true });

//       }
//     }
//     else{
//       setUserVerified(false);
//        console.log("Token not found");
//        Swal.fire("Oops !!", "Please login first", "info");
//        navigate("/login", { replace : true });
//     }

//   }catch(error){
//     console.log(error.message);
//     Swal.fire("Oops !!", error.message, "info");

//     navigate("/login", {replace : true});
//   }




//   return (
//     <div>
//       { userVerified ? <Outlet /> : navigate("/login", {replace : true})}
//     </div>
//   )
// }

// export default PrivateRoute

import axios from "axios";
import Cookies from "js-cookie";
import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [userVerified, setUserVerified] = useState(false);
  const navigate = new useNavigate();

  useEffect(()=>{
    if (Cookies.get("jwt")) {
      axios
        .post("/api/auth/verify-user", { token: Cookies.get("jwt") })
        .then((res) => {
          if (res.status === 200 && res.data.isAuth) {
            setUserVerified(true);
            console.log("User is verified");
          } else {
            setUserVerified(false);
            // Swal("Oops", res.data.msg, "info");
          navigate("/login", {replace : true})
          }
        });
    } else {
      setUserVerified(false);
      // Swal("Oops", "Login First", "info");
      console.log("User is not Genuine");
      navigate("/login", {replace : true})
    }
  },[])

  return (
    <div>
      {userVerified ? <Outlet /> : navigate("/login", { replace: true })}
    </div>
  );
};

export default PrivateRoute;
