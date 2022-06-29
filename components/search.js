import React from "react";

function Search() {
    return (
        <div>

            <input type="search" name="search" placeholder="Cari di sini..."
                style={{/* Auto layout */
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "12px 24px",
                    position: "absolute",
                    width: "444px",
                    height: "48px",
                    left: "260px",
                    top: "18px",
                    border: "none",
                    background: "#EEEEEE",
                    borderRadius: "16px",
                }}

            />
            <i className="bi bi-search" style={{
                position: "absolute",
                width: "24px",
                height: "24px",
                left: "659px",
                top: "30px",
            }}></i>

        </div >
    );
}

export default Search;
