const { uploadFile, getSignedURL } = require('../service/s3');

exports.uploadDp = async (req, res, next) => {
    try {
        const { body: { name }, file } = req;

        const urlPath = `aws/dp/${name}/${file.originalname}`
        const buffer = file.buffer;

        // await uploadFile(urlPath, buffer, process.env.AWS_BUCKET_NAME, null, file.mimetype)

        return res.send('ok');
    } catch (error) {
      console.log(error)
    }
}

exports.getDp = async (req, res, next ) => {
  try {
    const urlPath = `aws/dp/shrutin/Screenshot (1).png`
    const signedUrl = await getSignedURL(urlPath, process.env.AWS_BUCKET_NAME);

    return res.send(signedUrl)
  } catch (error) {
    console.log(error)
  }
}