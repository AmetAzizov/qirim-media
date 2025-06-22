// import React, {useEffect, useState} from 'react';
// import {Swiper, SwiperSlide} from 'swiper/react';
// import {Navigation, Pagination, EffectCoverflow} from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-coverflow';
// import {motion} from 'framer-motion';

// interface Video {
//     id: {
//         videoId: string;
//     };
//     snippet: {
//         title: string;
//         thumbnails: {
//             medium: {
//                 url: string;
//             };
//         };
//     };
// }

// const YouTubeVideos: React.FC = () => {
//     const API_KEY = `AIzaSyC91T-7VjpuHjNo5nZ7yi7T_V22lxgIYRs`;
//     const CHANNEL_ID = `UCb-ANvqD8HQReTm7DjBMEXA`;
//     const MAX_RESULTS = 20;

//     const [videos, setVideos] = useState<Video[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchYouTubeVideos = async () => {
//             try {
//                 const response = await fetch(
//                     `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=${MAX_RESULTS}`
//                 );
//                 const data = await response.json();
//                 if (data.items) {
//                     setVideos(data.items);
//                 } else {
//                     console.error('No videos found or invalid response format');
//                 }
//             } catch (error) {
//                 console.error('Error fetching YouTube videos:', error);
//             }
//             setLoading(false);
//         };
//         fetchYouTubeVideos();
//     }, [API_KEY, CHANNEL_ID]);

//     if (loading) {
//         return <div className='text-white text-center py-5'>Загрузка видео...</div>;
//     }

//     return (
//         <div className='w-full min-h-screen bg-black text-white p-6'>
//             {/* Большой главный баннер */}
//             {/* <div className='relative w-full h-[500px] mb-10'>
//                 {videos.length > 0 && (
//                     <iframe
//                         src={`https://www.youtube.com/embed/${videos[0].id.videoId}?autoplay=1&mute=1`}
//                         title={videos[0].snippet.title}
//                         allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
//                         allowFullScreen
//                         className='w-full h-full object-cover rounded-lg shadow-lg'
//                     />
//                 )}
//             </div> */}

//             {/* Несколько рядов слайдеров */}
//             {/* {['Новое', 'Популярное', 'Рекомендации', 'Для вас'].map((category, index) => (
//                 <div key={index} className='mb-10'>
//                     <h2 className='text-2xl font-bold mb-4'>{category}</h2>
//                     <Swiper
//                         modules={[Navigation, Pagination, EffectCoverflow]}
//                         slidesPerView={2.5}
//                         spaceBetween={20}
//                         navigation
//                         pagination={{clickable: true}}
//                         className='video-slider'
//                     >
//                         {videos.slice(index * 7, (index + 1) * 7).map(video => (
//                             <SwiperSlide key={video.id.videoId} className='p-2'>
//                                 <motion.div
//                                     whileHover={{scale: 1.05}}
//                                     className='bg-[rgb(32, 32, 32)] rounded-lg overflow-hidden shadow-lg border border-gray-800'
//                                 >
//                                     <iframe
//                                         width='100%'
//                                         height='200px'
//                                         src={`https://www.youtube.com/embed/${video.id.videoId}`}
//                                         title={video.snippet.title}
//                                         allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
//                                         allowFullScreen
//                                         className='w-full rounded-t-lg'
//                                     />
//                                     <div className='p-4 text-center'>
//                                         <h3 className='text-md font-semibold'>
//                                             {video.snippet.title}
//                                         </h3>
//                                     </div>
//                                 </motion.div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>
//             ))} */}

//             {/* Грид 4x5 */}
//             <div className='max-w-[1480px] my-0 mx-auto grid grid-cols-1 gap-6 mt-10 lg:grid-cols-4'>
//                 {videos.slice(0, 20).map(video => (
//                     <motion.div
//                         key={video.id.videoId}
//                         whileHover={{scale: 1.05}}
//                         className='bg-[rgb(32,32,32)] p-4 rounded-lg overflow-hidden shadow-lg'
//                     >
//                         <iframe
//                             width='100%'
//                             height='200px'
//                             src={`https://www.youtube.com/embed/${video.id.videoId}`}
//                             title={video.snippet.title}
//                             allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
//                             allowFullScreen
//                             className='w-full rounded-md'
//                         />
//                         <div className='p-4'>
//                             <p className="text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4">{video.snippet.title}</p>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default YouTubeVideos;

// import React, {useRef, useState} from 'react';
// import useSWR from 'swr';
// import {Swiper, SwiperSlide} from 'swiper/react';
// import {motion} from 'framer-motion';
// import '.././styles/home.scss';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// // import './styles.css';
// import {EffectCoverflow, Pagination} from 'swiper/modules';

// // Интерфейс для структуры видео
// interface Video {
//     id: {videoId: string};
//     snippet: {
//         title: string;
//         thumbnails: {medium: {url: string}};
//     };
// }

// // Константы API
// const API_KEY = 'AIzaSyC91T-7VjpuHjNo5nZ7yi7T_V22lxgIYRs';
// const CHANNEL_ID = 'UCb-ANvqD8HQReTm7DjBMEXA';
// const MAX_RESULTS = 20;
// const API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=${MAX_RESULTS}`;

// // Функция-загрузчик с кэшированием в LocalStorage
// const fetcher = async (url: string) => {
//     const cacheKey = 'youtube_videos';
//     const cacheTimeKey = 'youtube_videos_time';
//     const cacheDuration = 1000 * 60 * 60 * 6; // 6 часов

//     // Проверяем кэш в LocalStorage
//     const cachedData = localStorage.getItem(cacheKey);
//     const cacheTime = localStorage.getItem(cacheTimeKey);

//     if (cachedData && cacheTime && Date.now() - Number(cacheTime) < cacheDuration) {
//         console.log('Используем данные из кэша');
//         return JSON.parse(cachedData);
//     }

//     console.log('Делаем запрос к API');
//     const response = await fetch(url);
//     const data = await response.json();

//     // Сохраняем в LocalStorage
//     localStorage.setItem(cacheKey, JSON.stringify(data));
//     localStorage.setItem(cacheTimeKey, String(Date.now()));

//     return data;
// };

// const YouTubeVideos: React.FC = () => {
//     const {data, error} = useSWR(API_URL, fetcher, {
//         revalidateOnFocus: false, // Не обновлять при возврате на вкладку
//         dedupingInterval: 1000 * 60 * 60 * 6 // 6 часов
//     });

//     if (error) return <div className='text-white text-center py-5'>Ошибка загрузки видео</div>;
//     if (!data) return <div className='text-white text-center py-5'>Загрузка видео...</div>;

//     return (
//         <div className='w-full min-h-screen bg-black text-white p-6'>
//             <Swiper
//                 effect={'coverflow'}
//                 grabCursor={true}
//                 centeredSlides={true}
//                 slidesPerView={3}
//                 loop={true}
//                 initialSlide={1}
//                 coverflowEffect={{
//                     rotate: 50,
//                     stretch: 0,
//                     depth: 100,
//                     modifier: 1,
//                     slideShadows: true
//                 }}
//                 pagination={true}
//                 modules={[EffectCoverflow, Pagination]}
//                 className='mySwiper'
//             >
//                 <SwiperSlide>
//                     <img src='https://swiperjs.com/demos/images/nature-1.jpg' />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src='https://swiperjs.com/demos/images/nature-2.jpg' />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src='https://swiperjs.com/demos/images/nature-3.jpg' />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src='https://swiperjs.com/demos/images/nature-4.jpg' />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src='https://swiperjs.com/demos/images/nature-5.jpg' />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src='https://swiperjs.com/demos/images/nature-6.jpg' />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src='https://swiperjs.com/demos/images/nature-7.jpg' />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src='https://swiperjs.com/demos/images/nature-8.jpg' />
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src='https://swiperjs.com/demos/images/nature-9.jpg' />
//                 </SwiperSlide>
//             </Swiper>
//             <h2 className='text-3xl font-bold text-center mb-6'>YouTube Видео</h2>

//             {/* Грид с видео */}
//             <div className='max-w-[1480px] my-0 mx-auto grid grid-cols-1 gap-6 mt-10 lg:grid-cols-4'>
//                 {data.items.map((video: Video) => (
//                     <motion.div
//                         key={video.id.videoId}
//                         whileHover={{scale: 1.05}}
//                         className='bg-[rgb(32,32,32)] p-4 rounded-lg overflow-hidden shadow-lg'
//                     >
//                         <iframe
//                             width='100%'
//                             height='200px'
//                             src={`https://www.youtube.com/embed/${video.id.videoId}`}
//                             title={video.snippet.title}
//                             allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
//                             allowFullScreen
//                             className='w-full rounded-md'
//                         />
//                         <div className='p-4'>
//                             <p className='text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4'>
//                                 {video.snippet.title}
//                             </p>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default YouTubeVideos;




import React from 'react';
import useSWR from 'swr';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import '../styles/home.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

// Интерфейс для структуры видео
interface Video {
    id: { videoId: string };
    snippet: {
        title: string;
        thumbnails: { medium: { url: string } };
    };
}

// Константы API
const API_KEY = 'AIzaSyC91T-7VjpuHjNo5nZ7yi7T_V22lxgIYRs';
const CHANNEL_ID = 'UCb-ANvqD8HQReTm7DjBMEXA';
const MAX_RESULTS = 20;
const API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=${MAX_RESULTS}`;

// Функция-загрузчик с кэшированием в LocalStorage
const fetcher = async (url: string) => {
    const cacheKey = 'youtube_videos';
    const cacheTimeKey = 'youtube_videos_time';
    const cacheDuration = 1000 * 60 * 60 * 6; // 6 часов

    // Проверяем кэш в LocalStorage
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(cacheTimeKey);

    if (cachedData && cacheTime && Date.now() - Number(cacheTime) < cacheDuration) {
        console.log('Используем данные из кэша');
        return JSON.parse(cachedData);
    }

    console.log('Делаем запрос к API');
    const response = await fetch(url);
    const data = await response.json();

    // Сохраняем в LocalStorage
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheTimeKey, String(Date.now()));

    return data;
};

const YouTubeVideos: React.FC = () => {
    const { data, error } = useSWR(API_URL, fetcher, {
        revalidateOnFocus: false, // Не обновлять при возврате на вкладку
        dedupingInterval: 1000 * 60 * 60 * 6, // 6 часов
    });

    if (error) return <div className="text-white text-center py-5">Ошибка загрузки видео</div>;
    if (!data) return <div className="text-white text-center py-5">Загрузка видео...</div>;

    return (
        <div className="w-full min-h-screen bg-black text-white p-6">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                loop={true}
                initialSlide={3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {data.items.map((video: Video) => (
                    <SwiperSlide key={video.id.videoId}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-[rgb(32,32,32)] p-4 rounded-lg overflow-hidden shadow-lg"
                        >
                            <iframe
                                width="100%"
                                height="350px"
                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                title={video.snippet.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full rounded-md"
                            />
                            {/* <div className="p-4">
                                <p className="text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4">
                                    {video.snippet.title}
                                </p>
                            </div> */}
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* <h2 className="text-3xl font-bold text-center mb-6">YouTube Видео</h2> */}

            {/* Грид с видео */}
            <div className="max-w-[1480px] my-0 mx-auto grid grid-cols-1 gap-6 mt-10 lg:grid-cols-4">
                {data.items.map((video: Video) => (
                    <motion.div
                        key={video.id.videoId}
                        whileHover={{ scale: 1.05 }}
                        className="bg-[rgb(32,32,32)] p-4 rounded-lg overflow-hidden shadow-lg"
                    >
                        <iframe
                            width="100%"
                            height="200px"
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            title={video.snippet.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full rounded-md"
                        />
                        <div className="p-4">
                            <p className="text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4">
                                {video.snippet.title}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default YouTubeVideos;
