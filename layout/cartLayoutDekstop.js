import React from "react";

function cartLayoutDekstop(props) {
  return (
    <div className="container-fluid row m-0 mt-2 p-2" style={{width:"100%"}}>
      <div className="col-7 d-flex flex-column gap-4">
      <h3>{props.pageTitle}</h3>
        {props.address}
        {props.product}
      </div>
      <div className="col-5">
        <div className="sticky-top d-flex flex-column gap-4" style={{top:"70px"}}>
          {props.information}
          {props.attention}
        </div>
      </div>
    </div>
  );
}

export default cartLayoutDekstop;