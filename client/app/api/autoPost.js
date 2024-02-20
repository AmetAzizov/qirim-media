const Twit = require('twit');

const T = new Twit({
    consumer_key: 'YOUR_CONSUMER_KEY',
    consumer_secret: 'YOUR_CONSUMER_SECRET',
    access_token: 'YOUR_ACCESS_TOKEN',
    access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET'
});

// Функция для постинга твита
const postTweet = async tweetText => {
    try {
        const tweet = await T.post('statuses/update', {status: tweetText});
        console.log('Tweet posted:', tweet.data.text);
        return tweet.data;
    } catch (error) {
        console.error('Error posting tweet:', error);
        throw error;
    }
};

// Пример использования функции для постинга твита
postTweet(
    'Привет, Twitter! Это мой первый твит из моего приложения Next.js с использованием Strapi!'
)
    .then(() => console.log('Tweet posted successfully!'))
    .catch(error => console.error('Error posting tweet:', error));
