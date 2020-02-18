import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Redirect } from "react-router-dom";

function Home() {
  const [userStatus, setUserStatus] = useState(null);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user == null) {
        setRedirect(true);
        setUserStatus(user);
      } else setUserStatus(user);
    });
  }, [userStatus]);


  const handleLogout = e => {
    auth.signOut();
  }


  return (
    <>
      {redirect ? (
        <Redirect to="/signin" />
      ) : (
        <>
          <div>home component</div>
          <button onClick={handleLogout} className="btn btn-info">logout</button>
        </>
      )}
    </>
  );
}

export default Home;
