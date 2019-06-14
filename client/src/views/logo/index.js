import React from "react"
import { Link } from 'react-router-dom';

import LogoText from '../../assets/LogoText.png';

class LogoAnime extends React.Component {
    render() {
        const { backgroundSize, fontSize, subTitle } = this.props
        if (subTitle) {
            return (
                <div class="loading">
                    <h1 style={{ backgroundSize, fontSize }} class="logoAnime"> UL </h1>
                    <img src={LogoText} alt="Logo" />
                </div>
            )
        }

        return (
            <div class="loading">
                <Link style={{ color: "transparent" }} to="/">
                    <h1 style={{ cursor: 'pointer', backgroundSize, fontSize }} class="logoAnimeLitle"> UL </h1>
                </Link>
            </div>
        )
    }
}

export default LogoAnime