const DEEPL_API_KEY = '62c7e834-b71a-45f0-b6a5-dfff7609fd10:fx';
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

// Интерфейс для ответа DeepL API
// interface DeepLResponse {
//   translations: {
//     text: string;
//   }[];
// }

// export const deeplService = {
//   async translateText(text: string, targetLang: string): Promise<string | null> {
//     try {
//       const response = await fetch(
//         `${DEEPL_API_URL}?auth_key=${DEEPL_API_KEY}&text=${encodeURIComponent(text)}&target_lang=${targetLang}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Ошибка HTTP: ${response.status}`);
//       }

//       // Указываем тип для переменной data
//       const data: DeepLResponse = await response.json();

//       // Проверяем, есть ли свойство translations в ответе
//       if (!data.translations || !Array.isArray(data.translations)) {
//         throw new Error('Некорректный ответ от DeepL API: отсутствует translations');
//       }

//       return data.translations[0].text;
//     } catch (error) {
//       console.error('Ошибка при переводе:', error);
//       return null;
//     }
//   },
// };

// Интерфейс для ответа DeepL API
interface DeepLResponse {
  translations: {
    text: string;
  }[];
}

// Type guard для проверки структуры ответа
function isDeepLResponse(data: any): data is DeepLResponse {
  return data && Array.isArray(data.translations);
}

export const deeplService = {
  async translateText(text: string, targetLang: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${DEEPL_API_URL}?auth_key=${DEEPL_API_KEY}&text=${encodeURIComponent(text)}&target_lang=${targetLang}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();

      // Проверяем, соответствует ли ответ интерфейсу DeepLResponse
      if (!isDeepLResponse(data)) {
        throw new Error('Некорректный ответ от DeepL API: отсутствует translations');
      }

      return data.translations[0].text;
    } catch (error) {
      console.error('Ошибка при переводе:', error);
      return null;
    }
  },
};