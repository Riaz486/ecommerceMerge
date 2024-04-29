import React from 'react'
import { ReactNavbar } from "overlay-navbar";
import logo from '../../../images/logo.png'

// import webFont from 'webfontloader'
const options = {
    burgerColorHover: "#3a513c;",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#3a513c;",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "#3a513c",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#3a513c;",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "#3a513c",
    searchIconColor: "#3a513c",
    cartIconColor: "#3a513c",
    profileIconColorHover: "#3a513c;",
    searchIconColorHover: "#3a513c;",
    cartIconColorHover: "#3a513c;",
    cartIconMargin: "1vmax",
    // searchIcon: true,
    // searchIconElement: FaSearch
    // profileIcon: { true},
    // profileIconElement: { FaSearch }


};
const Header = () => {
    return (
        <ReactNavbar {...options}
        // burgerColorHover="#3a513c;"
        //     logo={logo}
        //     logoWidth="20vmax"
        //     navColor1="white"
        //     logoHoverSize="10px"
        //     logoHoverColor="#3a513c;"
        //     link1Text="Home"
        //     link2Text="Products"
        //     link3Text="Contact"
        //     link4Text="About"
        //     link1Url="/"
        //     link2Url="/products"
        //     link3Url="/contact"
        //     link4Url="/about"
        //     link1Size="1.3vmax"
        //     link1Color="rgba(35, 35, 35,0.8)"
        //     nav1justifyContent="flex-end"
        //     nav2justifyContent="flex-end"
        //     nav3justifyContent="flex-start"
        //     nav4justifyContent="flex-start"
        //     link1ColorHover="#3a513c;"
        //     link1Margin="1vmax"
        //     profileIconUrl="/login"
        //     profileIconColor="rgba(35, 35, 35,0.8)"
        //     searchIconColor="rgba(35, 35, 35,0.8)"
        //     cartIconColor="rgba(35, 35, 35,0.8)"
        //     profileIconColorHover="#3a513c;"
        //     searchIconColorHover="#3a513c;"
        //     cartIconColorHover="#3a513c;"
        //     cartIconMargin="1vmax"

        />
    )
}

export default Header