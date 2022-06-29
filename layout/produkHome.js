import React from "react";
import styles from "../styles/Home.module.css";
import CategoryCard from "../components/categoryCard";
import ItemCard from "../components/itemCard";

function ProdukHomeLayout() {
    return (
        <div>

            <div className="card">
                <div className={styles.PillTab}>

                    <div className="card-body">
                        <h5 className="card-title">Telusuri Kategori</h5>

                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button style={{ borderRadius: "16px" }}
                                    className="fs-5 nav-link active d-flex align-items-center px-3 py-1 gap-2" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                    <i className="bi bi-search"></i> Semua

                                </button>

                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
                            </li>
                        </ul>
                        <div className="tab-content pt-2" id="myTabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="row">
                                    <div className="col-10 offset-1 mt-4">
                                        <div className="row pb-3">
                                            <div className="col-lg-2 mb-4">
                                                <div className="card border-0 shadow-sm mb-2">
                                                    <ItemCard />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="profile-tab">
                                Nesciunt totam et. Consequuntur magnam aliquid eos nulla dolor iure eos quia. Accusantium distinctio omnis et atque fugiat. Itaque doloremque aliquid sint quasi quia distinctio similique. Voluptate nihil recusandae mollitia dolores. Ut laboriosam voluptatum dicta.
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="contact-tab">
                                Saepe animi et soluta ad odit soluta sunt. Nihil quos omnis animi debitis cumque. Accusantium quibusdam perspiciatis qui qui omnis magnam. Officiis accusamus impedit molestias nostrum veniam. Qui amet ipsum iure. Dignissimos fuga tempore dolor.
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProdukHomeLayout;
