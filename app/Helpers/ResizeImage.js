'use strict';
const sharp = require('sharp');
const Common = use('App/Helpers/Common');
const Helpers = use('Helpers');
const fs = require('fs');

class ResizeImage {
  static resize(imgPath, dimensions={small: '200x150', large: '500x350'}) {
    try{
      let fileName = Common.generateString(25) + '.png';
      for (const [key, value] of Object.entries(dimensions)) {
        let dimensions = value.split("x");
        let path=Helpers.publicPath('uploads')+'/'+key;
        let width = (dimensions[0] != undefined) ? dimensions[0] : 100;
        let height = (dimensions[1] != undefined) ? dimensions[1] : width;
        /////////
        fs.mkdir(path, { recursive: true }, (err) => {
          if (err) throw err;
        });
        sharp(imgPath)
          .resize({
            width: parseInt(width),
            height: parseInt(height),
            fit: sharp.fit.cover,
          })
          .png({palette: true, compressionLevel: 8})
          .toFile(path+'/'+fileName);
      }
      return fileName;
    }
    catch (e){
      return '';
    }
  }
}
module.exports = ResizeImage

