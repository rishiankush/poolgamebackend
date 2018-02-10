/*
 This Api is used for uploading files.
*/
import Busboy from 'busboy';
import { successResponse, failResponse } from '../../Response';
var uploadBeforeAction = function(req, res, next) {
  let files = []; // Store files in an array and then pass them to request.

  if (req.method === 'POST') {
    //console.log(req.body.token)
    // console.log(req.body);

    let busboy = new Busboy({ headers: req.headers });

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      let fileObj = {}; // crate an fileObj object

      fileObj.mimeType = mimetype;
      fileObj.encoding = encoding;
      fileObj.filename = filename;
      // buffer the read chunks
      let buffers = [];

      file.on('data', function(data) {
        buffers.push(data);
      });

      file.on('end', function() {
        // concat the chunks
        fileObj.data = Buffer.concat(buffers);
        // push the image object to the file array
        files.push(fileObj);
      });
    });

    busboy.on('field', function(fieldname, value) {
      req.body[fieldname] = value;
    });

    busboy.on('finish', function() {
      // Pass the file array together with the request
      req.files = files;
      next();
    });

    // Pass request to busboy
    req.pipe(busboy);
  } else {
    this.next();
  }
};

Router.route(
  '/rest/v1/files/upload',
  function() {
    this.response.setHeader('Access-Control-Allow-Origin', '*');
    // this.response.setHeader('Access-Control-Max-Age', '1000');
    // this.response.setHeader('Access-Control-Allow-Headers', ['Content-Type', 'Authorization', 'X-Requested-With']);
    // Meteor.log._('ios test', this.request.headers);
    // Meteor.call('storeLog', this.request.headers);

    let context = this,
      filesData = this.request.files,
      filesUrls = [];
    console.log('request file ******* ', filesData);
    _.each(filesData, file => {
      let newFile = new FS.File();

      newFile.attachData(file.data, { type: file.mimeType }, function(err) {
        newFile.name(file.filename);

        Files.insert(newFile, function(err, fileObj) {
          while (fileObj.url() == null);
          //let ext = fileObj.url().split('/store/files/uploads/'+fileObj._id+'/')[1].split('.').pop();
          filesUrls.push({ _id: fileObj._id, url: fileObj.url(), type: fileObj.type() });
          //console.log(fileObj.url().split('/store/files/uploads/'+fileObj._id+'/')[1]);

          if (filesData.length === filesUrls.length)
            Utility.response(
              context,
              200,
              successResponse({ msg: 'File uploaded successfully', data: filesUrls })
            );
        });
      });
    });
  },
  {
    where: 'server',
    onBeforeAction: uploadBeforeAction,
  }
);