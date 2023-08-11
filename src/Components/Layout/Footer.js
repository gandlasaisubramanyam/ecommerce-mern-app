import React from "react";
import { Link } from "react-router-dom";
import { TbWorldWww } from "react-icons/tb";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-dark text-white p-3">
      <div className="container">
        <div className="d-flex align-items-center justify-content-center p-2">
          <a
            href="https://www.shopify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <TbWorldWww className="text-info h5" />
          </a>
          <a
            href="https://twitter.com/shopifydevs"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <AiFillTwitterCircle className="text-info h5" />
          </a>
          <a
            href="https://www.facebook.com/shopify"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <BsFacebook className="text-info h5" />
          </a>
        </div>
      </div>
      <p className="text-center d-flex align-items-center justify-content-center">
        <Link to="/about" className="nav-link text-white">
          About
        </Link>
        |
        <Link to="/policy" className="nav-link text-white">
          Privacy Policy
        </Link>
      </p>
      <h6 className="text-center">&copy; 2022-2023 AsiaShop.in</h6>
    </div>
  );
};

export default Footer;