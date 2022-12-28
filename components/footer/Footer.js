import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <Link href="/about">
                   about us
                </Link>
              </li>
              <li>
                <Link href="/terms-&-conditions">
                   Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                   Cookies
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                   privacy policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>customer</h4>
            <ul>
              <li>
                <Link href="/help">
                   help & support
                </Link>
              </li>
              <li>
                <Link href="/legal-notice">
                   Legal notice
                </Link>
              </li>
              <li>
                <Link href="/contact">
                   contact
                </Link>
              </li>
              <li>
                <Link href="/accessibility-statement">
                   accessibilty statement
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>services</h4>
            <ul>
              <li>
                <Link href="/apply/visa">
                   apply for visa
                </Link>
              </li>
              <li>
                <Link href="/apply/jobs">
                   apply for job
                </Link>
              </li>
              <li>
                <Link href="/apply/visaLoan">
                   apply for loan
                </Link>
              </li>
              <li>
                <Link href="/services">
                   services
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a
                href="https://web.facebook.com/profile.php?id=100085152624717"
                target="blank"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=100085152624717"
                target="blank"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=100085152624717"
                target="blank"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=100085152624717"
                target="blank"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
