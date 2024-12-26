"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Testimoni from "./Testimoni";
import ButtonPrimary from "./misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import Map from "/public/assets/map.png";

const Pricing = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="bg-gradient-to-b from-white-300 to-white-500 w-full py-14"
      id="pricing"
    >
      <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed"
            >
              PourQuoi Nous Choiser notre club de tennis ?
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center"
            >
              Nous sommes une école de tennis qui se concentre sur le
              développement du tennis chez les jeunes et adultes
            </motion.p>
          </ScrollAnimationWrapper>
          <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-12 py-8 lg:py-12 px-6 sm:px-0 lg:px-6">
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray-300 shadow-lg rounded-xl bg-white p-10 lg:px-10 xl:px-10"
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.3,
                  },
                }}
              >
                <div className=" text-white text-xl font-bold py-2 px-4 rounded-t-md shadow-md w-full text-center">
                  Encadrement Professionnel
                </div>
                <div className="text-gray-700 text-base font-medium mt-6 leading-relaxed text-center">
                  Découvrez une expérience de tennis exceptionnelle grâce à nos
                  coachs professionnels et expérimentés, nos infrastructures
                  modernes, et notre engagement à vous accompagner dans votre
                  progression. Que vous soyez débutant ou joueur confirmé, nous
                  adaptons nos séances pour répondre à vos besoins.
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray-300 shadow-lg rounded-xl bg-white p-10 lg:px-10 xl:px-10"
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.3,
                  },
                }}
              >
                <div className=" text-white text-xl font-bold py-2 px-4 rounded-t-md shadow-md w-full text-center">
                  Encadrement Professionnel
                </div>
                <div className="text-gray-700 text-base font-medium mt-6 leading-relaxed text-center">
                  Découvrez une expérience de tennis exceptionnelle grâce à nos
                  coachs professionnels et expérimentés, nos infrastructures
                  modernes, et notre engagement à vous accompagner dans votre
                  progression. Que vous soyez débutant ou joueur confirmé, nous
                  adaptons nos séances pour répondre à vos besoins.
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray-300 shadow-lg rounded-xl bg-white p-10 lg:px-10 xl:px-10"
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.3,
                  },
                }}
              >
                <div className=" text-white text-xl font-bold py-2 px-4 rounded-t-md shadow-md w-full text-center">
                  Encadrement Professionnel
                </div>
                <div className="text-gray-700 text-base font-medium mt-6 leading-relaxed text-center">
                  Découvrez une expérience de tennis exceptionnelle grâce à nos
                  coachs professionnels et expérimentés, nos infrastructures
                  modernes, et notre engagement à vous accompagner dans votre
                  progression. Que vous soyez débutant ou joueur confirmé, nous
                  adaptons nos séances pour répondre à vos besoins.
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
          </div>
        </div>
        <div className="flex flex-col w-full my-16">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed w-9/12 sm:w-6/12 lg:w-4/12 mx-auto"
            >
              Huge Global Network of
            </motion.h3>
            <motion.p
              className="leading-normal  mx-auto my-2 w-10/12 sm:w-7/12 lg:w-6/12"
              variants={scrollAnimation}
            >
              We provide information about the features of the VPN services that
            </motion.p>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper>
            <motion.div
              className="py-12 w-full px-8 mt-16"
              variants={scrollAnimation}
            >
              <div className="w-full h-[500px] relative z-0">
                <Image src={Map} alt="Map" />
              </div>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
        <div className="flex flex-col w-full my-16" id="testimoni">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto"
            >
              Trusted by Thousands of Happy Customer{" "}
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12"
            >
              These are the stories of our customers who have joined us with
              great pleasure when using this crazy feature.
            </motion.p>
          </ScrollAnimationWrapper>
          {/* <ScrollAnimationWrapper className="w-full flex flex-col py-12">
            <motion.div variants={scrollAnimation}>
              <Testimoni />
            </motion.div>
          </ScrollAnimationWrapper> */}
          {/* <ScrollAnimationWrapper className="relative w-full mt-16">
            <motion.div variants={scrollAnimation} custom={{ duration: 3 }}>
              <div className="absolute rounded-xl  py-8 sm:py-14 px-6 sm:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center z-10 bg-white-500">
                <div className="flex flex-col text-left w-10/12 sm:w-7/12 lg:w-5/12 mb-6 sm:mb-0">
                  <h5 className="text-black-600 text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium">
                    Subscribe Now for <br /> Get Special Features!
                  </h5>
                  <p>Let's subscribe with us and find the fun.</p>
                </div>
                <ButtonPrimary>Get Started</ButtonPrimary>
              </div>
              <div
                className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0"
                style={{ filter: "blur(114px)" }}
              ></div>
            </motion.div>
          </ScrollAnimationWrapper> */}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
