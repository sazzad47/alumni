import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer py-5 bg-gray-200 dark:bg-[var(--hero)] text-black dark:text-white">
      <div className="footer_container p-3 pb-0">
        <div className="md:flex">
          <div className="footer-col">
            <h4>website</h4>
            <ul>
              <li>
                <Link href="/about">about us</Link>
              </li>
              <li>
                <Link href="/terms-&-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/cookies">Cookies</Link>
              </li>
              <li>
                <Link href="/privacy-policy">privacy policy</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Browse</h4>
            <ul>
              <li>
                <Link href="/activities">Activities</Link>
              </li>
              <li>
                <Link href="/news">News</Link>
              </li>
              <li>
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href="/gallery">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>quick links</h4>
            <ul>
              <li>
                <Link href="/donate">Donate</Link>
              </li>
              <li>
                <Link href="/payment">Payment</Link>
              </li>
              <li>
                <Link href="/notice">Notice</Link>
              </li>
              <li>
                <Link href="/auth">Login</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a
                className="bg-cyan-500 dark:bg-sky-900 hover:bg-cyan-700 dark:hover:bg-sky-700"
                href="https://www.facebook.com/groups/btrischoolalumni"
                target="blank"
              >
                <i className="text-black dark:text-white fab fa-facebook-f"></i>
              </a>
              <a
                className="bg-cyan-500 dark:bg-sky-900 hover:bg-cyan-700 dark:hover:bg-sky-700"
                href="https://www.facebook.com/groups/btrischoolalumni"
                target="blank"
              >
                <i className="text-black dark:text-white fab fa-twitter"></i>
              </a>
              <a
                className="bg-cyan-500 dark:bg-sky-900 hover:bg-cyan-700 dark:hover:bg-sky-700"
                href="https://www.facebook.com/groups/btrischoolalumni"
                target="blank"
              >
                <i className="text-black dark:text-white fab fa-instagram"></i>
              </a>
              <a
                className="bg-cyan-500 dark:bg-sky-900 hover:bg-cyan-700 dark:hover:bg-sky-700"
                href="https://www.facebook.com/groups/btrischoolalumni"
                target="blank"
              >
                <i className="text-black dark:text-white fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="w-full my-5"/>
        <div className="w-full flex justify-center mt-5 text-sm">{'Copyright © '}{new Date().getFullYear()} BTRI School Alumni Association </div>
      </div>
    </footer>
  );
};

export default Footer;
