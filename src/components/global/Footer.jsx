import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#001233] text-white py-4 px-20">
      <div className="container mx-auto px-4 md:flex justify-between items-center">
        {/* Logo and brief description */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-[#7D8597]">Financo</h2>
          <p className="mt-2 text-[#979DAC] max-w-xs">
            Your go-to solution for managing personal finance, budgeting, and
            tracking expenses.
          </p>
        </div>

        {/* Links section */}
        <div className="md:flex space-y-4 md:space-y-0 md:space-x-8">
          <div>
            <h3 className="text-lg font-semibold text-[#5C677D]">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/dashboard"
                  className="text-[#979DAC] hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/transactions"
                  className="text-[#979DAC] hover:text-white"
                >
                  Transactions
                </a>
              </li>
              <li>
                <a href="/budget" className="text-[#979DAC] hover:text-white">
                  Budget
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#5C677D]">Resources</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/" className="text-[#979DAC] hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/" className="text-[#979DAC] hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="/" className="text-[#979DAC] hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 md:mt-0">
          <h3 className="text-lg font-semibold text-[#5C677D]">Follow Us</h3>
          <div className="mt-4 flex space-x-6">
            <a href="#" className="text-[#979DAC] hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-[#979DAC] hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-[#979DAC] hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#33415C] mt-4 py-2">
        <p className="text-center text-[#979DAC]">
          © {new Date().getFullYear()} Financo. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
