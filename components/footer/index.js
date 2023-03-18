import { Dialog, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "next-themes";
import SocialLinks from "./SocialLinks";
import { getData } from "../../utils/fetchData";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import { Context } from "../../store/store";

const Footer = () => {
  const { state } = useContext(Context);
  const { auth } = state;
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    let isCanceled = false;

    const fetchData = async () => {
      if (!isCanceled) {
        const res = await getData("admin/socialLinks");
        setData(res.content);
      }
    };
    fetchData();
    return () => {
      isCanceled = true;
    };
  }, []);

  return (
    <footer className="footer py-5 bg-green-900 dark:bg-zinc-700 text-slate-200">
      <div className="footer_container p-3 pb-0">
        <div className="md:flex">
          <div className="footer-col">
            <h4>website</h4>
            <ul className="list-none p-0">
              <li className="mb-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/about/association"
                >
                  About us
                </Link>
              </li>
              <li className="my-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/terms-&-conditions"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li className="my-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/cookies"
                >
                  Cookies
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/privacy-policy"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Browse</h4>
            <ul className="list-none p-0">
              <li className="mb-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/activities"
                >
                  Activities
                </Link>
              </li>
              <li className="my-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/news"
                >
                  News
                </Link>
              </li>
              <li className="my-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/events/past"
                >
                  Events
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/gallery"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>quick links</h4>
            <ul className="list-none p-0">
              <li className="mb-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/donate"
                >
                  Donate
                </Link>
              </li>
              <li className="my-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/renew-membership"
                >
                  Renew Membership
                </Link>
              </li>
              <li className="my-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/notice"
                >
                  Notice
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  className="no-underline  text-inherit hover:opacity-[0.8]"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="relative">
              follow us
              {auth?.user?.role === "admin" && (
                <>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={handleOpenDialog}
                      className="absolute right-[-4rem] top-[-0.5rem]"
                    >
                      <EditIcon className="text-white" />
                    </IconButton>
                  </Tooltip>
                  <Dialog
                    sx={{
                      "& .MuiDialog-paper": {
                        backgroundColor:
                          currentTheme === "dark"
                            ? "rgb(63 63 70)"
                            : "rgb(203 213 225)",

                        width: "25rem",
                        minHeight: "12rem",
                      },
                    }}
                    onClose={handleCloseDialog}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                  >
                    <SocialLinks
                      data={data}
                      setData={setData}
                      handleCloseDialog={handleCloseDialog}
                    />
                  </Dialog>
                </>
              )}
            </h4>
            <div className="flex gap-3 items-center">
              {data?.map((item, i) => {
                let link = item.domain + item.username;
                let icons = [
                  {
                    id: 1,
                    domain: "https://www.facebook.com/",
                    icon: <FaFacebookF className="text-lg" />,
                  },
                  {
                    id: 2,
                    domain: "https://www.instagram.com/",
                    icon: <FaInstagramSquare className="text-lg" />,
                  },
                  {
                    id: 3,
                    domain: "https://www.linkedin.com/",
                    icon: <FaLinkedinIn className="text-lg" />,
                  },
                  {
                    id: 4,
                    domain: "https://twitter.com/",
                    icon: <FaTwitterSquare className="text-lg" />,
                  },
                  {
                    id: 5,
                    domain: "https://www.youtube.com/",
                    icon: <FaYoutube className="text-lg" />,
                  },
                ];
                return (
                  <IconButton
                    key={i}
                    onClick={() => window.open(link, "_self")}
                    className="focus:outline-none bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 w-[35px] h-[35px] text-slate-200 z-[20]"
                  >
                    {
                      icons.find(
                        (domainIcon) => domainIcon.domain === item.domain
                      )?.icon
                    }
                  </IconButton>
                );
              })}
            </div>
          </div>
        </div>
        <hr className="w-full my-5" />
        <div className="w-full flex justify-center mt-5 text-sm">
          {/* {"Copyright © "}
          {new Date().getFullYear()} BTRI School Alumni Association{" "} */}
          Designed and developed by Sazzad Hossen
        </div>
      </div>
    </footer>
  );
};

export default Footer;
