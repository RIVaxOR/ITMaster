"use client";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Главная", link: "#" },
    { name: "Сборка", link: "#catalog" },
    { name: "Услуги", link: "#services" },
    { name: "Отзывы", link: "#clients" },
    { name: "Карта", link: "#maps" }
  ];

  const scrollToSection = (link: string) => {
    if (link === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const section = document.querySelector(link);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold">
          <a href="https://t.me/RIVaxOR" target="_blank" rel="noopener noreferrer"
             className="text-cyan-300 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]">
            ITMaster
          </a>
        </div>

        <button className="md:hidden flex flex-col justify-between w-6 h-5" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>

        <nav className={`flex-col md:flex-row md:flex md:items-center absolute md:static top-full left-0 w-full md:w-auto bg-gray-900/80 md:bg-transparent transition-all duration-300 overflow-hidden
        ${menuOpen ? "max-h-96 py-4" : "max-h-0 md:max-h-full"} md:max-h-full`}>
          {navItems.map((item, i) => (
            <a key={i} href={item.link} className="block md:inline-block px-6 py-2 text-white text-base md:text-white transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
               onClick={(e) => {
                 e.preventDefault();
                 setMenuOpen(false);
                 scrollToSection(item.link);
               }}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}