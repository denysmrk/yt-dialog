export async function LoadTextData(name: string) {
  try {
    const filePath = `@public/First-dialog/data.json`; // Динамический путь
    const data = await import(filePath, { assert: { type: 'json' } });
    return data.default; // JSON импортируется как default-экспорт
  } catch (error) {
    console.error('Error loading JSON file:', error);
    return null;
  }
}
