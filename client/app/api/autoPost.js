// const Twit = require('twit');

// const T = new Twit({
//     consumer_key: 'YOUR_CONSUMER_KEY',
//     consumer_secret: 'YOUR_CONSUMER_SECRET',
//     access_token: 'YOUR_ACCESS_TOKEN',
//     access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET'
// });

// // Функция для постинга твита
// const postTweet = async tweetText => {
//     try {
//         const tweet = await T.post('statuses/update', {status: tweetText});
//         console.log('Tweet posted:', tweet.data.text);
//         return tweet.data;
//     } catch (error) {
//         console.error('Error posting tweet:', error);
//         throw error;
//     }
// };

// // Пример использования функции для постинга твита
// postTweet(
//     'Привет, Twitter! Это мой первый твит из моего приложения Next.js с использованием Strapi!'
// )
//     .then(() => console.log('Tweet posted successfully!'))
//     .catch(error => console.error('Error posting tweet:', error));

import { TwitterApi } from 'twitter-api-v2';

// Instantiate with desired auth type (here's Bearer v2 auth)
const twitterClient = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAHWrsQEAAAAAMS2Lj618eDpsM9vDqA1miS48xww%3DmH57rAQwJtxn0Wg5f3ZLloatkstuB4UHN377027KcBWOo6QNtZ');

// Tell typescript it's a readonly app
const readOnlyClient = twitterClient.readOnly;

// Play with the built in methods
const user = await readOnlyClient.v2.userByUsername('plhery');
await twitterClient.v2.tweet('Hello, this is a test.');
// You can upload media easily!
await twitterClient.v1.uploadMedia('https://s3-qirimbucket.gmhost.space/Screenshot_6_945d122406.png');