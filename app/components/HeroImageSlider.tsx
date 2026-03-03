"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
    setPaused(true); // пауза при свайпе
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || touchStartY === null) return;

    const diffX = touchStart - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    // Игнорируем вертикальные свайпы
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }

    setTouchStart(null);
    setTouchStartY(null);
    setPaused(false);
  };

  // Автопереключение
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full max-w-xl mx-auto aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Слайды */}
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={`Сборка ПК ${index + 1}`}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          onClick={nextSlide}
          className={`absolute inset-0 object-cover rounded-2xl shadow-2xl cursor-pointer
            transition-opacity duration-1000 ease-in-out
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        />
      ))}

      {/* Стрелки */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
        aria-label="Предыдущий слайд"
      >
        ‹
      </button>
      
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
        aria-label="Следующий слайд"
      >
        ›
      </button>

      {/* Точки */}
      <div className="absolute bottom-4 w-full flex justify-center gap-3 md:gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-4 h-4 md:w-3 md:h-3 rounded-full cursor-pointer transition-all duration-300
              ${index === current
                ? "bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                : "bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}