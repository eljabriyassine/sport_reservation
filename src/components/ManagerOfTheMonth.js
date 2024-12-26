"use client";

//default funtion Mnanger
import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import PlaceholderImage from "/public/assets/manager.jpg";

const ManagerOfTheMonth = ({
  manager = {
    name: "John Doe",
    image: PlaceholderImage,
    title: "Manager of the Month",
  },
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="max-w-screen-lg px-8 xl:px-16 mx-auto mt-16" id="manager">
      <ScrollAnimationWrapper>
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8 py-10"
          variants={scrollAnimation}
        >
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            variants={scrollAnimation}
          >
            <Image
              src={manager.image}
              alt={manager.name}
              quality={100}
              width={500}
              height={500}
              className="rounded-sm shadow-lg"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
            variants={scrollAnimation}
          >
            <h2 className="text-3xl font-bold text-gray-800">
              {manager.title}
            </h2>
            <h3 className="text-xl mt-4 text-gray-600">{manager.name}</h3>
            <p className="mt-4 text-black-500">
              Bienvenue au Club de Tennis Agadir Training ! Nous sommes heureux
              de vous accueillir dans notre club charmant situé au cœur d’Agadir
              Bay. En se concentrant sur le développement du tennis chez les
              jeunes et adultes, notre club se distingue en offrant des stages
              de haute qualité pour améliorer les compétences techniques et
              tactiques. Pour les passionnés de tennis, il ne s’agit pas
              seulement d’un simple exercice physique ; il s’agit plutôt d’un
              moment de détente, de socialisation et de plaisir. Cependant, pour
              ceux qui aspirent à améliorer leur jeu, le tennis devient une
              quête constante.
            </p>
          </motion.div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default ManagerOfTheMonth;
