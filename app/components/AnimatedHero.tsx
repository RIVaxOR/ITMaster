"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HeroImageSlider from "./HeroImageSlider";

export default function AnimatedHero() {
  const ref = useRef<HTMLDivElement>(null); // Тип для TS
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center min-h-screen"
    >
      <HeroImageSlider />
    </motion.div>
  );
}