/**
 * UploadimageapiController
 *
 * @description :: Server-side logic for managing uploadimageapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  formImage: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="http://202.73.24.123/kopi/senusa/receive_file" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="userfile" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },
  uploadImage: function  (req, res) {
    req.file('avatar').upload({
      dirname: 'http://s3.amazonaws.com/senusamarket/imageproduct/'
      },function (err, uploadedFiles) {
        if (err) return res.negotiate(err);

        return res.json({
          message: uploadedFiles.length + ' file(s) uploaded successfully!'
        });
      });
  }

};
