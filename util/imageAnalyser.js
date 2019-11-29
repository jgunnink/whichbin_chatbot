const vision = require("@google-cloud/vision");
const image2base64 = require("image-to-base64");

const visionClient = new vision.ImageAnnotatorClient();

const downloadUrlImageBase64 = async url => {
  return await image2base64(url)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log("error base64");
      console.log(error); // Exception error....
    });
};

class ImageAnalyser {
  static async getImageLabels(url) {
    console.log("Processing new image...");
    let base64Image = await downloadUrlImageBase64(url);
    const bufferedImage = new Buffer.from(base64Image, "base64");

    const params = {
      image: {
        content: bufferedImage,
      },
    };

    return new Promise(async (resolve, reject) => {
      await visionClient
        .labelDetection(params)
        .then(responseArray => {
          const [response] = responseArray;
          const labels = response.labelAnnotations;
          let descriptions = [];
          labels.forEach(label => descriptions.push(label.description));
          console.log("Image processed. The labels are:", descriptions);
          resolve(descriptions);
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
}

module.exports = ImageAnalyser;
