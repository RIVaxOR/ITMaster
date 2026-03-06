"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import HeroImageSlider from "./components/HeroImageSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import BuildModal from "./components/BuildModal";
import Header from "./components/Header";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const mapRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  type Build = {
  img: string;
  name: string;
  desc: string;
  price: string;
  modalImg?: string;   // изображение в модальном окне
  fullDesc?: string;   // расширенное описание
};

  const [activeBuild, setActiveBuild] = useState<Build | null>(null);

  const builds: Build[] = [
  { 
    img: "/images/Eco.png", 
    name: "Бюджет", 
    desc: "AMD Ryzen 3 3200G, AMD Radeon Vega 8, DDR4 8GB, SSD 256GB", 
    price: "₽35 000", 
    modalImg: "/images/Eco.jpg",
    fullDesc: "Процессор AMD Ryzen 3 3200G с 4-мя ядрами и интегрированной графикой AMD Radeon Vega 8 идеально подходит для базовых офисных задач, серфинга в интернете и лёгких игр. 8 ГБ DDR4 обеспечивают стабильную работу нескольких приложений одновременно. SSD 256 ГБ позволяет быстро загружать систему и программы. Кабель-менеджмент аккуратный, гарантия на комплектующие включена."
  },
  { 
    img: "/images/Sred.png", 
    name: "Офис", 
    desc: "AMD Ryzen 5 PRO 5650G, AMD Radeon Vega 7, DDR4 16GB, SSD 512GB", 
    price: "₽55 000", 
    modalImg: "/images/Office.jpg",
    fullDesc: "Мощный офисный ПК на базе AMD Ryzen 5 PRO 5650G с 6-ю ядрами и интегрированной графикой AMD Radeon Vega 7 идеально подходит для многозадачности, работы с документами, таблицами и лёгкого монтажа видео. 16 ГБ оперативной памяти DDR4 обеспечивают плавную работу при одновременном запуске нескольких приложений. SSD 512 ГБ позволяет быстро загружать систему и сохранять большие файлы. Аккуратный кабель-менеджмент и расширенная гарантия."
  },
  { 
    img: "/images/Prem.png", 
    name: "Оптимальный", 
    desc: "Intel Core i5-12400F, RTX 5060, DDR4 16GB, SSD 512GB", 
    price: "₽80 000", 
    modalImg: "/images/Dom Pro.jpg",
    fullDesc: "Премиальная сборка для дома и игр: Intel Core i5-12400F, видеокарта RTX 5060, 16 ГБ DDR4, SSD 512GB. Подходит для AAA-игр, монтажа видео и 3D-моделирования. Кабель-менеджмент выполнен аккуратно, система стресс-тестирована для стабильной работы. Предусмотрена расширенная гарантия и настройка под потребности пользователя."
  },
  { 
    img: "/images/Prem.png", 
    name: "Дом Pro", 
    desc: "Intel Core i7-12700KF, RTX 4070, DDR5 32GB, SSD 2048GB", 
    price: "₽100 000", 
    modalImg: "/images/Games.jpg",
    fullDesc: "Профессиональная сборка для геймеров и контент-креаторов: Intel Core i7-12700KF, RTX 4070, 32 ГБ DDR5, SSD 2 ТБ. Отлично справляется с тяжёлыми играми, потоковой трансляцией и монтажом видео в 4K. Кабель-менеджмент на высшем уровне, система полностью стресс-тестирована. В комплект включена расширенная гарантия и оптимизация под пользователя."
  },
  { 
    img: "/images/Prem.png", 
    name: "Геймер", 
    desc: "AMD Ryzen 7 7800X3D, RTX 4080, DDR5 32GB, SSD 2048GB", 
    price: "₽150 000", 
    modalImg: "/images/Prem_large.png",
    fullDesc: "Игровая станция премиум-класса: AMD Ryzen 7 7800X3D, RTX 4080, 32 ГБ DDR5, SSD 2 ТБ. Максимальная производительность в современных AAA-играх, поддержка VR и 3D-рендеринга. Кабель-менеджмент выполнен идеально, каждый компонент протестирован. Предусмотрена расширенная гарантия и настройка системы под геймера."
  },
  { 
    img: "/images/Prem.png", 
    name: "Творческая", 
    desc: "Intel Core i9-13900K, RTX 4090, DDR5 64GB, SSD 4096GB", 
    price: "₽250 000", 
    modalImg: "/images/Prem_large.png",
    fullDesc: "Супер-производительная сборка для творческих задач: Intel Core i9-13900K, RTX 4090, 64 ГБ DDR5, SSD 4 ТБ. Идеально для 3D-рендеринга, видео в 8K, моделирования и научных вычислений. Кабель-менеджмент идеален, система полностью протестирована. В комплекте расширенная гарантия и индивидуальная настройка под профессиональные задачи."
  },
];

  // ЗАГРУЗКА Яндекс.Карты
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

        const placemark = new (window as any).ymaps.Placemark(
          [60.058280, 30.271110],
          {
            balloonContent:
              "Санкт-Петербург, Суздальское шоссе, 28к2, подъезд 1<br>Телефон: +7 965 052-73-75",
          },
          {
            preset: "islands#redIcon",
          }
        );

        map.geoObjects.add(placemark);
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white font-sans">
      <Header />

      {/* HERO */}
      <section className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 pt-36 pb-21 px-6">
  {/* Левый блок: текст и кнопка */}
  <div className="flex-1 w-full text-center md:text-left">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white leading-snug"
    >
      Сборка ПК<br /> на заказ
    </motion.h1>
    <p className="text-gray-300 text-base sm:text-lg mb-6">
      Сборки для любых задач — от работы до топовых игр. Аккуратный кабель-менеджмент, стресс-тесты и гарантия качества.
    </p>
    <a href="https://t.me/RIVaxOR" target="_blank" rel="noopener noreferrer">
      <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-white overflow-hidden
        bg-cyan-500/20 border border-cyan-400/40 shadow-lg transition-all duration-300
        hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]">
        <span className="relative z-10">Написать в Telegram</span>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300 rounded-xl"></div>
      </button>
    </a>
  </div>

  {/* Правый блок: слайдер */}
  <div className="flex-1 w-full">
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-lg border border-white/20">
      {/* Сама карточка теперь не имеет фиксированной высоты, а HeroImageSlider внутри с aspect-[16/9] */}
      <HeroImageSlider />
    </div>
  </div>
</section>

      {/* CATALOG */}
      <section id="catalog" className="bg-gray-800/50 relative max-w-full pt-21 pb-21 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl py-6 mb-16 shadow-lg">
            <div className="px-6">
              <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Выберите готовую сборку
              </h2>
            </div>
          </div>

          {/* Swiper */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {builds.map((b, i) => (
              <SwiperSlide key={i}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                  className="relative w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden group border border-white/20"
                >
                  <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
                    <img src={b.img} alt={b.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-cyan-300">{b.name}</h3>
                    <p className="text-gray-300 mb-2">{b.desc.split(", ").map((item, idx) => (<span key={idx}>{item}<br /></span>))}</p>
                    <p className="text-lg font-bold text-white">{b.price}</p>
                    <button onClick={() => setActiveBuild(b)} className="mt-4 w-full cursor-pointer bg-white/20 backdrop-blur-lg hover:bg-cyan-500/30 text-white py-3 rounded-xl font-semibold shadow-lg transition hover:scale-105">
                      Подробнее
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Build Modal */}
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
        const delay = i * 0.3; // задержка по возрастанию индекса
        return (
          <motion.div
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: -80 }} // вылетаем слева
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
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
      <section id="clients" className="max-w-7xl mx-auto pt-5 pb-21 px-6 ">
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
      className="cursor-pointer relative flex items-center justify-center
           px-8 py-4 rounded-xl
           font-semibold text-white
           text-center
           overflow-hidden
           bg-cyan-500/20 border border-cyan-400/40
           shadow-lg transition-all duration-300
           hover:scale-105
           hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
    >
      <span className="relative z-10">Смотреть все отзывы<br /> на Яндекс</span>
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
      { img: "/images/Sq 5.jpg", type: "square" },
      { img: "/images/Ver 2.jpg", type: "vertical" },
      { img: "/images/Gor 2.jpg", type: "horizontal" },
      { img: "/images/Sq 6.jpg", type: "square" },
      { img: "/images/Sq 7.jpg", type: "square" },
      { img: "/images/Sq 8.jpg", type: "square" },
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
  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
    Готов обсудить сборку
  </h2>
  <p className="text-gray-300 mb-10">
    Напишите бюджет и задачи — отвечу максимально быстро.
  </p>

  {/* Первая строка: Telegram, Max, WhatsApp */}
  <div className="flex flex-wrap justify-center items-center gap-4">
    <button
      onClick={() => window.open("https://t.me/RIVaxOR", "_blank")}
      className="cursor-pointer relative flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white overflow-hidden
                 bg-cyan-500/20 border border-cyan-400/40 shadow-lg transition-all duration-300
                 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
    >
      <span className="relative z-10">Telegram</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300"></div>
    </button>

    <button
      onClick={() => window.open("https://web.max.ru/", "_blank")}
      className="cursor-pointer relative flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white overflow-hidden
                 bg-cyan-500/20 border border-cyan-400/40 shadow-lg transition-all duration-300
                 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
    >
      <span className="relative z-10">Max</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300"></div>
    </button>

    <button
      onClick={() => window.open("https://wa.me/79650527375", "_blank")}
      className="cursor-pointer relative flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white overflow-hidden
                 bg-cyan-500/20 border border-cyan-400/40 shadow-lg transition-all duration-300
                 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
    >
      <span className="relative z-10">WhatsApp</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300"></div>
    </button>
  </div>

  {/* Вторая строка: Avito, Яндекс.Услуги, VK */}
  <div className="flex flex-wrap justify-center gap-4 mt-4">
    <button
      onClick={() => window.open("https://www.avito.ru/brands/i34771128", "_blank")}
      className="cursor-pointer relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden
                 bg-cyan-500/20 border border-cyan-400/40 shadow-lg transition-all duration-300
                 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
    >
      <span className="relative z-10">Avito</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300 rounded-xl"></div>
    </button>

    <button
      onClick={() => window.open("https://uslugi.yandex.ru/search?action=addReview&profile=IgorRakitin-1161268", "_blank")}
      className="cursor-pointer relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden
                 bg-cyan-500/20 border border-cyan-400/40 shadow-lg transition-all duration-300
                 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
    >
      <span className="relative z-10">Яндекс</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300 rounded-xl"></div>
    </button>

    <button
      onClick={() => window.open("https://vk.com/rivaxor", "_blank")}
      className="cursor-pointer relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden
                 bg-cyan-500/20 border border-cyan-400/40 shadow-lg transition-all duration-300
                 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
    >
      <span className="relative z-10">VK</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition duration-300 rounded-xl"></div>
    </button>

  </div>
</section>

      {/* МЕСТОПОЛОЖЕНИЕ с Яндекс.Картой */}
      <section id="maps" className="max-w-7xl mx-auto pt-0 pb-25 px-6 relative">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Местоположение
        </h2>
        <div ref={mapRef} className="w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-white/20" />
        <p className="mt-4 text-center text-lg font-medium text-white/90">
          г. Санкт-Петербург, Суздальское шоссе 28к2
        </p>
      </section>
    </div>
  );
}