const jimp = require("jimp");

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

/**
 * Applies a sobel edge detector and returns the resulting gradient magnitude image.
 * @param {any} image The jimp image to apply the sobel operation on.
 */
function sobel(image) {
  const height = image.bitmap.height;
  const width = image.bitmap.width;
  const horizontalFilter = [[1, 2, 1], [0, 0, 0], [-1, -2, -1]];
  const verticalFilter = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
  let sobelHorizontal = image.clone().convolute(horizontalFilter);
  let sobelVertical = image.clone().convolute(verticalFilter);
  const threshold = 128;
  // Calculates the gradient magnitude from the horizontal and vertical sobel operators.
  return image.scan(0, 0, width, height, (x, y, index) => {
    let sobelVerticalValue = sobelVertical.bitmap.data[index];
    let sobelHorizontalValue = sobelHorizontal.bitmap.data[index];
    let gradient = Math.sqrt(sobelVerticalValue ** 2 + sobelHorizontalValue ** 2);
    gradient = gradient > threshold ? 255 : 0;
    image.bitmap.data[index] = image.bitmap.data[index + 1] = image.bitmap.data[index + 2] = gradient;
  });
}

/**
 * Determines the skew angle of an image that contains some text using the Hough transform
 * and rotates it to account for this skew.
 * @param {string} imageUrl The location of the image to deskew.
 * @param {number} options Options for the hough transform and replacement of transparent pixels.
 * @param {number} options.precision Determines the level of precision used in the Hough transform.
 * A lower value will be more precise, but will take longer to run.
 * @param {number} options.fillColour The colour in hex format (0xFFFFFFFF) to use in place of
 * the transparent pixels that result from the image rotation.
 */
async function deskew(imageUrl, options = {}) {
  let { precision = 0.1, fillColour } = options;
  let image = await jimp.read(imageUrl);
  let height = image.bitmap.height;
  let width = image.bitmap.width;
  let edges = sobel(image.clone());

  let theta = [];
  let cosTheta = [];
  let sinTheta = [];
  for (let i = -90; i <= 90 - precision; i += precision) {
    let radians = degreesToRadians(i);
    cosTheta.push(Math.cos(radians));
    sinTheta.push(Math.sin(radians));
    theta.push(i);
  }

  let rho = [];
  let imageDistance = Math.ceil(Math.sqrt((width - 1) ** 2 + (height - 1) ** 2));
  for (let i = -imageDistance; i <= imageDistance; i++) {
    rho.push(i);
  }

  let accumulator = new Array(rho.length);
  for (let i = 0; i < accumulator.length; i++) {
    accumulator[i] = new Array(theta.length).fill(0);
  }

  // Fills in the accumulator array with votes.
  let maxVote = 0;
  let bestAngle;
  for (let y = 2; y < height - 2; y++) {
    for (let x = 2; x < width - 2; x++) {
      let pixelIndex = edges.getPixelIndex(x, y);
      let pixelValue = edges.bitmap.data[pixelIndex];
      if (pixelValue == 255) {
        for (let i = 0; i < theta.length; i++) {
          let row = Math.round(x * cosTheta[i] + y * sinTheta[i]) + imageDistance;
          accumulator[row][i]++;
          // Keeps track of the angle with the most votes associated with it from the accumulator array.
          if (accumulator[row][i] > maxVote) {
            maxVote = accumulator[row][i];
            bestAngle = theta[i];
          }
        }
      }
    }
  }

  // Calculates the angle to rotate by depending on the quadrant that the calculated skew angle is in.
  let angle = bestAngle < 0 ? -(Math.abs(bestAngle) - 90) : bestAngle - 90;
  let deskewedImage = image.clone().rotate(angle);

  let paddedImage = replaceAlpha(deskewedImage, fillColour);

  return paddedImage;
}

/**
 * Replaces all the transparent pixels in an image with a specified colour.
 * Transparent here means that the pixel alpha value is 1.0.
 * @param {any} image The image to process.
 * @param {number} paddingColour The colour to replace the transparent pixels with. 
 */
function replaceAlpha(image, paddingColour = 0xFFFFFFFF) {
  return image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, index) => {
    let pixelAlphaValue = image.bitmap.data[index + 3];
    if (pixelAlphaValue === 0) {
      image.setPixelColor(paddingColour, x, y);
    }
  });
}

module.exports = deskew;
