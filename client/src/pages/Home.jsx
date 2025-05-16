import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { FaHelmetSafety } from "react-icons/fa6";
import { Link } from 'react-router-dom';

import useTitle from '../components/useTitle';

const Home = () => {

  const objectives = [
    {
      icon: FaClock,
      title: "Self-paced learning",
      description: "Learn anytime, anywhere with just an internet connection. Our platform lets you study at your own pace, no matter where you are, with complete flexibility."
    },
    {
      icon: FaLightbulb,
      title: "Enhance retention",
      description: "Engage with immersive 3D experiences that reinforce key concepts, making it easier to retain and recall information through hands-on interaction and visual learning methods."
    },
    {
      icon: FaHandshake,
      title: "Bridge gaps",
      description: "Turn theoretical concepts into practical experiences with our platform, which prepares you for real-world challenges by connecting academic learning with real-life application."
    },
    {
      icon: FaHelmetSafety,
      title: "Safe education",
      description: "Learn safely in a controlled environment where theoretical concepts are transformed into experiences, allowing you to practice and gain skills without exposure to real-world risks."
    }
  ];

  useTitle("eNSAYO")

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center flex items-center justify-center bg-[url('/public/assets/home/background.png')]">
        <div className="text-center text-white px-4">
          <motion.h1 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="font-sf-bold text-6xl md:text-7xl lg:text-8xl font-bold px-4 max-w-8xl mx-auto"
          >
            The new era of
          </motion.h1>
          <motion.h1 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="font-sf-bold text-6xl md:text-7xl lg:text-8xl font-bold px-4 max-w-8xl mx-auto"
          >
            <span className='text-[#f5de8a]'>tech-voc</span> education
          </motion.h1>
          <motion.p 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-is-regular text-lg lg:text-xl md:text-xl mb-8 px-4 md:px-8 max-w-2xl mx-auto mt-4"
          >
             Explore immersive experiences that redefine how skills are taught and mastered, preparing you for the 
             future of tech-voc education and beyond.
          </motion.p>
          <Link to="/login">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-is-regular text-xl md:text-xl lg:text-2xl bg-[#94C4F1] hover:bg-[#a5d3ff] text-[#1c3772] font-semibold py-4 md:py-4 lg:py-4 px-12 rounded-lg inline-flex items-center mt-12"
            >
              Join for free!
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-12 md:py-24 bg-cover bg-center bg-[url('/public/assets/home/noise-bg.png')]">
        <div className="container mx-auto px-4">
          <div className="text-center">
          <motion.h2 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="font-sf-regular font-bold text-4xl md:text-6xl lg:text-7xl pt-12 mb-4 text-[#264085]">
              What we strive for
          </motion.h2>
          </div>
          <div className="flex justify-center text-center mb-12">
          <motion.h2 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="font-is-regular font-medium text-lg md:text-xl lg:text-2xl w-2/3 mb-4 md:pb-8 lg:pb-8 text-[#264085]">
              Here in eNSAYO, we are committed to empowering learners through flexible, immersive, and practical experiences.
          </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-16 lg:px-72 pb-12">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <motion.div
                  key={index}
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white p-12 rounded-lg shadow-lg aspect-[1.2/1] flex flex-col items-start justify-center ${index === 1 || index === 3 ? 'mt-6' : ''}`}
                >
                  <Icon className="text-5xl text-[#264085] mb-8" />
                  <div className="flex flex-col mb-4">
                    <h3 className="font-sf-light text-3xl lg:text-3xl font-semibold text-[#264085]">{objective.title}</h3>
                  </div>
                  <p className="font-is-regular font-medium text-[#264085] lg:mt-4">{objective.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 lg:py-24 md:py-18 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <motion.h2 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="font-sf-regular text-4xl md:text-3xl lg:text-5xl font-bold lg:mb-8 text-[#264085] text-center lg:text-left">
              Raising tech-voc professionals
            </motion.h2>
            <motion.p 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="font-is-regular font-medium text-[#264085] mb-8 py-4 text-center lg:text-left text-lg lg:pr-24 px-8 lg:px-0">
                In the Philippines, Technical-Vocational Education and Training (TVET) has played a crucial role in improving job security for millions of Filipinos.
                Through eNSAYO, we aim to leverage innovative learning methods, including <strong>3D models and simulations </strong>
                to increase these current numbers:
              </motion.p>
              <div className="flex flex-row gap-x-2 justify-center md:justify-center lg:justify-start lg:px-0 px-4">
                {[
                  { number: '1,231,284', description: 'TVET Graduates last 2022' },
                  { number: '6,599,645', description: 'enrolled in TVET Online Program' }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-[#D2E8FD] p-6 rounded-lg shadow-md w-64 flex flex-col justify-center"
                  >
                    <h3 className="font-sf-regular text-2xl md:text-3xl font-bold text-[#264085] mb-2">{stat.number}</h3>
                    <p className="text-[#264085] font-is-regular">{stat.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <motion.img 
                src="/assets/home/hero.jpg" 
                alt="Statistics" 
                className="rounded-lg shadow-lg w-full"
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-cover bg-center bg-[url('/public/assets/home/noise-bg-1.png')]">
        <div className="container mx-auto px-4">
          <div className="flex justify-center container mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="flex w-full lg:w-1/2 lg:pr-4 mb-8 lg:mb-0 justify-center p-8 lg:p-0">
                <motion.img 
                  src="/assets/home/ar-feature.png" 
                  alt="Features" 
                  className="w-full"
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex flex-col w-full lg:w-1/2 lg:pl-12 justify-center items-center md:justify-start md:items-start lg:justify-start lg:items-start">
                <motion.h2 
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="px-6 lg:px-0 text-center text-4xl lg:text-5xl font-sf-bold mb-4 bg-gradient-to-r from-[#3763A6] to-[#284F88] bg-clip-text text-transparent"
                >
                  Interactive 3D Models
                </motion.h2>
                <motion.p 
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[#264085] mb-8 px-12 lg:px-0 text-center text-lg lg:text-left md:text-left lg:w-96 lg:mt-4 font-is-regular font-medium"
                >
                  Experience interactive learning with 3D models that you can rotate 360 degrees and view in augmented reality.
                </motion.p>
              </div>
            </div>
          </div>

          <div className="flex justify-center container mx-auto">
            <div className="flex flex-col lg:flex-row-reverse items-center">
              <div className="flex w-full lg:w-1/2 lg:pr-4 mb-8 lg:mb-0 justify-center p-8 lg:p-0">
                <motion.img 
                  src="/assets/home/sims.png" 
                  alt="Features" 
                  className="w-full"
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex flex-col w-full lg:w-1/2 lg:pr-12 justify-center items-center md:justify-start md:items-start lg:justify-start lg:items-start">
                <motion.h2 
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="px-6 lg:px-0 text-center text-4xl lg:text-4xl font-sf-bold mb-4 text-[#264085] lg:text-left md:text-left bg-gradient-to-r from-[#3763A6] to-[#284F88] bg-clip-text text-transparent"
                >
                  Simulations powered by game engine
                </motion.h2>
                <motion.p 
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-[#264085] mb-8 px-12 lg:px-0 text-center text-lg lg:text-left md:text-left lg:w-96 lg:mt-4 font-is-regular font-medium"
                >
                  Engage in realistic, interactive simulations crafted with advanced game engine technology, offering immersive and dynamic scenarios to enhance learning.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

