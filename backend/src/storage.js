import multer from 'multer'
import mkdirp from 'mkdirp'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsFolder = './uploads/'
    mkdirp(uploadsFolder, err => cb(err, uploadsFolder))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

export const upload = multer({ storage })
