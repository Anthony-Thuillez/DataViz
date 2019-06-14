import React from "react"
import Logo from '../../assets/LogoText.png';

class LogoAnime extends React.Component {
    render() {
        return (
            <div class="loading">
                <h1 class="logoAnime"> UL </h1>
                <img src={Logo} alt="Logo" />
            </div>
        )
    }
}

export default LogoAnime