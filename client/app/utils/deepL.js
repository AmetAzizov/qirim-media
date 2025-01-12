export const translateText = async (text, targetLanguage) => {
    const apiKey = '62c7e834-b71a-45f0-b6a5-dfff7609fd10:fx';
    const url = 'https://api-free.deepl.com/v2/translate';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                auth_key: apiKey,
                text: text,
                target_lang: targetLanguage
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.translations[0].text;
    } catch (error) {
        console.error('Error translating text:', error);
        throw error;
    }
};
