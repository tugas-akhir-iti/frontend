import React from "react";
import ItemList from "./itemList";

function ListSeller({ listsize }) {
  return (
    <>
      {listsize > 0 ? (
        <div>
          <li>
            <ItemList />
          </li>
          <li>
            <ItemList />
          </li>
          <li>
            <ItemList />
          </li>
          <li>
            <ItemList />
          </li>
        </div>
      ) : (
        <div className="text-center d-flex flex-column justify-items-center py-5 ">
          <img
            className="mx-auto"
            src="empty-seller.svg"
            alt="No Item Available"
            style={{ width: "45%" }}
          />
          <p className="m-0 pt-5">
            Belum ada produk nih, sabar ya rejeki nggak kemana kok
          </p>
        </div>
      )}
    </>
  );
}

export default ListSeller;
