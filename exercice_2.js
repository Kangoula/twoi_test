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
class ImageColorModifier {

  constructor () {
  }

  // color could be a RGB array ([0,0,0]) 
  //                or RGBA array ([0,0,0,0]) 
  //                or Hexa (#FFFFFF || FFFFFF)
  remove (color) {
  }

  load (filepath) {
  }

  save (filepath) {
  }

}
let imgModifier = new ImageColorModifier()
imgModifier.load('./monImage.rgb') // change path
imgModifier.remove('#FFFFFF') // remove white color
imgModifier.remove([0,0,0]) // remove black color
imgModifier.save('./monImage2.rgb') // change path
