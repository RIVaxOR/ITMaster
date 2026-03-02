// components/BuildModal.jsx
"use client";
import React from "react";

export default function BuildModal({ build, onClose }) {
  if (!build) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-3xl max-w-3xl w-full p-6 relative shadow-lg">
        {/* Закрыть */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-cyan-400"
        >
          &times;
        </button>

        {/* Изображение */}
        <div className="h-80 w-full mb-6 overflow-hidden rounded-2xl">
          <img
            src={build.modalImg || build.img}
            alt={build.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Текст */}
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">{build.name}</h2>
        <div className="text-gray-300 mb-4">
          {build.desc.split(", ").map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        <p className="text-xl font-bold text-white mb-6">{build.price}</p>

        {/* Кнопка */}
        <button
          onClick={() => window.open("https://t.me/RIVaxOR", "_blank")}
          className="w-full py-3 rounded-xl font-semibold text-white bg-cyan-500/20 backdrop-blur-lg hover:bg-cyan-500/40 transition hover:scale-105"
        >
          Заказать сборку
        </button>
      </div>
    </div>
  );
}