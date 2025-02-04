const translationService = require("../services/translation");

module.exports = () => {
  strapi.services["news"].lifecycles = {
    async afterCreate(result, data) {
      const translatedText = await translationService.translateText(
        result.content,
        "EN",
      );
      await strapi
        .query("news")
        .update({ id: result.id }, { content_en: translatedText });
    },
    async afterUpdate(result, params, data) {
      const translatedText = await translationService.translateText(
        result.content,
        "EN",
      );
      await strapi
        .query("news")
        .update({ id: result.id }, { content_en: translatedText });
    },
  };
};
