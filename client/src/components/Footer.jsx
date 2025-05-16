import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-4 w-full bottom-0 mt-auto">
      <div className="container mx-auto px-4 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 gap-x-16">
          <div className="flex flex-col items-center md:items-start mt-8">
          <img src='/assets/ensayo-nav.png' alt="TESDA Logo" className="h-6 md:h-8 lg:h-8 my-3 md:my-5" /> 
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm md:text-base font-sf-light text-center md:text-right lg:mt-12 md:mt-12">
              © {new Date().getFullYear()} eNSAYO. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
