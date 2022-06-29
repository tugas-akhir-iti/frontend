import React from "react";

function InputBox({ className, placeholder, name, type, value }) {
    return (

        <input type={type}
            name={name}
            value={value}
            className={className}
            placeholder={placeholder}
            style={{
                padding: "12px 16px",
                width: "568px",
                height: "48px",
                border: "1px solid #D0D0D0",
                borderRadius: "16px",
                background: "#FFFFFF",
                display: "flex"
            }}
        />


    );
}

export default InputBox;
