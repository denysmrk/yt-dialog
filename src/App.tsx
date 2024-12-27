import React, { useState, useEffect } from 'react';
import './App.css';
import { motion } from 'framer-motion';
import MessageCard from './components/message-card';
import FirstCard from './components/first-card';
//         |||
//         |||
//       \ ||| /
//         \ /
//          ^
const NAME_DIALOG = 'First-dialog'; // Назва діалогу
//
//
//
//
//
const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(35);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDurations, setAudioDurations] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const filePath = `/${NAME_DIALOG}/data.json`;
    const fetchMessages = async () => {
      try {
        console.log('trying');
        const response = await fetch(filePath);
        const data = await response.json();
        console.log('data', data);

        setMessages(data);
        loadAllAudio(data);
      } catch (error) {
        console.error('Error loading JSON file:', error);
        return null;
      }
    };

    fetchMessages();
  }, []);

  const loadAllAudio = async (messages: any[]) => {
    const durations: number[] = [];
    for (const message of messages) {
      try {
        const audioFile = new Audio(`${NAME_DIALOG}/audio/${message.id}.mp3`);
        await new Promise<void>((resolve, reject) => {
          audioFile.onloadedmetadata = () => {
            durations.push(audioFile.duration * 1000);
            resolve();
          };
          audioFile.onerror = () => reject(`Ошибка загрузки: ${message.id}.mp3`);
        });
      } catch (error) {
        console.error(error);
        durations.push(0);
      }
    }
    setAudioDurations(durations);
    setLoading(false);
  };

  useEffect(() => {
    if (!isPlaying || loading) return;

    if (currentIndex >= messages.length) {
      setCurrentIndex(0);
      setIsPlaying(false); // Останавливаем воспроизведение
      console.log('Воспроизведение завершено');
      return;
    }

    const currentMessage = messages[currentIndex];
    console.log(`Текущий индекс: ${currentIndex}, Текущее сообщение: ${currentMessage.id}`);

    const duration = audioDurations[currentIndex];
    const audioFile = new Audio(
      `${NAME_DIALOG}/audio/${currentMessage.id}.mp3?timestamp=${Date.now()}`,
    );

    setTimeout(() => {
      audioFile.play();
    }, 1250);

    const timeoutDuration = currentIndex === 0 ? duration + 1500 : duration;

    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Переход к следующему сообщению
    }, timeoutDuration);

    return () => clearTimeout(timeout); // Чистим таймер при обновлении эффекта
  }, [currentIndex, isPlaying, loading]);

  useEffect(() => {}, [currentIndex]);
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
            ease: 'easeInOut', // Плавный easing
            duration: 1, // Длительность анимации
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
