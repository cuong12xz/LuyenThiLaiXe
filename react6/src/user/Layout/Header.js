import React, { Component } from "react"
import NavBar from "./NavBar"

class Header extends Component {
    render() {
        return (
            <>
                <NavBar />
                <header>

                <div className="row banner ">
                    <div className="banner-text">
                        <h1 className="responsive-headline" style={{paddingTop:"170px",color:"#099999"}}>Vì tương lai </h1>
                        <h1 className="responsive-headline"style={{color:"#088969"}}>ngày mai</h1>
                        <h3>
                            <span></span>
                        </h3>
                        <hr />
                        <ul className="social"></ul>
                    </div>
                </div>
                
            </header>
            </>
        )
    }
}

export default Header
