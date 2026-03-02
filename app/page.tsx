"use client"; 
import { useRef, useEffect, useState} from "react";
import { motion, useInView } from "framer-motion";
import HeroImageSlider from "./components/HeroImageSlider"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import BuildModal from "./components/BuildModal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const builds = [
  { name: "Бюджетный ПК", price: "до 30 000 ₽", desc: "Для работы и лёгких игр", img: "/images/Eco.png" },
  { name: "Средний ПК", price: "до 100 000 ₽", desc: "Для современных игр и работы", img: "/images/Sred.png" },
  { name: "Премиум ПК", price: "от 100 000 ₽", desc: "Для графики, видео и топ-игр", img: "/images/Prem.png" },
];


const advantages = [
  "Опыт более 20 лет",
  "Полное стресс-тестирование",
  "Поддержка после сборки",
  "Быстрая доставка",
  "Гарантия на все комплектующие"
];

const reviews = [
  { stars: "⭐⭐⭐⭐⭐", text: "Очень быстро и качественно выполнена работа. Рекомендую, надежно и профессионально 👌", author: "Sofya Berezina" },
  { stars: "⭐⭐⭐⭐⭐", text: "Подбор комплектующих и сборку ПК Игорь выполнил качественно и в кратчайший срок. Рекомендую данного специалиста.", author: "Михаил Т." },
  { stars: "⭐⭐⭐⭐⭐", text: "Отличный специалист. Vini vidi vici, пришёл, увидел, собрал. Когда надумаю, что-либо менять, обязательно обращусь к Игорю.", author: "Евгений Щ." },
  { stars: "⭐⭐⭐⭐⭐", text: "Хороший специалист!", author: "Мария М." },
  { stars: "⭐⭐⭐⭐⭐", text: "Мастер своего дела, быстро и качественно выполнил свою работу, рекомендую к сотрудничеству!", author: "Иван Вингерт" },
  { stars: "⭐⭐⭐⭐⭐", text: "Мастер высшего класса. Про UpG мой комп, устранил косяки прежней сборки. Грамотно организовал кабель-менеджмент. Цена адекватная. Всем советую. Буду еще обращаться за консультацией. Еще раз, Игорю респект!", author: "Аскат Имангазиевь" },
];

export default function Page() {
  const mapRef = useRef(null);
  const [activeBuild, setActiveBuild] = useState(null);

  // ЗАГРУЗКА КАРТЫ через скрипт Яндекс.Карт
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    script.async = true;
    script.onload = () => {
      (window as any).ymaps.ready(() => {
        const map = new (window as any).ymaps.Map(mapRef.current, {
          center: [60.058280, 30.271110],
          zoom: 16,
          controls: ["zoomControl"],
        });

        const placemark = (window as any).ymaps.Placemark(
          [60.058280, 30.271110],
          {
            balloonContent:
              "Санкт-Петербург, Суздальское шоссе, 28к2, подъезд 1<br>Телефон: +7 965 052-73-75",
          },
          {
            preset: "islands#redIcon",
            iconColor: "#FF0000",
            iconSize: [50, 50],
          }
        );

        map.geoObjects.add(placemark);
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white font-sans">

      {/* ВЕРХНЯЯ ПОЛОСА с ITMaster */}
      <header className="fixed w-full z-50 backdrop-blur-md bg-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold">
  <a
    href="https://t.me/RIVaxOR"
    target="_blank"
    rel="noopener noreferrer"
    className="text-cyan-300 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]"
  >
    ITMaster
  </a>
</div>
          <nav className="space-x-6">
  {[
  { name: "Главная", link: "#" },
  { name: "Сборка", link: "#catalog" },
  { name: "Услуги", link: "#services" },
  { name: "Отзывы", link: "#clients" },
  { name: "Компания", link: "#company" }
].map((item, i) => (
  <a
    key={i}
    href={item.link}
    className="relative text-white transition duration-300
      hover:text-cyan-400
      hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]
      after:absolute after:left-0 after:-bottom-1
      after:w-0 after:h-[2px]
      after:bg-cyan-400
      after:transition-all after:duration-300
      hover:after:w-full"
    onClick={(e) => {
      e.preventDefault(); // отключаем стандартное поведение ссылки

      if (item.name === "Главная") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      if (item.name === "Услуги") {
        const section = document.getElementById("services");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
      if (item.name === "Сборка") {
      const section = document.getElementById("catalog");
      if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    }}
  >
    {item.name}
  </a>
))}
</nav>
        </div>
      </header>

      {/* КНОПКА НАПИСАТЬ В ТЕЛЕГРАМ, Сборка ПК на заказ */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 pt-36 pb-21 px-6">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold mb-4 text-white"
          >
            Сборка ПК<br /> на заказ
          </motion.h1>
          <p className="text-gray-300 text-lg mb-6">
            Сборки для любых задач — от работы до топовых игр. Аккуратный кабель-менеджмент, стресс-тесты и гарантия качества.
          </p>
          <a href="https://t.me/RIVaxOR" target="_blank" rel="noopener noreferrer">
           <button className="relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden
bg-cyan-500/20 border border-cyan-400/40
shadow-lg transition-all duration-300
hover:scale-105
hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]">
             <span className="relative z-10">Написать в Telegram</span>
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300"></div>
           </button>
          </a>
        </div>
        <div className="flex-1">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl h-80 overflow-hidden shadow-lg border border-white/20">
            <HeroImageSlider />
          </div>
        </div>
      </section>

      {/* ВЫБЕРИТЕ ГОТОВУЮ СБОРКУ */}
<section
  id="catalog"
  className="bg-gray-800/50 relative max-w-full pt-21 pb-21 px-6"
>
  <div className="max-w-7xl mx-auto">
    {/* Заголовок */}
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl py-6 mb-16 shadow-lg">
      <div className="px-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Выберите готовую сборку
        </h2>
      </div>
    </div>

    {/* Слайдер */}
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={24}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {[
        { img: "/images/Eco.png", name: "Бюджет", desc: "Intel Core i3-12100, Intel UHD Graphics 730, DDR4 8GB, SSD 256GB", price: "₽30 000", modalImg: "/images/Eco_large.png" },
        { img: "/images/Sred.png", name: "Офис", desc: "Intel Core i5 14100, Intel UHD Graphics 730, DDR4 16GB, SSD 512GB", price: "₽50 000", modalImg: "/images/Sred_large.png" },
        { img: "/images/Prem.png", name: "Дом", desc: "Intel Core i7-12700KF, RTX 4060, DDR5 16GB, SSD 1024GB", price: "₽70 000", modalImg: "/images/Prem_large.png" },
        { img: "/images/Eco.png", name: "Игры v1.0", desc: "Intel Core i3 14100f, RTX 5050 8GB, DDR4 16GB, SSD 512GB", price: "₽100 000", modalImg: "/images/Eco_large.png" },
        { img: "/images/Sred.png", name: "Игры v2.0", desc: "Intel Core i3 14100f, RTX 5050 8GB, DDR4 16GB, SSD 512GB", price: "₽130 000", modalImg: "/images/Sred_large.png" },
        { img: "/images/Prem.png", name: "Игры v3.0", desc: "Intel Core i3 14100f, RTX 5050 8GB, DDR4 16GB, SSD 512GB", price: "₽180 000", modalImg: "/images/Prem_large.png" },
      ].map((b, i) => (
        <SwiperSlide key={i}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="relative w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden cursor-pointer group border border-white/20"
          >
            {/* Картинка */}
            <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
              <img
                src={b.img}
                alt={b.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
              />
            </div>

            {/* Текст */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-cyan-300">{b.name}</h3>
              <p className="text-gray-300 mb-2">
                {b.desc.split(", ").map((item, idx) => (
                  <span key={idx}>
                    {item}
                    <br />
                  </span>
                ))}
              </p>
              <p className="text-lg font-bold text-white">{b.price}</p>
              
              {/* Кнопка Подробнее */}
              <button
                onClick={() => setActiveBuild(b)}
                className="mt-4 w-full bg-white/20 backdrop-blur-lg hover:bg-cyan-500/30 text-white py-3 rounded-xl font-semibold shadow-lg transition hover:scale-105"
              >
                Подробнее
              </button>
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Модальное окно */}
    <BuildModal build={activeBuild} onClose={() => setActiveBuild(null)} />
  </div>
</section>

       {/* УСЛУГИ */}
<section id="services" className="max-w-7xl mx-auto pt-21 pb-21 px-6">
  <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl py-6 mb-12 shadow-lg">
    <div className="px-6">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Услуги
      </h2>
    </div>
  </div>

  <div className="grid md:grid-cols-3 gap-8">
    {[
      { title: "Сборка ПК", desc: "От бюджетного до премиум класса, с аккуратным кабель-менеджментом" },
      { title: "Апгрейд ПК", desc: "Установка новых комплектующих, увеличение производительности ПК" },
      { title: "Тестирование и стресс-тесты", desc: "Проверка стабильности работы системы под нагрузкой" },
      { title: "Оптимизация ПО", desc: "Установка Windows, драйверов и программ для стабильной работы" },
      { title: "Консультации и подбор комплектующих", desc: "Помощь в подборе компонентов под ваши задачи и бюджет" },
      { title: "Доставка и сборка на месте", desc: "Сборка и настройка ПК у вас дома или в офисе" },
    ].map((service, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.2 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-cyan-400/50 transition cursor-pointer"
      >
        <h3 className="text-xl font-semibold mb-2 text-cyan-300">{service.title}</h3>
        <p className="text-gray-300">{service.desc}</p>
      </motion.div>
    ))}
  </div>
</section>

      {/* ПОЧЕМУ ВЫБИРАЮТ МЕНЯ */}
<section
  className="bg-gray-800/50 relative max-w-full pt-21 pb-21 px-6 mb-16"
>
  <div className="max-w-7xl mx-auto">
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl py-6 mb-16 shadow-lg">
      <div className="px-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Почему выбирают меня
        </h2>
      </div>
    </div>

    <div className="grid md:grid-cols-5 gap-8 text-center">
      {advantages.map((a, i) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { margin: "-100px" });
        const delay = (advantages.length - 1 - i) * 0.7;
        return (
          <motion.div
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
            transition={isInView ? { duration: 0.5, delay } : { duration: 0.2 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-cyan-400/50 transition"
          >
            <p className="font-semibold text-white">{a}</p>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

      {/* ОТЗЫВЫ */}
      <section className="max-w-7xl mx-auto pt-5 pb-21 px-6 ">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl py-6 mb-16 shadow-lg">
          <div className="px-6">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Отзывы
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r,i)=>(
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i*0.2 }}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-purple-400/50 transition"
            >
              <p className="text-yellow-400 font-medium mb-2">{r.stars}</p>
              <p className="text-gray-300 mb-4">{r.text}</p>
              <p className="text-sm font-semibold text-gray-400">{r.author}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
    <a
      href="https://uslugi.yandex.ru/search?action=addReview&profile=IgorRakitin-1161268"
      target="_blank"
      rel="noopener noreferrer"
      className="relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden bg-cyan-500/20 border border-cyan-400/40 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
    >
      <span className="relative z-10">Смотреть все отзывы на Яндекс</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300"></div>
    </a>
  </div>
      </section>

      {/* СЕТАПЫ КЛИЕНТОВ */}
<section
  id="client-setups"
  className="bg-gray-800/50 relative max-w-full pt-21 pb-21 px-6"
>
  <div className="max-w-7xl mx-auto">
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl py-6 mb-16 shadow-lg">
      <div className="px-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Сетапы клиентов
        </h2>
      </div>
    </div>

    <Swiper
  modules={[Navigation, Pagination]}
  navigation
  pagination={{ clickable: true }}
  spaceBetween={30}
>
  {/* ====== СЛАЙД 1 ====== */}
<SwiperSlide>
  <div className="grid grid-cols-4 gap-1 auto-flow-dense">
    {[
      { img: "/images/Sq 1.jpg", type: "square" },
      { img: "/images/Ver 1.jpg", type: "vertical" },
      { img: "/images/Gor 1.jpg", type: "horizontal" },
      { img: "/images/Sq 2.jpg", type: "square" },
      { img: "/images/Sq 3.jpg", type: "square" },
      { img: "/images/Sq 4.jpg", type: "square" },
    ].map((item, i) => {
      let classNames =
        "group relative overflow-hidden rounded-2xl border border-cyan-500/20 hover:border-cyan-400 transition duration-300 shadow-lg";

      // фиксированные пропорции
      if (item.type === "square") classNames += " col-span-1 row-span-1 aspect-square";
      if (item.type === "vertical") classNames += " col-span-1 row-span-2 aspect-[1/2]";
      if (item.type === "horizontal") classNames += " col-span-2 row-span-1 aspect-[2/1]";

      return (
        <div key={i} className={classNames}>
          <img
            src={item.img}
            alt={`Сетап клиента ${i + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      );
    })}
  </div>
</SwiperSlide>
  {/* ====== СЛАЙД 2 ====== */}
  <SwiperSlide>
  <div className="grid grid-cols-4 gap-1 auto-flow-dense">
    {[
      { img: "/images/Sq 1.jpg", type: "square" },
      { img: "/images/Ver 1.jpg", type: "vertical" },
      { img: "/images/Gor 1.jpg", type: "horizontal" },
      { img: "/images/Sq 2.jpg", type: "square" },
      { img: "/images/Sq 3.jpg", type: "square" },
      { img: "/images/Sq 4.jpg", type: "square" },
    ].map((item, i) => {
      let classNames =
        "group relative overflow-hidden rounded-2xl border border-cyan-500/20 hover:border-cyan-400 transition duration-300 shadow-lg";

      // фиксированные пропорции
      if (item.type === "square") classNames += " col-span-1 row-span-1 aspect-square";
      if (item.type === "vertical") classNames += " col-span-1 row-span-2 aspect-[1/2]";
      if (item.type === "horizontal") classNames += " col-span-2 row-span-1 aspect-[2/1]";

      return (
        <div key={i} className={classNames}>
          <img
            src={item.img}
            alt={`Сетап клиента ${i + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      );
    })}
  </div>
</SwiperSlide>
{/* ====== СЛАЙД 2 ====== */}

</Swiper>
  </div>
</section>

      {/* ГОТОВ ОБСУДИТЬ СБОРКУ */}
      <section className="max-w-3xl mx-auto text-center pt-21 pb-21 px-6">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Готов обсудить сборку
        </h2>
        <p className="text-gray-300 mb-10">
          Напишите бюджет и задачи — отвечу максимально быстро.
        </p>
        <a href="https://t.me/your_username" target="_blank" rel="noopener noreferrer">
          <div className="flex justify-center items-center gap-4">

  {/* Telegram */}
  <button
    onClick={() => window.open("https://t.me/RIVaxOR", "_blank")}
    className="relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden
               bg-cyan-500/20 border border-cyan-400/40
               shadow-lg transition-all duration-300
               hover:scale-105
               hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
  >
    
    <span className="relative z-10">Telegram</span>
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300"></div>
  </button>

  {/* Max */}
  <button
    onClick={() => window.open("https://web.max.ru/", "_blank")}
    className="relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden
               bg-cyan-500/20 border border-cyan-400/40
               shadow-lg transition-all duration-300
               hover:scale-105
               hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
  >
    <span className="relative z-10">Max</span>
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300"></div>
  </button>

  {/* WhatsApp */}
  <button
    onClick={() => window.open("https://wa.me/79650527375", "_blank")}
    className="relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden
               bg-cyan-500/20 border border-cyan-400/40
               shadow-lg transition-all duration-300
               hover:scale-105
               hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
  >
    <span className="relative z-10">WhatsApp</span>
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300"></div>
  </button>
</div>
<div className="flex justify-center items-center gap-4 mt-6">

  {/* Avito */}
  <button
    onClick={() => window.open("https://www.avito.ru/brands/i34771128", "_blank")}
    className="relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden
               bg-cyan-500/20 border border-cyan-400/40
               shadow-lg transition-all duration-300
               hover:scale-105
               hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
  >
    <span className="relative z-10">Avito</span>
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300 rounded-xl"></div>
  </button>

  {/* Яндекс.Услуги */}
  <button
    onClick={() => window.open("https://uslugi.yandex.ru/search?action=addReview&profile=IgorRakitin-1161268", "_blank")}
    className="relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden
               bg-cyan-500/20 border border-cyan-400/40
               shadow-lg transition-all duration-300
               hover:scale-105
               hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
  >
    <span className="relative z-10">Яндекс.Услуги</span>
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300 rounded-xl"></div>
  </button>
</div>
            </a>
      </section>

      {/* МЕСТОПОЛОЖЕНИЕ с Яндекс.Картой */}
      <section className="max-w-7xl mx-auto pt-0 pb-25 px-6 relative">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Местоположение
        </h2>
        <div
          ref={mapRef}
          className="w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-white/20"
        />
        <p className="mt-4 text-center text-lg font-medium text-white/90">
    г. Санк-Петербург, Суздальское шоссе 28к2
  </p>
      </section>

    </div>
  );
}