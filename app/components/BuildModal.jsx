"use client";
import React, { useEffect } from "react";

export default function BuildModal({ build, onClose }) {

  // Закрытие по ESC (ПК)
  useEffect(() => {
    if (!build) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [build, onClose]);

  // Блокировка скролла страницы
  useEffect(() => {
    if (!build) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [build]);

  if (!build) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-900/95 border border-white/10 rounded-3xl 
                   max-w-3xl w-full 
                   max-h-[90vh] overflow-y-auto 
                   p-6 md:p-8 shadow-2xl"
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-cyan-400 transition"
        >
          ×
        </button>

        {/* Изображение */}
        <div className="aspect-video w-full mb-6 overflow-hidden rounded-2xl">
          <img
            src={build.modalImg || build.img}
            alt={build.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Название */}
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-4">
          {build.name}
        </h2>

        {/* Описание */}
        <div className="text-gray-300 mb-6 space-y-1">
  {(build.fullDesc || build.desc).split(". ").map((item, i) => (
    <p key={i}>{item.trim()}.</p>
  ))}
</div>

        {/* Цена */}
        <p className="text-xl md:text-2xl font-bold text-white mb-6">
          {build.price}
        </p>

        {/* Кнопка */}
        <button
          onClick={() => window.open("https://t.me/RIVaxOR", "_blank")}
          className="w-full py-3 md:py-4 rounded-xl font-semibold text-white 
                     bg-cyan-500/20 border border-cyan-400/30
                     backdrop-blur-lg transition-all duration-300
                     hover:bg-cyan-500/40 hover:scale-[1.02]
                     hover:shadow-[0_0_20px_rgba(0,255,255,0.7)]"
        >
          Заказать сборку
        </button>
      </div>
    </div>
  );
}