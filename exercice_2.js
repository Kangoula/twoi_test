// * * * * * * * * * * * * * * * * *
// Two-I: node.js test
// @author: Julien Pirson
// * * * * * * * * * * * * * * * * *

// You will need Linux and Node.js package


// * * * * * * * * * * * * * * * * *
// exercice 2
// * * * * * * * * * * * * * * * * *
//
// Goal:
// You have to create a class ImageColorModifier to load an rgb image
// and remove one or more selected colors then save it.
//
// Example:
var fs = require('fs');

class ImageColorModifier {

  constructor() {
    this.file = null;
    // the image height and width
    this.dimensions = null;
    // the image metadata
    this.header = null;
    // the pixels' colors
    this.pixels = null;
  }

  /**
   * Convert a string representing an hexadecimal value to a decimal value
   *
   * @param {String} hex the hexadecimal number we want to convert
   *
   * @returns {Integer} the converted value to Integer
   */
  hexToDec(hex) {
    return parseInt(hex, 16);
  }

  /**
   * Get the RGB file signature, stores in the first 6 bytes of the file
   */
  extractRgbFileSignature() {
    return this.file.toString('hex', 0, 6);
  }

  /**
   * Get the dimensions stored in the loaded RGB image
   */
  extractDimensions() {
    this.dimensions = {
      /*
       JavaScript Buffer converts the bits to their hexadecimal value
       bytes 0 to 5 are the RGB file signature, so we ingore it here
       Height is stored in bytes 6 and 7
       Width in bytes 8 and 9
      */
      width: this.hexToDec(this.file.toString('hex', 6, 8)),
      height: this.hexToDec(this.file.toString('hex', 8, 10))
    };
    console.log("file dimensions", this.dimensions);
  }

  /**
   * Get the first 512 bytes which contains the image metadata
   */
  extractHeader() {
    this.header = this.file.slice(0, 512);
  }

  /**
   * Get the pixels' colors stored from the 512 byte to the end of the file
   */
  extractPixels() {
    this.pixels = this.file.slice(512, this.file.length);
  }

  /**
   * Convert a hexadecimal String to a RGB array
   *
   * @param {String} color the hexadecimal String which can be '#FFFFFF' or 'FFFFFF'
   *
   * @returns The RGB Array if the color String is valid, null otherwise
   */
  getColorsFromString(color) {
    // look for a hexadecimal color pattern in a string without taking care of the #
    let colors = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return colors ? [colors[1], colors[2], colors[3]].map(this.hexToDec) : null;

  }

  /**
   * Convert a RGB, RGBA array or hexadecimal color to a RGB array
   *
   * @param {Array, String} color the RGB(A) array, or the hexadecimal String
   * [0,0,0] || [0,0,0,0] || '#FFFFFF' || FFFFFF
   *
   * @returns {Array, null} the RGB Array if the params are valid, null otherwise
   */
  convertToRGB(color) {
    let hex;

    switch (color.length) {
      // RGB array
      case 3:
        hex = Array.from(color);
        break;
        // RGBA array
      case 4:
        hex = color.slice(0, 3);
        break;
        // Hexadecimal String
      case 6:
      case 7:
        hex = this.getColorsFromString(color);
        break;
      default:
        hex = null;
    }

    return hex;
  }

  /**
   * Substract the color's value we want to remove to the current color value
   *
   * @param {Integer} current the current color value (from 0 to 255)
   * @param {Integer} toRemove the color we want to remove
   *
   * @returns {Integer} the new color value
   */
  removeColor(current, toRemove) {
    let removed = current - toRemove;
    return removed < 0 ? 0 : removed;
  }

  /**
   * Remove a color from the loaded image
   *
   * @param {Array, String} color the color we wish to remove,
   *  it can be a RGB array, a RGBA array or a hexadecimal String
   */
  remove(color) {
    if (this.pixels.length > 0) {
      let value, r, g, b;
      let length = this.dimensions.width * this.dimensions.height;
      let rgb = this.convertToRGB(color);

      if (rgb) {
        /*
          The RGB file structure stored Red, Green, and Blue values separately
          So the first pixel Red value will be at the first index of the pixels array
          It's Green value will be at stored after all the Red values of the entire image
          It's Blue value will be stored after all the Green values
        */
        for (var i = 0; i < length; i++) {
          r = this.pixels[i];
          g = this.pixels[i + length];
          b = this.pixels[i + length * 2];

          this.pixels[i] = this.removeColor(r, rgb[0]);
          this.pixels[i + length] = this.removeColor(g, rgb[1]);
          this.pixels[i + length * 2] = this.removeColor(b, rgb[2]);
        }
      } else {
        console.error("could not extract color from value:", color);
      }
    } else {
      console.error("error while trying to remove the color:", color, ", no image to edit");
    }
  }

  /**
   * Use the FileSystem API to load synchronously a RGB image
   *
   * @param {String} filepath the path to the file
   */
  load(filepath) {
    this.file = fs.readFileSync(filepath);
    let signature = this.extractRgbFileSignature();
    // check if the image has the RGB file signature
    if (signature === '01da00010003') {

      this.extractDimensions();
      this.extractHeader();
      this.extractPixels();
    } else {
      console.error("the file does not have the correct RGB signature, got:", signature);
    }

  }

  /**
   * Use the FileSystemAPI to write synchronously the edited RGB image
   */
  save(filepath) {
    // reconstruct the complete image
    let buf = Buffer.concat([this.header, this.pixels]);
    fs.writeFileSync(filepath, buf);
  }

}


let imgModifier = new ImageColorModifier();
imgModifier.load('./image.rgb'); // take a simple white image
imgModifier.remove('#0000FF'); // remove blue color
imgModifier.remove([0, 255, 0]); // remove green color
imgModifier.save('./monImage2.rgb'); // save the modified image, it should be red
