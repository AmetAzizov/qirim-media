// import React, {useEffect, useState} from 'react';

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
//     const API_KEY = `AIzaSyC91T-7VjpuHjNo5nZ7yi7T_V22lxgIYRs`; // Ваш API ключ
//     const CHANNEL_ID = `UCb-ANvqD8HQReTm7DjBMEXA`; // Правильный ID вашего канала
//     const MAX_RESULTS = 10; // Количество видео, которое нужно отобразить

//     const [videos, setVideos] = useState<Video[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchYouTubeVideos = async () => {
//             const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=${MAX_RESULTS}`;

//             try {
//                 const response = await fetch(url);
//                 const data = await response.json();

//                 if (data.items) {
//                     setVideos(data.items);
//                 } else {
//                     console.error('No videos found or invalid response format');
//                 }

//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching YouTube videos:', error);
//                 setLoading(false);
//             }
//         };

//         fetchYouTubeVideos();
//     }, [API_KEY, CHANNEL_ID]);

//     return (
//         <div>
//             {loading ? (
//                 <p>Loading videos...</p>
//             ) : (
//                 <div className='video-grid'>
//                     {videos.map(video => (
//                         <div key={video.id.videoId} className='video-item'>
//                             <h3>{video.snippet.title}</h3>
//                             {/* Встраиваем плеер YouTube */}
//                             <iframe
//                                 width='100%'
//                                 height='315'
//                                 src={`https://www.youtube.com/embed/${video.id.videoId}`}
//                                 title={video.snippet.title}
//                                 frameBorder='0'
//                                 allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
//                                 allowFullScreen
//                             />
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default YouTubeVideos;

import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import '../styles/react-markdown.scss';
import {Navigation, Pagination} from 'swiper/modules';

interface Video {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        thumbnails: {
            medium: {
                url: string;
            };
        };
    };
}

const YouTubeVideos: React.FC = () => {
    const API_KEY = `AIzaSyC91T-7VjpuHjNo5nZ7yi7T_V22lxgIYRs`; // Ваш API ключ
    const CHANNEL_ID = `UCb-ANvqD8HQReTm7DjBMEXA`; // ID вашего канала
    const MAX_RESULTS = 10; // Количество видео, которое нужно отобразить

    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchYouTubeVideos = async () => {
            const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=${MAX_RESULTS}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.items) {
                    setVideos(data.items);
                } else {
                    console.error('No videos found or invalid response format');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching YouTube videos:', error);
                setLoading(false);
            }
        };

        fetchYouTubeVideos();
    }, [API_KEY, CHANNEL_ID]);

    return (
        <div className='video-slider-container'>
            {loading ? (
                <p>Loading videos...</p>
            ) : (
                <div className='swiper-wrapper'>
                    {/* Кнопка назад */}
                    <button className='swiper-button-prev'>Prev</button>

                    <Swiper
                        spaceBetween={20}
                        slidesPerView={3}
                        centeredSlides
                        navigation={{prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next'}}
                        loop
                        modules={[Navigation]}
                        className='video-slider'
                    >
                        {videos.map(video => (
                            <SwiperSlide key={video.id.videoId} className='swiper-slide'>
                                <div className='video-item'>
                                    <h3>{video.snippet.title}</h3>
                                    {/* Встраиваем плеер YouTube */}
                                    <iframe
                                        width='974px'
                                        height='583px'
                                        src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                        title={video.snippet.title}
                                        frameBorder='0'
                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                        allowFullScreen
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Кнопка вперед */}
                    <button className='swiper-button-next'>Next</button>
                </div>
            )}
        </div>
    );
};

export default YouTubeVideos;
