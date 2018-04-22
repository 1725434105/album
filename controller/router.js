const filesOperator = require('../models/file')

function showIndex(req, res) {
  filesOperator.getAllDirection(function(err,album){
    if(err) {
      res.send(err);
      return;
    }
    res.render("index", {"albums": album})
  })
}

function showAlbum(req, res) {
  // 编译相册中的所有图片
  var albumName = req.params.album;
  filesOperator.getAllImagesByAlbumName(albumName, function(err,imagesArray){
    if(err) {
      res.send(err);
      return;
    }
    res.render("album", {
      "albumName": albumName,
      "images": imagesArray
    })
  })
  // 具体操作交给model
}
// module.exports = {
//   showIndex
// }
module.exports= {
  showIndex,
  showAlbum
}