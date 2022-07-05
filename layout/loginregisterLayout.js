import React from 'react'

function LoginregisterLayout({ children }) {
  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src="/loginimg.png"
              alt="Login image"
              className="w-100 vh-100"
              style={{ ObjectFit: "cover", ObjectPosition: "left" }}
            />
          </div>

          <div className="col-sm-6">
            <div className="px-3 ms-xl-4 d-lg-none d-xl-none d-md-none mt-5">
              <i className="bi bi-arrow-left fs-1"></i>
            </div>

            <div className="d-flex flex-column">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginregisterLayout