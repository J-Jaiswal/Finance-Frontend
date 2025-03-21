const Footer = () => {
  return (
    <footer className="bg-[#001233] text-white py-8 px-4 md:px-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo and description */}
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-xl font-bold text-[#7D8597]">Financo</h2>
          <p className="mt-2 text-[#979DAC] max-w-md">
            Your go-to solution for managing personal finance, budgeting, and
            tracking expenses.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-auto text-left">
          <h3 className="text-lg font-semibold text-[#5C677D]">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/dashboard" className="text-[#979DAC] hover:text-white">
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
      </div>

      {/* Footer bottom */}
      <div className="border-t border-[#33415C] mt-8 pt-4">
        <p className="text-center text-[#979DAC] text-sm">
          © {new Date().getFullYear()} Financo. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
