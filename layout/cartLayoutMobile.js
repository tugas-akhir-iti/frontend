import React from "react";

function CartMobileLayout(props) {
  return (
    <>
      <div className="p-2 d-flex flex-column gap-4" style={{marginBottom:"110px"}}>
        <h3 className="ms-2 mt-2 mb-0">{props.pageTitle}</h3>
        {props.address}
        {props.product}
        {props.attention}
      </div>
      <div className="position-fixed bottom-0 d-flex flex-column start-0 end-0 p-0 p-2">
          {props.information}
          {props.button}
      </div>
    </>
  );
}

export default CartMobileLayout;