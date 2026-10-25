/**
 * Public endpoint for counting news views
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/news-posts/:documentId/views',
      handler: 'news-post.getViews',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/news-posts/:documentId/view',
      handler: 'news-post.incrementViews',
      config: {
        auth: false,
      },
    },
  ],
};
