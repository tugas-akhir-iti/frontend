import React, {useState} from "react";
import { useRouter } from "next/router";

function Search() {
  const [val, setVal] = useState("");
    let router = useRouter();

    const submitOnClick = () => {
        router.push({
          pathname: '/search',
          query: { keyword: val},
      })
      }
    
    const inputOnChange = (event) => {
        setVal(event.target.value);
      }
  return (
    <div>
      <div
        className="input-group"
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
        }}
      >
        <input
          type="text"
          className="form-control border-0"
          placeholder="Cari produk di sini..."
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            height: "48px",
          }}
          onChange={inputOnChange}
        />
        <span className="input-group-text bg-transparent border-0 fs-4 px-4">
          
          <button onClick={submitOnClick} className="BUTTON">
            <i className="bi bi-search"></i>
          </button>
        </span>
      </div>
    </div>
  );
}

export default Search;
