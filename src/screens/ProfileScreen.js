import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import { selectUser } from "../features/userSlice";
import { auth } from "../FireBase";
import db from "../FireBase";
import './ProfileScreen.css';
import PlansScreen from "./PlansScreen";
import * as firestore from "firebase/firestore";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const [subscription,setSubscription] = useState();

  useEffect(() => {

    firestore
    .getDocs(firestore.collection(db, `customers/${user.uid}/subscriptions`))
    .then( querySnapshot => {
      querySnapshot.forEach(async subscription => {
        setSubscription({
          role: subscription.data().role,
        })
      })
    })


  },[user])

  console.log(subscription)

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profileScreen_details">
            <h2>{user.email}</h2>
            <div className="profileScreen_plans">
              { subscription && <h3>Plans (Current Plan: {subscription?.role})</h3>}
              
              <PlansScreen />
              <button
                onClick={() => auth.signOut()}
                className="profileScreen_signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
