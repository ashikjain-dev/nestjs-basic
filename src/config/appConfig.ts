import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => {
  return {
    awsS3BucketName: process.env.AWS_PUBLIC_S3_BUCKET_NAME,
    awsS3BucketRegion: process.env.AWS_S3_BUCKET_REGION,
    awsAccessKeyID: process.env.AWS_ACCESS_KEY_ID,
    awsAccessSecretKey: process.env.AWS_ACCESS_SECRET_KEY,
    awsCloudFront: process.env.CLDFRONT_DOMAIN,
  };
});
