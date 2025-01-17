import AWS from 'aws-sdk';


AWS.config.update({
    accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY_ID ,
    secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_ACCESS_KEY ,
    region: import.meta.env.VITE_AWS_S3_BUCKET_REGION ,
});

export const s3 =  new AWS.S3() ;
export const BUCKET_NAME = import.meta.env.VITE_AWS_S3_BUCKET_NAME;


