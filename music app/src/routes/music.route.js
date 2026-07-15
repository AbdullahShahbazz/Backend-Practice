const express = require(`express`)
const authMiddleware = require("../middleware/auth.middleware")
const musicController = require("../controller/music.controller")
const router = express.Router()

const multer = require(`multer`)

const upload = multer({
    storage: multer.memoryStorage()
})

router.post("/upload", authMiddleware.authArtist, upload.single("music") , musicController.createMusic)
router.post("/album", authMiddleware.authArtist , musicController.createAlbum)

router.get("/", authMiddleware.authUser , musicController.getAllMusics)
router.get("/albums", authMiddleware.authUser , musicController.getAllAlbums)
router.get("/albums/:albumId", authMiddleware.authArtist , musicController.getAlbumBId)

module.exports = router