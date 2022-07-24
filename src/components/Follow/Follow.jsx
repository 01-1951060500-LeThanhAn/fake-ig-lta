import React, { useState, useEffect } from "react";
import "./Follow.css";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Account from "../Accounts/Account";
const Follow = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "follows"), orderBy("createAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {

      setAccounts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <>
      <div className="follow">
        <div className="follow__inner">
          <h4>Gợi ý cho bạn</h4>
          <p>Xem tất cả </p>
        </div>
      </div>

      {accounts &&
        accounts.map((account, index) => (
          <Account key={index} data={account} />
        ))}
    </>
  );
};

export default Follow;
