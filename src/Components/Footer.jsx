import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  return (
    <section id="footer-shop">
      <footer className="">
        <div className="container ">
          <div className="row ">
            <div className="col-md-4">
              <span className="copyright">
                <img
                  src="https://tavago.ru/upload/iblock/b25/b25836ce9619458e6cd4dcb9fcd04a77.png"
                  height={70}
                  alt=""
                />
              </span>
            </div>
            <div className="col-md-4 ">
              <ul className="list-inline quicklinks">
                <li>
                  <h6 className=" mt-4">
                    <Link
                      to={"https://t.me/SaidqodirxonRahimov"}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      Saidqodirxon Rahimov
                    </Link>
                  </h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
