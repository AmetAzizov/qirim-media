'use client';
import Link from 'next/link';
import React from 'react';
import Stories from 'react-insta-stories';
import ReactMarkdown from 'react-markdown';

const Loader = ({newsPosts}: any) => {
    const story = newsPosts.map((newsPost: any) => ({
        content: () => (
            <div
                key={newsPost.id}
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${newsPost.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <Link className={'flex flex-col justify-center px-4'} href={newsPost.slug}>
                    <h2
                        className={
                            'text-2xl font-bold text-[--background-color] text-clip line-clamp-3 xl:line-clamp-2 xl:text-4xl'
                        }
                    >
                        {newsPost.title}
                    </h2>

                    <ReactMarkdown
                        className={
                            'react-markdown text-base font-medium text-[--background-color] mt-7 max-w-[593px] text-clip line-clamp-2 xl:line-clamp-3'
                        }
                    >
                        {newsPost.subtitle}
                    </ReactMarkdown>
                </Link>
            </div>
        )
    }));
    const storyContainerStyles = {};
    const progressContainerStyles = {
        bottom: '0',
        paddingBottom: '1.75rem'
    };
    const progressWrapperStyles = {
        backgroundColor: '#A8A8A8',
        height: '8px'
    };
    const progressStyles = {
        background: '#F0CA56'
    };
    return (
        <div className={'block lg:hidden'}>
            <Stories
                stories={story}
                storyContainerStyles={storyContainerStyles}
                progressWrapperStyles={progressWrapperStyles}
                progressStyles={progressStyles}
                progressContainerStyles={progressContainerStyles}
                loop={true}
                preloadCount={4}
                defaultInterval={5000}
                width={'100%'}
            />
        </div>
    );
};

export default Loader;
