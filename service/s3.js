const AWS = require('aws-sdk');

const s3 = new AWS.S3();

//uploadfile
exports.uploadFile = async (filePath, image, bucket = null, acl = null, contentType = null) => {
  const params = { Bucket: bucket, Key: filePath };
  if (contentType) params.ContentType = contentType;
  if (bucket) params.Bucket = bucket;
  if (acl) params.ACL = acl;
  params.Body = image instanceof Buffer ? image : image.buffer;
  return s3.upload(params).promise();
}

/**
 * Generate signed URL from AWS
 * @param {*} filePath File path of accessing file
 */
 exports.getSignedURL =  async (filePath, bucket = null, time = null) => {
  const params = { Bucket: bucket || aws.bucket, Key: filePath, Expires: time || 60 * 5 };
  return s3.getSignedUrl('getObject', params);
}