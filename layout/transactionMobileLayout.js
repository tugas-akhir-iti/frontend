import React, {useState} from "react";
import ButtonStatus from "../components/buttonStatus";
import ListProduct from "../components/listProduct";
import moment from "moment";
import CategoryCard from "../components/categoryCard";

function TransactionMobileLayout(props) {
    const [id, setId] = useState("")
    // console.log("id:"+id);
    let orders = props.orders;
    let user = props.user;

    
  return (
        <>
            {/* <div className="p-2 d-flex flex-column gap-4" style={{marginBottom:"110px"}}>
                <h3 className="ms-2 mt-2 mb-0">{props.pageTitle}</h3>
                {props.address}
                {props.product}
                {props.attention}
            </div>
            <div className="position-fixed bottom-0 d-flex flex-column start-0 end-0 p-0 p-2">
                    {props.information}
                    {props.button}
            </div> */}

            {Object.keys(orders).map((key)=>(
            <div className="d-flex flex-column p-4 mt-4 mx-3"
                style={{boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                borderRadius: "1rem",}}
            >

                <div className="d-flex align-items-center">
                    <p className=" me-4 my-2"><strong>Belanja : </strong>{moment(orders[key].createdAt).format('DD/MM/YYYY')}</p>
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

                    {orders[key].order_transfer_image == null 
                    && orders[key].order_status == "Diproses" 
                    && user.role_id == 2 ? (
                        <div className="ms-auto">
                            <ButtonStatus text="Batalkan" bgColor="#CF000C" value={orders[key].id} onClick={props.handleCancle}/>
                        </div>
                    ) : orders[key].order_transfer_image == null 
                        && orders[key].order_status != "Dibatalkan" 
                        && user.role_id == 1 && 
                        orders[key].order_status != "Selesai"? (
                        <div className="ms-auto">
                            <ButtonStatus text="Ubah Status Order" bgColor="#7126B5" value={orders[key].id} onClick={props.handleChangeOrderId}/>
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
                    className="my-2"
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
                                        <i>Bukti </i>
                                        <i>Pembayaran</i>
                                    </div>
                                </label>
                            </div>
                            ):(
                                <div style={{width:"100px", height:"100px", borderRadius:"1rem"}} className="d-flex flex-column align-items-center justify-content-center">
                                    <img src={orders[key].order_transfer_image} style={{width:"150px", height:"150px", borderRadius:"1rem", objectFit: "scale-down"}}/>
                                </div>
                            )}
                        </div>
                    </div>
                    
                ) : user.role_id == 2 ? (

                    <div className="d-flex align-items-center">
                        <div className="d-flex flex-column">
                            <div>
                                <h5 className="m-0">{orders[key].product_owner_name}</h5>
                                <p style={{color:"grey"}} className="ms-0">{orders[key].product_owner_regency}</p>
                            </div>
                            <div className="">
                                <h5 className="m-0">No. Rek: {orders[key].product_owner_rekening} </h5>
                                <p className="m-0">({orders[key].product_owner_bank} a.n Jaenulatif Pudin)</p>
                                {orders[key].order_status == "Diproses" &&
                                    <div className="my-0">
                                        <p><b>Pembayaran</b> dilakukan setelah status diterima</p>
                                    </div>
                                }

                                {/* <p>({orders[key].id} ID)</p> */}
                            </div>
                            <div className="ms-0 my-4" >
                                <form action="https://wa.me/6289623176509?text=[message-url-encoded]">
                                <ButtonStatus text="Hubungi" bgColor="#7126B5" formTarget={"_blank"}/>
                                </form>
                            </div>

                        </div>
                             
                        {orders[key].order_transfer_image == null 
                        && orders[key].order_status != "Diproses" ? (
                        <div className="ms-auto align-items-center">
                            <div class="image-upload d-flex justify-content-center flex-column">
                                <label for="">
                                    <div style={{width:"150px", height:"150px", backgroundColor:"#E2D4F0", borderRadius:"1rem"}} className="d-flex flex-column align-items-center justify-content-center">
                                        <i className="bi bi-camera"></i>
                                        <i>Upload</i>
                                        <i>Bukti Pembayaran</i>
                                    </div>
                                </label>
                                {/* <input > */}
                                {/* <input id="" name="file-input" value={orders[key].id} onClick={props.handleUploadTransaction} /> */}
                                {/* <CategoryCard text="Upload" onClick={props.handleUploadTransaction} value={orders[key].id} rad="4"/> */}
                            </div>
                        </div>
                        ):(
                        <div className="ms-auto align-items-center">
                            <div style={{width:"150px", height:"150px", borderRadius:"1rem"}} className="d-flex flex-column align-items-center justify-content-center">
                                <img src={orders[key].order_transfer_image} style={{width:"100px", height:"100px", borderRadius:"1rem", objectFit: "scale-down"}}/>
                            </div>
                        </div>
                        )}
                        
                    </div>

                ) : null}
                
                
                
                <div className="mt-0">
                    {orders[key].product_order.map((data)=>(
                    <ListProduct 
                        productPrice={data.product_price} 
                        productImage={data.product_image} 
                        productName={data.product_name} 
                        quantity={data.order_qty}
                    />
                    ))}
                </div>
                
                <div className="ms-auto me-0 my-0 mb-4">
                    <hr 
                        style={{
                        height:"3px",
                        borderWidth:"0",
                        color:"gray",
                        backgroundColor:"gray",
                        }}
                        className="my-2"
                    />
                    <h6 className="my-0">Total Pembayaran  </h6>
                    <h5 className="my-0 mt-1" style={{textAlign:"right"}}>
                    Rp. {orders[key].product_order.map(item => item.product_price * item.order_qty).reduce((prev, curr) => prev + curr, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </h5>
                </div>
            </div>
        ))}
    </>
    );
}

export default TransactionMobileLayout;