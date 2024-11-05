import React from "react";
import LogoTrip from "../../ui/logoTripvel";
import Link from "next/link";
import { Icon } from "@iconify/react";
import AppStoreDownload from "../../icon/downloadAppStore";
import PlayStoreDownload from "../../icon/downloadPlaySote";

const Footer = () => {
  return (
    <footer className="bg-secondary">
      <div className="mx-auto container px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="items-center flex justify-center sm:justify-start">
              <LogoTrip />
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
              consequuntur amet culpa cum itaque neque.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Our Services</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    Term & Conditions
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    Blog
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Contact Us</p>

              <ul className="mt-8 space-y-4 text-sm flex flex-col justify-center items-center sm:justify-start sm:items-start">
                <li className="">
                  <Link
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="#"
                  >
                    <Icon icon="ic:outline-email" />
                    <span className="flex-1 text-gray-700">tripvel@com</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="#"
                  >
                    <Icon icon="iconoir:phone" />
                    <span className="flex-1 text-gray-700">0123456789</span>
                  </Link>
                </li>

                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  <Icon icon="proicons:location" />
                  <address className="-mt-0.5 flex-1 not-italic text-gray-700">
                    Jakarta, Indonesia
                  </address>
                </li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Download App</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="items-center flex justify-center sm:justify-start"
                  >
                    <AppStoreDownload />
                  </Link>
                </li>

                <li>
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="items-center flex justify-center sm:justify-start"
                  >
                    <PlayStoreDownload />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200">
          <div className="grid justify-center pt-6 lg:justify-between">
            <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
              <span>©2024 All rights reserved</span>
              <Link rel="noopener noreferrer" href="/privacy-policy">
                <span>Privacy policy</span>
              </Link>
              <Link rel="noopener noreferrer" href="/terms-of-service">
                <span>Terms of service</span>
              </Link>
            </div>
            <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
              <Link
                href="https://www.google.com"
                className="flex items-center justify-center w-10 h-10 rounded-full"
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="mdi:instagram" />
              </Link>
              <Link
                href="https://www.google.com"
                className="flex items-center justify-center w-10 h-10 rounded-full"
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="mdi:facebook" />
              </Link>
              <Link
                href="https://www.google.com"
                className="flex items-center justify-center w-10 h-10 rounded-full"
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="mdi:youtube" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
