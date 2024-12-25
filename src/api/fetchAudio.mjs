import { Client } from '@gradio/client';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';

// Получаем директорию текущего файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загрузка учетных данных из файла
async function loadCredentials() {
  const data = await fs.readFile(path.join(__dirname, 'credentials.json'), 'utf8');
  return JSON.parse(data);
}

// Конфигурация Google Sheets
const SPREADSHEET_ID = '1gjU1aXqBoNEWKiOHAsQDc_o1g4LtIUKfXSCzKlO3134';
const TEXT_SHEET_NAME = 'yt-text';

// Функция для извлечения данных из Google Sheets
async function fetchSheetData() {
  const credentials = await loadCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: TEXT_SHEET_NAME, // Название листа
  });

  const rows = response.data.values;
  if (!rows || rows.length === 0) {
    throw new Error('No data found in the sheet.');
  }

  // Преобразуем данные в объекты { text, id }
  return rows.slice(1).map((row) => ({
    id: row[0], // Предполагается, что ID в первом столбце
    text: row[1], // Текст во втором столбце
  }));
}

// Генерация аудио
async function generateAudio(text, id) {
  try {
    console.log(`Processing ID: ${id}, Text: "${text}"`);
    const client = await Client.connect('VoiceCloning-be/text-to-speech');
    const result = await client.predict('/predict', {
      text,
      voice: 'en-US-AndrewMultilingualNeural - en-US (Male)',
      rate: 0,
      pitch: 0,
    });

    const audioUrl = result.data[0]?.url;
    if (audioUrl) {
      const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
      const audioPath = path.join(__dirname, 'audio', `${id}.mp3`);

      // Создаем папку, если она не существует, и сохраняем файл
      await fs.mkdir(path.dirname(audioPath), { recursive: true });
      await fs.writeFile(audioPath, response.data);

      console.log(`Audio saved to: ${audioPath}`);
    } else {
      console.error('Audio URL not found');
    }
  } catch (error) {
    console.error(`Error generating audio for ID: ${id}`, error);
  }
}

async function saveDataToFile(data, filename) {
  try {
    const filePath = path.join(__dirname, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Data saved to: ${filePath}`);
  } catch (error) {
    console.error(`Error saving data to file: ${filename}`, error);
  }
}

// Основной процесс
async function main() {
  try {
    const data = await fetchSheetData(); // Получаем данные из Google Sheets
    await saveDataToFile(data, 'sheetData.json'); // Сохраняем данные в JSON-файл
    // Получаем данные из Google Sheets
    for (const { text, id } of data) {
      await generateAudio(text, id); // Генерируем аудио для каждого текста
    }
  } catch (error) {
    console.error('Error in the main process:', error);
  }
}

main();
