// import React, {useEffect, useState} from 'react';
// import {Swiper, SwiperSlide} from 'swiper/react';
// import '../styles/home.scss';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';

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
//     const CHANNEL_ID = `UCb-ANvqD8HQReTm7DjBMEXA`; // ID вашего канала
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
//         <div className='video-slider-container w-full mx-auto my-0'>
//             <Swiper className='video-slider'>
//                 {videos.map(video => (
//                     <SwiperSlide key={video.id.videoId} className='swiper-slide'>
//                         <div className='video-item bg-gray-900 rounded-lg overflow-hidden shadow-md'>
//                             <iframe
//                                 width='100%'
//                                 height='200px'
//                                 src={`https://www.youtube.com/embed/${video.id.videoId}`}
//                                 title={video.snippet.title}
//                                 allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
//                                 allowFullScreen
//                                 className='w-[954px] h-60'
//                             />
//                             <div className='p-4 text-white'>
//                                 <h3 className='text-sm font-semibold'>{video.snippet.title}</h3>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// };

// export default YouTubeVideos;

import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, EffectCoverflow} from 'swiper/modules';
import '../styles/home.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

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

    if (loading) {
        return <div>Loading videos...</div>;
    }

    return (
        <div className='video-slider-container w-full mx-auto my-0'>
            <Swiper
                modules={[Navigation, Pagination, EffectCoverflow]}
                slidesPerView={3}
                spaceBetween={20}
                navigation
                pagination={{clickable: true}}
                effect='coverflow'
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false
                }}
                className='video-slider'
            >
                {videos.map(video => (
                    <SwiperSlide key={video.id.videoId} className='swiper-slide'>
                        <div className='video-item bg-gray-900 rounded-lg overflow-hidden shadow-md'>
                            <iframe
                                width='974px'
                                height='200px'
                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                title={video.snippet.title}
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen
                                className='w-full h-60'
                            />
                            <div className='p-4 text-white'>
                                <h3 className='text-sm font-semibold'>{video.snippet.title}</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default YouTubeVideos;
