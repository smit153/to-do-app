import React, { useState, useEffect } from "react";
import { db } from "../../FireBase";
import { getDocs, collection } from "@firebase/firestore";
import Data from "./Data";
export default function Admin() {
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoggedIn, setAdminLoogedIn] = useState(false);
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const adminRef = collection(db, "admin");
    const getAdmin = async () => {
      const data = await getDocs(adminRef);
      setAdmin(data.docs[0].data());
    };
    getAdmin();
  }, []);

  const adminLogin = (e) => {
    e.preventDefault();
    if (adminId === admin.id && adminPassword === admin.password) {
      setAdminLoogedIn(true);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center">
      {adminLoggedIn ? (
        <Data />
      ) : (
        <div className="d-flex flex-column align-items-center w-50">
          <div className="fs-1 fw-bold">Admin Login</div>
          <form
            className="w-75 mt-6 d-flex flex-column align-items-center"
            onSubmit={adminLogin}
          >
            <input
              className="form-control"
              type="text"
              placeholder="user"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
            <input
              className="form-control"
              type="password"
              placeholder="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button className="btn btn-primary mt-2">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}
