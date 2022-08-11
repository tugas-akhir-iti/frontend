import React from "react";

function ProdukMobileLayout(props) {
  return (
    <>
      <div className="p-2">
        {props.images}
      </div>
      <div className="p-2 d-flex flex-column gap-4" style={{marginBottom:"110px"}}>
        {props.information}
        {props.isOwner}
        <div style={{whiteSpace: "pre-line"}}>
          {props.description}
        </div>
        {props.questionBuyer}
      </div>
      <div className="position-fixed bottom-0 start-0 end-0 p-2 d-flex">
        {props.button}
      </div>
    </>
  );
}

export default ProdukMobileLayout;
