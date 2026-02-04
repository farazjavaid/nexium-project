"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedTriangles from "./AnimatedTriangles";
import AnimatedTrianglesSlide3 from "./AnimatedTrianglesSlide3";
import Slide4Decorations from "./Slide4Decorations";
import Slide5Decorations from "./Slide5Decorations";

interface LandingHeroSectionProps {
  heading: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
  onSlideChange?: (slide: number) => void;
}

export default function LandingHeroSection({
  heading,
  description,
  buttonText = "GET A QUOTE",
  buttonLink,
  onButtonClick,
  showButton = true,
  onSlideChange,
}: LandingHeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0); // 0, 1, 2, 3, 4, 5
  const onSlideChangeRef = useRef(onSlideChange);

  // Update ref when callback changes
  useEffect(() => {
    onSlideChangeRef.current = onSlideChange;
  }, [onSlideChange]);

  // Notify parent when slide changes
  

  useEffect(() => {
    onSlideChangeRef.current?.(currentSlide);
  }, [currentSlide]);

  // Handle slide transitions
  useEffect(() => {
    // Different durations for each slide
    const slideDurations = [
      4000,  // Slide 0 (DIGITAL SOLUTIONS): 4s
      600,   // Slide 1 (empty white transition): 0.6s
      4000,  // Slide 2 (YOUR NEXT PREMIUM - teal): 4s
      600,   // Slide 3 (animated circle - teal): 0.6s
      4000,  // Slide 4 (WE DELIVER - light gray): 4s
      2000,   // Slide 5 (transition - light gray): 0.6s
    ];

    const timeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % 6);
    }, slideDurations[currentSlide]);

    return () => clearTimeout(timeout);
  }, [currentSlide]);

  return (
    <motion.section
      className="w-full min-h-screen flex items-center relative overflow-hidden"
      animate={{
        backgroundColor:
          currentSlide === 2 || currentSlide === 3 ? "#267275" : // Teal
          currentSlide === 4 || currentSlide === 5 ? "#f3f3f3" : // Light gray
          "#FFFFFF" // White
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Slide 1 Triangles (4 dark triangles) */}
      <motion.div
        animate={{ opacity: currentSlide === 0 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatedTriangles />
      </motion.div>

      {/* Slide 3 & 4 Triangles (12 white triangles) */}
      <motion.div
        animate={{ opacity: (currentSlide === 2 || currentSlide === 3) ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatedTrianglesSlide3 />
      </motion.div>

      {/* Slide 4 Circular Element */}
      <motion.div
        animate={{
          opacity: currentSlide === 3 ? 1 : 0,
          scale: currentSlide === 3 ? 1.2 : 0.5
        }}
        transition={{
          duration: 1,
          ease: [0.68, -0.55, 0.27, 1.55] // Ease in and out back (bouncy)
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none z-10"
      >
        <div
          className="w-full h-full rounded-full bg-white"
          style={{
            filter: "blur(100px)"
          }}
        />
      </motion.div>

      {/* Slide 1 Text - "DIGITAL SOLUTIONS that drive business" */}
      <motion.div
        animate={{
          x: currentSlide === 0 ? 0 : -745,
          opacity: currentSlide === 0 ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute left-1/2 top-[189px] -translate-x-1/2 text-[75px] text-[#353638] uppercase whitespace-nowrap font-montserrat font-normal"
      >
        {/* DIGITAL SOLUTIONS */}
        <div className="absolute left-[calc(50%-309px)] top-[49px] flex flex-col justify-center">
          <p className="leading-[98px] tracking-tight">Digital Solutions</p>
        </div>

        {/* THAT DRIVE */}
        <div className="absolute left-[calc(50%-408px)] top-[149px] flex flex-col justify-center">
          <p className="leading-[98px] tracking-tight">that drive</p>
        </div>

        {/* BUSINESS */}
        <div className="absolute left-[calc(50%-209px)] top-[245px] flex flex-col justify-center">
          <p className="leading-[98px] tracking-tight">business</p>
        </div>
      </motion.div>

      {/* Slide 3 Text - "YOUR NEXT PREMIUM SOFTWARE SOLUTION" */}
      <motion.div
        animate={{
          x: currentSlide === 2 ? 0 : (currentSlide === 0 || currentSlide === 1 ? 745 : -745),
          opacity: currentSlide === 2 ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[75px] text-white uppercase font-montserrat font-normal"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="leading-[98px] tracking-tight whitespace-nowrap text-start w-full">Your Next</p>
          <p className="leading-[98px] tracking-tight whitespace-nowrap text-center">Premium</p>
          <p className="leading-[98px] tracking-tight whitespace-nowrap text-center">Software Solution</p>
        </div>
      </motion.div>

      {/* Slide 4 Decorations */}
      <motion.div
        animate={{
          opacity: currentSlide === 4 ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <Slide4Decorations />
      </motion.div>

      {/* Slide 4 Text - "WE DELIVER..." */}
      <motion.div
        animate={{
          x: currentSlide === 4 ? 0 : -745,
          opacity: currentSlide === 4 ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#353638] uppercase font-montserrat font-normal"
      >
        <div className="flex flex-col items-center text-center">
          {/* WE DELIVER */}
          <p className="text-[75px] leading-[98px] tracking-tight text-start w-full pl-24">We deliver</p>

          {/* PREMIUM WEBSITES */}
          <p className="text-[75px] leading-[98px] tracking-tight">premium websites</p>

          {/* & DIGITAL SYSTEMS */}
          <p className="text-[75px] leading-[98px] tracking-tight text-end w-full mr-[-120px]">& digital systems</p>
        </div>
      </motion.div>

      {/* Slide 5 Decorations - no text, no Polygon 1, no Group 14 */}
      <motion.div
        animate={{
          opacity: currentSlide === 5 ? 1 : 0,
          scale: currentSlide === 5 ? 1 : 0.95
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <Slide5Decorations />
      </motion.div>
    </motion.section>
  );
}
