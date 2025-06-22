import React from 'react';
import ContentLoader from 'react-content-loader';

const NewsSkeletonLoader = (props: any) => (
    <ContentLoader viewBox='0 0 300 400' height={400} width={'100%'} {...props}>
        <rect x='0' y='0' rx='4' ry='4' width='300' height='200' />
        <rect x='0' y='210' rx='4' ry='4' width='150' height='20' />
        <rect x='0' y='240' rx='4' ry='4' width='250' height='20' />
        <rect x='0' y='270' rx='4' ry='4' width='200' height='20' />
        <rect x='0' y='300' rx='4' ry='4' width='250' height='20' />
    </ContentLoader>
);

export default NewsSkeletonLoader;
