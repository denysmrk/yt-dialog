import React, { useState, useEffect } from 'react';
import './App.css';
import { motion } from 'framer-motion';
import MessageCard from './components/message-card';
import FirstCard from './components/first-card';
import messages from '../src/api/sheetData.json';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDurations, setAudioDurations] = useState<number[]>([]); // Храним длительности аудио
  const [loading, setLoading] = useState(true); // Статус загрузки

  // Функция для загрузки всех аудио и их длительности
  const loadAllAudio = async () => {
    const durations: number[] = [];
    for (const message of messages) {
      const audioFile = new Audio(`audio/${message.id}.mp3`);
      await new Promise<void>((resolve) => {
        audioFile.onloadedmetadata = () => {
          durations.push(audioFile.duration * 1000); // В миллисекундах
          resolve();
        };
      });
    }
    setAudioDurations(durations);
    setLoading(false); // Завершаем загрузку
  };

  // Воспроизведение аудио
  const playAudio = (messageId: string) => {
    const audioFile = new Audio(`audio/${messageId}.mp3`);
    audioFile.play();
    return new Promise<number>((resolve) => {
      audioFile.onended = () => {
        resolve(audioFile.duration * 1000); // Возвращаем длительность в миллисекундах
      };
    });
  };

  useEffect(() => {
    loadAllAudio(); // Загружаем все аудио при монтировании
  }, []);

  // Интервал для переключения карточек
  useEffect(() => {
    if (!isPlaying || loading) return; // Если в процессе загрузки или не воспроизводим

    const currentMessage = messages[currentIndex];
    console.log(`Текущий индекс: ${currentIndex}, Текущее сообщение: ${currentMessage.id}`);

    const duration = audioDurations[currentIndex];
    const audioFile = new Audio(`audio/${currentMessage.id}.mp3`);
    setTimeout(() => {
      audioFile.play();
    }, 1000);
    // Синхронизация переключения компонента с аудио
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length); // Переключаем на следующий индекс
    }, duration);
  }, [currentIndex, isPlaying]);

  const savedTheme = localStorage.getItem('theme');
  const htmlElement = document.documentElement;

  useEffect(() => {
    if (savedTheme === 'dark') {
      htmlElement.classList.add('dark');
      console.log('Тема: темная');
    } else {
      htmlElement.classList.remove('dark');
      console.log('Тема: светлая');
    }

    // Функция переключения темы
    const toggleTheme = () => {
      if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        console.log('Переключаем на светлую тему');
      } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        console.log('Переключаем на темную тему');
      }
    };

    // Обработчик нажатия клавиши
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 't') {
        toggleTheme();
      } else if (event.code === 'Space') {
        // Переключение воспроизведения на пробел
        event.preventDefault(); // Отключаем скролл страницы при пробеле
        setIsPlaying((prev) => !prev);
        console.log(`Переключаем воспроизведение: ${!isPlaying}`);
      }
    };

    // Добавляем обработчик нажатия клавиши
    document.addEventListener('keydown', handleKeyDown);

    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [savedTheme, isPlaying]);

  return (
    <div className="flex items-center justify-center h-[100vh] w-full dark:bg-black overflow-hidden">
      {loading ? (
        <div className="loading">Загрузка...</div> // Индикатор загрузки
      ) : (
        <motion.div
          className="relative flex w-full justify-start"
          initial={{ x: 0 }}
          animate={{ x: -currentIndex * 100 + '%' }} // Сдвиг карточек влево
          transition={{
            ease: 'easeInOut', // Используем плавный easing
            duration: 1, // Устанавливаем продолжительность анимации
          }}>
          {messages.map((message, index) => (
            <div key={index} className="w-full flex-shrink-0 content-center pl-[10vw]">
              {index === 0 ? (
                <FirstCard text={message.text} />
              ) : (
                <MessageCard text={message.text} />
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default App;
