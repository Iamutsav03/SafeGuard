import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isAudio = file.mimetype.includes("audio");
    const isImage = file.mimetype.includes("image");

    if (isAudio) cb(null, "./public/audio");
    else if (isImage) cb(null, "./public/images");
    else cb(null, "./public/others");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s+/g, "-").toLowerCase());
  },
});

export const upload = multer({ storage: storage });
