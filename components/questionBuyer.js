import moment from "moment";

function QuestionBuyer(props){
    return(
        <>
                {/* tanya */}
                <div
                    className="d-flex flex-column p-3 mt-2"
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
                            <h6 className="m-0">{props.user_name_question}</h6>
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

                {/*Jawab  */}
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
                            <h6 className="m-0">{props.user_name_product}</h6>
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
                    <div>
                    </div>
                )}
        </>
        )
}

export default QuestionBuyer;