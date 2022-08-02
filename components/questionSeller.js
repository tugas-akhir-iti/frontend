import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import CategoryCard from "./categoryCard";
import { useRouter } from "next/router";
const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

function QuestionSeller(props){
    const router = useRouter();
    const [answare, setAnsware] = useState("");

    const handleAnsware = async (e) => {
        console.log(props.id, answare, props.token);
        e.preventDefault();
        
        const data = new FormData();
        data.append("answare", answare);

        if (props.token) {
          try {
            await axios({
              method: "put",
              url: `${API}/products/questions/${props.id}`,
              data: data,
              headers: {
                Authorization: `Bearer ${props.token}`,
                "Content-Type": `multipart/form-data`,
              },
            });
            router.reload();
          } catch (error) {
            console.log(error.response);
          }
        } else {
            alert("Tidak berhasil anwsare")
            // router.reload();
        }
    };

    return(
        <>
            
                {/* tanya */}
                <div
                    className="d-flex flex-column p-3 mt-3"
                    style={{
                        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                        borderRadius: "1rem",
                    }}
                >
                    <div className="d-flex p-2 gap-3 align-items-center">
                        <img
                            src={props.user_image_question}
                            alt="ini alt"
                            style={{ height: "3rem", borderRadius: "1rem" }}
                        />
                        <div className="flex-fill d-flex flex-column justify-content-center">
                            <h5 className="m-0">{props.user_name_question}</h5>
                            <p className="m-0">{moment(props.createdAt).format('DD/MM/YYYY')}</p>
                        </div>
                    </div>
                    <div 
                    className="d-flex p-2 align-items-center"
                    style={{
                            boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                            borderRadius: "0.3rem",
                        }}>
                        <p className="mt-auto mb-auto">{props.question}</p>
                    </div>
                </div>

                {props.answare != null ? (
                <div
                    className="d-flex flex-column p-3 mt-2 ms-5"
                    style={{
                        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                        borderRadius: "1rem",
                    }}
                >
                    <div className="d-flex p-2 gap-3 align-items-center">
                        <img
                            src={props.user_image_product}
                            alt="ini alt"
                            style={{ height: "3rem", borderRadius: "1rem" }}
                        />
                        <div className="flex-fill d-flex flex-column justify-content-center">
                            <h5 className="m-0">{props.user_name_product}</h5>
                            <p className="m-0">{moment(props.updatedAt).format('DD/MM/YYYY')}</p>
                        </div>
                    </div>
                    <div 
                    className="d-flex p-2 align-items-center"
                    style={{
                            boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                            borderRadius: "0.3rem",
                        }}>
                        <p className="mt-auto mb-auto">{props.answare}</p>
                    </div>
                </div>
                ) : (
                    <div className="d-flex flex-column">
                        <textarea 
                            style={{boxShadow: "0px 0px 6px rgba(0,0,0,0.15)", 
                            borderRadius: "0.3rem", border:"none"}} 
                            className="mt-2 ms-2 mb-2 p-2" 
                            placeholder="Tulis jawaban" 
                            type="textarea"
                            onChange={e=>{setAnsware(e.currentTarget.value)}}
                        />

                        <div className="d-flex justify-content-end">
                            <CategoryCard
                                className="p-2 ps-4 pe-4"
                                text="Kirim"
                                rad="5"
                                onClick={handleAnsware}
                            />
                        </div>
                    </div>
                )}
        </>
        )
}

export default QuestionSeller;