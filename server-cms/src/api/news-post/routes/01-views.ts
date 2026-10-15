/**
 * Public endpoint for counting news views
 */

export default {
  routes: [
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
