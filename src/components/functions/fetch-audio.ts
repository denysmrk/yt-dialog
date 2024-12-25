export const fetchAudio = async (text: string, id: string) => {
  try {
    const response = await fetch('/api/fetchAudio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, id }),
    });

    const data = await response.json();

    if (response.ok) {
      const audioPath = data.audioPath;
      console.log(`Audio file available at: ${audioPath}`);
      // Используем путь для воспроизведения аудио
      const audio = new Audio(audioPath);
      audio.play();
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};
