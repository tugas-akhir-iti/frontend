import React, {useEffect, useState} from "react";
import ButtonStatus from "../components/buttonStatus";
// import InputBox from "../components/inputBox";
// import CategoryCard from "../components/categoryCard";
// import axios from "axios";
// import FormData from "form-data";
import ListProduct from "../components/listProduct";
import moment from "moment";

function TransactionDekstopLayout(props) {
    const [id, setId] = useState(null)
    let orders = props.orders;
    let user = props.user;

    
  return (
        <>
            {Object.keys(orders).map((key)=>(
            <div className="d-flex flex-column p-4"
                style={{boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                borderRadius: "1rem",}}
            >

                <div className="d-flex flex-row align-items-center">
                    <p className="align-self-center me-4"><strong>Belanja : </strong>{moment(orders[key].createdAt).format('DD/MM/YYYY')}</p>
                    {orders[key].order_status == "Dibatalkan" ? (
                        <ButtonStatus 
                        text={orders[key].order_status}
                        disable="true" 
                        bgColor="#CF000C"
                        />
                    ) : orders[key].order_status == "Selesai" ? (
                        <ButtonStatus 
                        text={orders[key].order_status}
                        disable="true" 
                        bgColor="#00b300"
                        />
                    ) : (
                        <ButtonStatus 
                        text={orders[key].order_status}
                        disable="true" 
                        bgColor="#FFB802"
                        />  
                    )}
                    
                    {orders[key].order_transfer_image == null && orders[key].order_status != "Dibatalkan" && user.role_id == 2 ? (
                        <div className="ms-auto">
                            <ButtonStatus text="Batalkan" bgColor="#CF000C" value={orders[key].id} onClick={props.handleCancle}/>
                        </div>
                    ) : orders[key].order_transfer_image == null && orders[key].order_status != "Dibatalkan" && user.role_id == 1 && orders[key].order_status != "Selesai"? (
                        <div className="ms-auto">
                            <ButtonStatus text="Ubah Status Order" bgColor="#7126B5" value={orders[key].id} onClick={props.handleStatusOrder}/>
                        </div>
                    ): (null)}
                </div>

                <hr 
                    style={{
                    height:"3px",
                    borderWidth:"0",
                    color:"gray",
                    backgroundColor:"gray",
                    }}
                />

                {user.role_id == 1 ? (

                    <div className="d-flex align-items-center">
                        <div>
                            <h5 className="m-0">{orders[key].order_name}</h5>
                            <div className="mt-2" >
                                <form action="https://wa.me/6289623176509?text=[message-url-encoded]">
                                    <ButtonStatus text="Hubungi" bgColor="#7126B5" formTarget={"_blank"}/>
                                </form>
                            </div>
                        </div>
                        <div className="ms-5">
                            <h5 className="m-0">No. HP: {orders[key].order_phone} </h5>
                            <p className="m-0">{orders[key].order_address}</p>
                            <p className="">{orders[key].order_regency}, {orders[key].order_province} </p>
                        </div>
                        <div className="ms-auto align-items-center">
                            {orders[key].order_transfer_image == null ? (
                            <div class="image-upload d-flex justify-content-center flex-column">
                                <label for="file-input">
                                    <div style={{width:"150px", height:"150px", backgroundColor:"#E2D4F0", borderRadius:"1rem"}} className="d-flex flex-column align-items-center justify-content-center">
                                        <i className="bi bi-camera"></i>
                                        <i>Bukti Transaksi</i>
                                    </div>
                                </label>
                            </div>
                            ):(
                                <div style={{width:"150px", height:"150px", borderRadius:"1rem"}} className="d-flex flex-column align-items-center justify-content-center">
                                    <img src={orders[key].order_transfer_image} style={{width:"150px", height:"150px", borderRadius:"1rem", objectFit: "scale-down"}}/>
                                </div>
                            )}
                        </div>
                    </div>
                    
                ) : user.role_id == 2 ? (

                    <div className="d-flex align-items-center">
                        <div>
                            <h5 className="m-0">{orders[key].product_owner_name}</h5>
                            <p style={{color:"grey"}} className="ms-0">{orders[key].product_owner_regency}</p>
                        </div>
                        <div className="ms-5">
                            <h5 className="m-0">No. Rek: {orders[key].product_owner_rekening} </h5>
                            <p>({orders[key].product_owner_bank} a.n Jaenulatif Pudin)</p>
                            <p>({orders[key].id} ID)</p>
                        </div>
                        <div className="ms-5 mb-4" >
                            {/* <h6 className="m-0">No. HP : {orders[key].product_owner_phone}</h6> */}
                            <form action="https://wa.me/6289623176509?text=[message-url-encoded]">
                            <ButtonStatus text="Hubungi" bgColor="#7126B5" formTarget={"_blank"}/>
                            </form>
                        </div>
                        <div className="ms-auto align-items-center">
                            {orders[key].order_transfer_image == null ? (
                            <div class="image-upload d-flex justify-content-center flex-column">
                                <label for="file-input">
                                    <div style={{width:"150px", height:"150px", backgroundColor:"#E2D4F0", borderRadius:"1rem"}} className="d-flex flex-column align-items-center justify-content-center">
                                        <i className="bi bi-camera"></i>
                                        <i>Upload Transaksi</i>
                                    </div>
                                </label>
                                <input id="file-input" name={orders[key].id}  onInput={props.handleUploadTransaction} type="file" hidden />
                                {/* <input id="file-input" name="user_image" value={orders[key].id} type="number" hidden /> */}
                            </div>
                            ):(
                                <div style={{width:"150px", height:"150px", borderRadius:"1rem"}} className="d-flex flex-column align-items-center justify-content-center">
                                    <img src={orders[key].order_transfer_image} style={{width:"150px", height:"150px", borderRadius:"1rem", objectFit: "scale-down"}}/>
                                </div>
                            )}
                        </div>
                    </div>

                ) : null}
                
                
                {orders[key].product_order.map((data)=>(
                <div className="mt-0">
                    <ListProduct 
                        productPrice={data.product_price} 
                        productImage={data.product_image} 
                        productName={data.product_name} 
                        quantity={data.order_qty}
                    />
                </div>
                ))}

            </div>
        ))}
    </>
    );
}

export default TransactionDekstopLayout;
