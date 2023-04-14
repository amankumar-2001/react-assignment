import React from 'react'
import "./navbar.css"

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid reqNav d-flex">
                    <a className="navbar-brand bold hsize" href='/'>Pizza-hi-Pizza</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <a className="btn text-white border border-white" href="/cart">
                            Your Bag
                        </a>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar
