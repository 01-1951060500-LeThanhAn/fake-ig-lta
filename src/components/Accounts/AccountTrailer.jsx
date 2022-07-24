import React, { useState } from "react";
import "./AccountTrailer.css";
import Avatar from "@material-ui/core/Avatar"
const AccountTrailer = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      title: "neymarjr",
      avatar:
        "https://i.pinimg.com/originals/78/38/a4/7838a41fa579b9815096c9a44f4095a0.jpg",
    },
    {
      id: 2,
      title: "cristiano",
      avatar:
        "https://www.cristianoronaldo.com/assets/images/brand_eyewear.jpg?832236",
    },
    {
      id: 3,
      title: "realmadrid",
      avatar:
        "http://item.com.vn/fileupload/source/San-pham-tem/Logo-cau-lac-bo/Logo-cau-lac-bo-20.jpg",
    },
    {
      id: 4,
      title: "leomessi",
      avatar:
        "https://vtv1.mediacdn.vn/zoom/700_438/2019/5/23/lionel-messi-1558625894082436368399-crop-1558625901749462544445.jpg",
    },
  ]);

  return (
    <>
      <div className="account__trailer">
        <div className="account__trailer__box">
          {accounts.map((account) => (
            <div className="account__main" key={account.id}>
              <div className="account__trailer__image">
                <img src={account.avatar} alt={account.title} />
              </div>
              <div className="account__trailer__title">
                <p>{account.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AccountTrailer;
