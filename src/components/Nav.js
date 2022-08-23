import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as firestore from "firebase/firestore";
import { selectUser } from "../features/userSlice";
import db from "../FireBase";
import { useSelector } from "react-redux";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [subscription,setSubscription] = useState(null);


  useEffect(() => {

    firestore
    .getDocs(firestore.collection(db, `customers/${user.uid}/subscriptions`))
    .then( querySnapshot => {
      querySnapshot.forEach(async subscription => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start: subscription.data().current_period_start.seconds,
        })
      })
    })


  },[user])



  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
  }, []);

  return (
    <div className={` nav ${show && "nav_black"}`}>
      <img
        onClick={() => subscription && navigate("/")}
        className="nav_logo"
        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        alt="Netflix Logo"
      />

      <img
        onClick={() => navigate("/profile")}
        className="nav_avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix avatar"
      />
    </div>
  );
}

export default Nav;
