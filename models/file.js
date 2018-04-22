// 文件相关的所有操作都放在这个文件里面

const fs = require("fs")
const path = require("path")

// 获取所有的文件夹的名字
exports.getAllDirection = function(callback) {
  console.log(path.resolve(__dirname, "../uploads"))
  fs.readdir(path.resolve(__dirname, "../uploads"), (err, files) => {
    if (err) {
      callback(err, null)
      return
    }
    var  allAlbum = [];
    (function iterator(i){
      if(i == files.length) {
        console.log(allAlbum)
        callback(null,allAlbum)
        return;
      }
      fs.stat('./uploads/'+files[i], function(err, state){
        if(state.isDirectory()) {
          allAlbum.push(files[i])
        }
        iterator(i+1)
      })
    })(0)
  })
}

// 获取文件夹内的所有文件的名字
exports.getAllImagesByAlbumName = function(allAlbum, callback) {
  fs.readdir('./uploads/'+allAlbum , function(err, files){
    if(err) {
      callback(err, null)
      return;
    }
    var allImages = [];
    (function iterator(i) {
      console.log(i,files.length);
      if(i == files.length) {
        callback(null, allImages);
        return;
      }
      fs.stat('./uploads/'+allAlbum+"/"+files[i], function(err, state){
        if(state.isFile()) {
          allImages.push(files[i])
        }
        iterator(i+1)
      })
    })(0)
  })
}