import React, { useEffect, useState } from "react";
import "./PlansScreen.css";
import db from "../FireBase";
import * as firestore from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { collection ,getDocs,addDoc,onSnapshot} from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import pageLoader from "../components/pageLoader";

function PlansScreen() {
  const [products, setProducts] = useState([]);
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


    firestore
      .getDocs(firestore.collection(db, "products"))
      .then((querySnapshot) => {
        const products = {};

        querySnapshot.forEach(async (productDoc) => {
          // doc.data() is never undefined for query doc snapshots
          products[productDoc.id] = productDoc.data();

          // const priceSnap = productDoc.ref.collection("prices").get();
          const priceSnap = await getDocs(collection(productDoc.ref, "prices"));

          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  console.log(products);
  console.log(subscription);

  const loadCheckout = async (productData) => {

    alert("please wait a movement and press ok");

    
    console.log(user.uid)
    const priceId = productData.prices.priceId;
    console.log(priceId);
 
    const docRef = await addDoc( collection(db, `customers/${user.uid}/checkout_sessions`),
    {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    onSnapshot(docRef, (snap) => {
      const { error, sessionId } = snap.data();
      console.log(sessionId)
          if (error) {
            alert(`An error occured: ${error.message}`);
          }
          if (sessionId) {
            const stripe = window.Stripe(
                    "pk_test_51KNccaSJ8luqTFsLH3Y5IbREc1X51FyLR0sSX16n8JVXKeFNXlp5fRsbFXWTMFdD18gcmBQFnIDOi3f6yO5P2FXh00NRxBlyWd"
            );
            
            stripe.redirectToCheckout({ sessionId });
            
          }
    })



  };

  return (
    <div className="plansScreen">
      {
        subscription && 
          <p>Renewal Date: {new Date(subscription?.current_period_end * 1000)
          .toLocaleDateString()}
          </p>
      }
      
      {Object.entries(products).map(([productId, productData]) => {

        const isCurrentPackage = productData.name
        ?.toLowerCase()
        .includes(subscription?.role)

        return (
          <div className= { `${ isCurrentPackage && "plansScreen_plan_disabled" } plansScreen_plan`} key={productId}>
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
              
            </div>
            <button onClick={ () => (!subscription && loadCheckout(productData))} >
              {isCurrentPackage ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
