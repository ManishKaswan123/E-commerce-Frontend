import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                {/* Left Section */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                    <h4 className="text-lg font-semibold">DOWNLOAD OUR APP</h4>
                    <p className="text-sm">Download App for Android and iOS mobile phone</p>
                    <div className="flex space-x-4">
                        <img src={playStore} alt="Play Store" className="w-32 h-auto" />
                        <img src={appStore} alt="App Store" className="w-32 h-auto" />
                    </div>
                </div>

                {/* Middle Section */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold">ECOMMERCE</h1>
                    <p className="text-sm">High Quality is our first priority</p>
                    <p className="text-sm mt-2">&copy; 2021 MeManishKaswan</p>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4">
                    <h4 className="text-lg font-semibold">Follow Us</h4>
                    <a href="https://www.instagram.com/kaswan812/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">Instagram</a>
                    <a href="https://github.com/ManishKaswan123" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">Github</a>
                    <a href="https://www.linkedin.com/in/manish-kaswan-36b972235/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
