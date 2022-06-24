/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
import React from 'react'
import Link from 'next/link'
import styles from "../styles/Home.module.css"

function Header() {
    return (
        <div>


            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">


                    <a className="navbar-brand px-5 fs-2" href="#">
                        <img className={styles.logo} src="/logo.png" alt="banner" />
                    </a>
                    <div className={styles.searchBar}>
                        <div className="nav-item d-flex align-items-center d-none d-sm-block">
                            <form className={styles.searchForm} method="POST" action="#">
                                <input type="text" name="query" placeholder="Cari di sini..." title="Enter search keyword" />
                                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                            </form>
                        </div>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-5">
                            <li className="nav-item">
                                <div className={styles.btnMasuk}>

                                    <a className="text-white btn btn-md" aria-current="page" href="/login">
                                        <i className="bi bi-box-arrow-in-right"></i>  Masuk</a>
                                </div>
                            </li>

                        </ul>

                    </div>


                </div>
            </nav>


        </div >
    )
}

export default Header