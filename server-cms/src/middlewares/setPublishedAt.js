// module.exports = (config, { strapi }) => {
//   return async (ctx, next) => {
//     if (ctx.request.method === "POST" || ctx.request.method === "PUT") {
//       const { publishedAt } = ctx.request.body;

//       // Если запись уже публиковалась, то дату не изменяем
//       if (ctx.state.entity && ctx.state.entity.publishedAt) {
//         return next();
//       }

//       // Устанавливаем дату только при публикации
//       if (
//         ctx.request.body.publishedAt === null ||
//         ctx.request.body.publishedAt === undefined
//       ) {
//         ctx.request.body.publishedAt = new Date().toISOString();
//       }
//     }

//     await next();
//   };
// };
