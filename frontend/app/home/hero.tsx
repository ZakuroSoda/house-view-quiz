import React from 'react';
import { Link } from "react-router";
import { BiRightArrowAlt, BiHelpCircle, BiCandles } from 'react-icons/bi';

import GoogleSignInButton from './signin/googleSignInButton';

const Hero: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <header className="w-full py-6 px-8 md:px-16 flex items-center justify-between">
        <BiCandles size={24} className="text-violet-600 cursor-pointer" />

        <div className="flex items-center">
          <div className="hidden md:block">
            <GoogleSignInButton onMobile={false}/>
          </div>
          <div className="md:hidden">
            <GoogleSignInButton onMobile={true}/>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 md:py-16 px-8 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Side - Text Content */}
          <div className="w-full md:w-5/12 mb-4 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Know the News? Prove it — Under Pressure.
            </h1>

            <p className="text-md md:text-lg text-gray-600 mb-8">
              Trivia meets risk management in this current affairs quiz that incorporates portfolio management mechanics.
            </p>
            <Link to="/play">
              <button className="bg-violet-600 cursor-pointer hover:bg-violet-700 text-white px-8 py-3 rounded flex items-center justify-center w-full md:w-auto">
                <span>Play this week's game now</span>
                <BiRightArrowAlt className="ml-2" size={20} />
              </button>
            </Link>
          </div>

          {/* Right Side - Illustration */}
          <div className="w-full md:w-6/12 mt-4 md:mt-0">
            <img src="hero.png" alt="Illustration" className="w-full h-auto rounded-lg shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;