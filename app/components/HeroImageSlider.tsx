"use client";
import { useState, useEffect } from "react";

const images = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
];

export default function HeroImageSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      className="relative w-full max-w-xl mx-auto aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Сборка ПК ${index + 1}`}
          onClick={nextSlide}
          className={`absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl cursor-pointer
            transition-opacity duration-1000 ease-in-out
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        />
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-12 h-12 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition"
        aria-label="Предыдущий слайд"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-12 h-12 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition"
        aria-label="Следующий слайд"
      >
        ›
      </button>

      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full cursor-pointer transition-all duration-300
              ${index === current
                ? "bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                : "bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}