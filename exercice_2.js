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

  constructor () {
    this.file = null;
    this.dimensions = null;
    this.header = null;
    this.pixels = null;
  }

  hexToDec (hex) {
    return parseInt("0x" + hex);
  }

  extractDimensions () {
    this.dimensions = {width: this.hexToDec(this.file.toString('hex', 6,8)),
                       height: this.hexToDec(this.file.toString('hex',8,10))};
  }

  extractHeader () {
    this.header = this.file.slice(0,512).toString('hex');
  }

  extractPixels () {
    this.pixels = this.file.slice(512,this.file.length);
  }

  // color could be a RGB array ([0,0,0]) 
  //                or RGBA array ([0,0,0,0]) 
  //                or Hexa (#FFFFFF || FFFFFF)
  remove (color) {
    let value,r,g,b;
    let factor3length = this.pixels.length / 3;

    for(var i=0; i < factor3length; i++){
      r = this.pixels[i];
      g = this.pixels[i + factor3length];
      b = this.pixels[i + factor3length * 2];

    }
  }

  load (filepath) {
    this.file = fs.readFileSync(filepath);
    // check if the image has the RGB file signature
    if( this.file.toString('hex',0,6) === '01da00010003'){

      this.extractDimensions();
      this.extractHeader();
      this.extractPixels();
    }

  }

  save (filepath) {
  }

}
let imgModifier = new ImageColorModifier()
imgModifier.load('./tt.rgb') // change path
imgModifier.remove('#FFFFFF') // remove white color
//imgModifier.remove([0,0,0]) // remove black color
imgModifier.save('./monImage2.rgb') // change path
