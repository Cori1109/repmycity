let express = require('express');
let router = express.Router();
let multer = require('multer');
let moment = require('moment');

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
    console.log('new uploaded file: ', file);
    res.send(file);
  });

module.exports = router;
