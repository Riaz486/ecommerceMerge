import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from '@material-ui/icons/Twitter';
const About = () => {
    const visitInstagram = () => {
        window.location = "https://www.linkedin.com/in/muhammad-riaz-3a544012a/";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <img
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", borderRadius: "50%" }}
                            src="https://res.cloudinary.com/dtydodpgr/image/upload/v1694552216/avatars/rz5lzqvy5hwwwkn3euq3.jpg"
                            alt="Founder"
                        />
                        <Typography>Muhammad Riaz</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Linkedin
                        </Button>
                        <span>
                            This is a sample wesbite made by Riaz.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a
                            href="https://www.facebook.com/syed.Riaz.zada/"
                            target="blank"
                        >
                            <FacebookIcon className="youtubeSvgIcon" />
                        </a>

                        <a href="https://www.instagram.com/riazsyed40/?next=%2F" target="blank">
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>
                        <a href="https://twitter.com/syedriaz369" target="blank">
                            <TwitterIcon className="twitterSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
