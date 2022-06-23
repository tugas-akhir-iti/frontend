import React from "react";

function ProdukDesktopLayout(props) {
  return (
    <div className="row mt-5 p-2">
      <div className="col-8 d-flex flex-column gap-4">
        {props.images}
        {props.description}
      </div>
      <div className="col-4">
        <div className="sticky-top d-flex flex-column gap-4">
          {props.information}
          {props.owner}
        </div>
      </div>
    </div>
  );
}

export default ProdukDesktopLayout;
