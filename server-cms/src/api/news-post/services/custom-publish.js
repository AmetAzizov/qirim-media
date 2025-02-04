module.exports = {
  async customPublish(id) {
    const entry = await strapi
      .documents("api::news-post.news-post")
      .findOne(id);
    if (!entry.firstPublishedAt) {
      await strapi.documents("api::news-post.news-post").update(id, {
        data: { firstPublishedAt: new Date() },
        status: "published",
      });
    } else {
      await strapi.documents("api::news-post.news-post").update(id, {
        status: "published",
      });
    }
  },
};
