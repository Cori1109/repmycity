let express = require('express');
let router = express.Router();
let multer = require('multer');
let moment = require('moment');
let gm = require('gm');

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename(req, file, cb) {
    cb(null, `${moment().format('DD-MM-YYYY')}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.route('/file')
  .post(upload.single('file'), function (req, res) {
    const file = req.file;
    const uploadedImage = 'public/uploads/' + file.filename;
    const backgroundImage = 'app/assets/images/01-anvil-880-front-shadows.png';
    console.log('new uploaded file: ', file);

    console.log('combining images into 1...');
    console.log('using uploaded image: ', uploadedImage);
    console.log('using background image: ', backgroundImage);

    let dropzoneOffsetX = 300;
    let dropzoneOffsetY = 250;

    let uploadedImageWidth = 253;
    let uploadedImageHeight = 253;
    let uploadedImageOffsetX = dropzoneOffsetX + 0;
    let uploadedImageOffsetY = dropzoneOffsetY + 0;

    gm()
      .subCommand('composite')
      .in('-geometry', `${uploadedImageWidth}x${uploadedImageWidth}+${uploadedImageOffsetX}+${uploadedImageOffsetY}`)
      .in(uploadedImage)
      .in(backgroundImage)
      .write('test.png', function(err, stdout, stderr, command){
        if (err){
            console.log('image conversion error!');
            console.log(err);
            console.log(command);
        }else{
            console.log('image converted with command :');
            console.log(command);
        }
      });

    res.send(file);
  });

module.exports = router;
