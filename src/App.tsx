import React, { useState, useEffect } from 'react';
import './App.css';
import { motion } from 'framer-motion';
import MessageCard from './components/message-card';
import { sampleMessages } from './constants';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentMessage = sampleMessages[currentIndex];

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sampleMessages.length);
    }, currentMessage.interval);

    return () => clearInterval(interval);
  }, [currentIndex]);
  const savedTheme = localStorage.getItem('theme');
  const htmlElement = document.documentElement;

  useEffect(() => {
    if (savedTheme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // Функция переключения темы
    const toggleTheme = () => {
      if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    };

    // Обработчик нажатия клавиши
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 't') {
        console.log(htmlElement.classList);
        toggleTheme();
      }
    };

    // Добавляем обработчик нажатия клавиши
    document.addEventListener('keydown', handleKeyDown);

    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [savedTheme]);

  return (
    <div className="flex items-center justify-center h-[100vh] w-full dark:bg-black overflow-hidden">
      <motion.div
        className="relative flex w-full justify-start"
        initial={{ x: 0 }}
        animate={{ x: -currentIndex * 100 + '%' }} // Сдвиг карточек влево
        transition={{
          ease: 'easeInOut', // Используем плавный easing
          duration: 1, // Устанавливаем продолжительность анимации
        }}>
        {sampleMessages.map((message, index) => (
          <div key={index} className="w-full flex-shrink-0 pl-10">
            <MessageCard message={message} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default App;
