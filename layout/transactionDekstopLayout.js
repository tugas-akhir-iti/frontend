import React, {useState} from "react";
import ButtonStatus from "../components/buttonStatus";
import ListProduct from "../components/listProduct";
import moment from "moment";
import CategoryCard from "../components/categoryCard";

function TransactionDekstopLayout(props) {
    // const [id, setId] = useState("")
    // // console.log("id:"+id);
    // if(id!=""){props.getOrderId(id)}
    let orders = props.orders;
    let user = props.user;

    
  return (
        <>
            {Object.keys(orders).map((key)=>(
            <div className="d-flex flex-column p-4 mt-4"
                style={{boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                borderRadius: "1rem",}}
                key={orders[key].id}
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
                            <ButtonStatus text="Batalkan" bgColor="#CF000C" value={`${orders[key].id},${orders[key].petani_id}`} onClick={props.handleCancle}/>
                        </div>
                    ) : orders[key].order_transfer_image == null 
                        && orders[key].order_status != "Dibatalkan" 
                        && user.role_id == 1 
                        && orders[key].delivery_id == 1 
                        && orders[key].order_delivery_price != 0 
                        ?
                        (<div className="ms-auto">
                            <ButtonStatus text="Ubah Status Order" bgColor="#7126B5" value={`${orders[key].id},${orders[key].pasar_id}`} onClick={props.handleChangeOrderId}/>
                        </div>
                    ) : orders[key].order_transfer_image == null 
                        && orders[key].order_status != "Dibatalkan" 
                        && user.role_id == 1 
                        && orders[key].delivery_id == 2
                        &&  
                        (<div className="ms-auto">
                            <ButtonStatus text="Ubah Status Order" bgColor="#7126B5" value={`${orders[key].id},${orders[key].pasar_id}`} onClick={props.handleChangeOrderId}/>
                        </div>
                    )}
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
                            <h6 className="m-0">No. HP: +{orders[key].order_phone} </h6>
                            <p className="m-0">{orders[key].order_address}</p>
                            <p className="m-0">{orders[key].order_regency}, {orders[key].order_province}</p>
                            <p className="m-0"><b>Pengiriman : </b> {orders[key].delivery_id == 1 ? "Diantarkan" : "Dijemput"}</p>
                        </div>
                        <div className="ms-auto align-items-center d-flex flex-column">
                            {orders[key].order_transfer_image == null ? (
                            <div class="image-upload d-flex justify-content-center flex-column mb-1">
                                <label for="file-input">
                                    <div style={{width:"150px", height:"150px", backgroundColor:"#E2D4F0", borderRadius:"1rem"}} className="d-flex flex-column align-items-center justify-content-center">
                                        <i className="bi bi-camera"></i>
                                        <i>Bukti </i>
                                        <i>Pembayaran</i>
                                    </div>
                                </label>
                            </div>
                            ):(
                                <div style={{width:"150px", height:"150px", borderRadius:"1rem"}} className="d-flex flex-column align-items-center justify-content-center mb-1">
                                    <img src={orders[key].order_transfer_image} style={{width:"150px", height:"150px", borderRadius:"1rem", objectFit: "scale-down"}}/>
                                </div>
                            )}
                            {orders[key].delivery_id == 1 
                            && orders[key].order_status == "Diproses"
                            && orders[key].order_delivery_price == 0
                            &&
                                <ButtonStatus text="Ongkos Kirim" bgColor="#2b6e5a" formTarget={"_blank"} value={orders[key].id} onClick={props.handleChangeDeliveryPrice}/>
                            }
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
                            <p className="m-0 mb-2">({orders[key].product_owner_bank} a.n Jaenulatif Pudin)</p>
                            {orders[key].order_status == "Diproses" &&
                                <div className="my-0">
                                    <p className="m-0"><b>Pembayaran</b> dilakukan setelah status diterima</p>
                                </div>
                            }
                            <div className="m-0">
                                <p className="m-0"><b>Pengiriman : </b> {orders[key].delivery_id == 1 ? "Diantarkan" : "Dijemput"}</p>
                            </div>
                            {/* <p>({orders[key].id} ID)</p> */}
                        </div>
                        <div className="ms-5 mb-4" >
                            <form action={`https://wa.me/${orders[key].order_phone}?text=[message-url-encoded]`}>
                            <ButtonStatus text="Hubungi" bgColor="#7126B5" formTarget={"_blank"}/>
                            </form>
                        </div>
        
                        {orders[key].order_transfer_image == null 
                        && orders[key].order_status != "Diproses" 
                        && orders[key].order_status != "Dibatalkan" ? (
                        <div className="ms-auto align-items-center" onClick={()=>props.getOrderId(orders[key].id)}>
                            <div class="image-upload d-flex justify-content-center flex-column">
                                <label for="file-input">
                                    <div style={{width:"150px", height:"150px", backgroundColor:"#E2D4F0", borderRadius:"1rem"}} className="d-flex flex-column align-items-center justify-content-center">
                                        <i className="bi bi-camera"></i>
                                        <i>Upload</i>
                                        <i>Bukti Pembayaran</i>
                                    </div>
                                </label>
                               
                                {/* <input id="file-input" name="order_transfer_image" type="file" onChange={props.handleUploadTransaction} hidden/> */}
                                {/* <input id="file-inp" name="" type="number" value={orders[key].id} readOnly/> */}
                            </div>
                        </div>
                        ):(
                        <div className="ms-auto align-items-center">
                            <div style={{width:"150px", height:"150px", borderRadius:"1rem"}} className="d-flex flex-column align-items-center justify-content-center">
                                <img src={orders[key].order_transfer_image} style={{width:"150px", height:"150px", borderRadius:"1rem", objectFit: "scale-down"}}/>
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
                
                <div className="ms-auto me-4 my-0 mb-4">
                    <h6 className="my-0 mb-2"  style={{textAlign:"right"}}>Ringkasan Belanja </h6>
                    <p  className="m-0" style={{textAlign:"right"}}>
                    Rp. {orders[key].product_order.map(item => item.product_price * item.order_qty).reduce((prev, curr) => prev + curr, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    <span style={{fontSize:"0.85rem"}}> <strong>(Total)</strong></span></p>

                    {orders[key].order_delivery_price == 0 &&
                    orders[key].delivery_id == 1
                    ? (
                        <p  className="m-0" style={{textAlign:"right"}}>
                        <span style={{fontSize:"0.85rem"}}><i>Ongkos kirim sedang dihitung</i></span>
                        </p>
                    ) : orders[key].order_delivery_price == 0 &&
                        orders[key].delivery_id == 2 ? (
                            <p  className="m-0" style={{textAlign:"right"}}>
                            <span style={{fontSize:"0.85rem"}}><i>Pengiriman Dijemput</i></span>
                            </p>
                    ): (
                        <p  className="m-0" style={{textAlign:"right"}}>
                        Rp. {`${orders[key].order_delivery_price}`}
                        <span style={{fontSize:"0.8rem"}}><strong> (Ongkir)</strong></span>
                        </p>
                    )}
                    
                    <hr 
                        style={{
                        height:"2px",
                        borderWidth:"0",
                        color:"gray",
                        backgroundColor:"gray",
                        }}
                        className="my-2"
                    />
                    <h6 className="my-0 mt-2"  style={{textAlign:"right"}}>Total Belanja</h6>
                    <h5 className="my-0 mt-1" style={{textAlign:"right"}}>
                    {/* Rp. {orders[key].product_order.map(item => item.product_price * item.order_qty).reduce((prev, curr) => prev + curr, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} */}
                    Rp. {(orders[key].order_delivery_price) + orders[key].product_order.map(item => item.product_price * item.order_qty)}
                    </h5>
                </div>
            </div>
        ))}
    </>
    );
}

export default TransactionDekstopLayout;
