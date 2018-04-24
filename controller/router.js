const filesOperator = require('../models/file')
const formidable = require("formidable")
const path = require("path")
const fs = require("fs")
const sd = require('silly-datetime');

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


function showUp(req, res) {
    filesOperator.getAllDirection(function(err,album){
      if(err) {
        res.send(err);
        return;
      }
      res.render("up", {"albums": album})
    })
}
// 上传表单
function doPost(req, res, next) {
  console.log(req.url)
  var form = new formidable.IncomingForm();
  form.uploadDir = path.resolve(__dirname,'../temp')
  form.parse(req, function(err, fields, files) {
    // res.writeHead(200, {'content-type': 'text/plain'});
    // res.write('received upload:\n\n');
    // res.end(util.inspect({fields: fields, files: files}));
    console.log(fields)
    console.log(files)
    // 改名
    if(err) {
      next();
      return;
    }
    // 文件名的重命名采用时间+随机+拓展名
    var randomTime = sd.format(new Date(),"YYYYMMDDHHmmss") + parseInt(Math.random()*899999);
    var extName = path.extname(files.file.name);
    var wenjianjia = fields.wenjianjia;
    var oldpath = files.file.path;
    var newpath = path.resolve(__dirname,"../uploads/"+wenjianjia+"/"+randomTime+extName);
    console.log(files.file.size)
    if(parseInt(files.file.size) > 1024) {
      res.send("图片尺寸应小于1M");
      fs.unlink(files.file.path,err=> {
        // 删除文件失败
      })
      return
    }
    fs.rename(oldpath, newpath, function(err){
      if(err) {
        res.send("改名失败")
        return;
      }
      res.send("上传成功")
    })
  });
}

module.exports= {
  showIndex,
  showAlbum,
  showUp,
  doPost,
}