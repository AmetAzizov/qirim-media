export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
          endpoint: env('S3_ENDPOINT'),
          region: env('AWS_REGION'),
          params: {
          Bucket: env('S3_BUCKET'),
          },
        },
      },
    },
  },
});