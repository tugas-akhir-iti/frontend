import React from "react";

export default function ButtonStatus(props){
    return(
        <>
            <button
                style={{backgroundColor:props.bgColor,
                color:"#FFF",
                borderRadius:"0.3rem",
                fontSize:props.fontSize,
                }}
                className="ps-3 pt-1 pb-1 pe-3 ms-0"
                disabled={props.disable}
                onClick={props.onClick}
                type="submit"
                formTarget={props.formTarget}
                value={props.value}
            >
                {props.text}
            </button>
        </>
    )
}