import React, { Component } from "react"
import "./Footer.css"
class Footer extends Component {
    render() {
        if (this.props.data) {
            var networks = this.props.data.social.map(function (network) {
                return (
                    <li key={network.name}>
                        <a href={network.url}>
                            <i className={network.className}></i>
                        </a>
                    </li>
                )
            })
        }

        return (
            <footer>
                <div className="row displayIB">
                    <div className="twelve columns">
                        <ul className="social-links colo">{networks}</ul>
                        <ul className="copyright">
                            <li className="colo">Email: ngoanhcuong21@gmail.com</li>
                            <li className="colo">Địa chỉ: Ấp 2 Phước Bình Long Thành Tỉnh Quảng Ngãi</li>
                        </ul>
                        <p className="colo">
                            2022-2028<a title="Styleshout" href="http://www.styleshout.com/"></a>
                        </p>
                    </div>
                    <div class="foot2-6">
                        <div>Bằng lái A1</div>
                        <div>Bằng lái A2</div>
                        <div>Bằng lái B2</div>
                        <div>Bằng lái C</div>
                        <div>Bằng lái A3</div>
                        <div>Bằng lái D</div>
                        <div>Bằng lái E</div>
                        <div>Bằng lái F</div>
                        <div>Bằng lái FB2</div>
                        <div>Bằng lái FC</div>
                        <div>Bằng lái A4</div>
                        <div>Bằng lái FD</div>
                        <div>Bằng lái FE</div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer
