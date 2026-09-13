import ImageKit from "@imagekit/nodejs"
import dotenv from "dotenv"
import multer from "multer";
dotenv.config();

const imageKit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY 
})

const upload = multer({
    storage: multer.memoryStorage()
});

async function fileUpload(filebuffer,fileName){
    const storage = await imageKit.files.upload({
        file: filebuffer.toString("base64"),
        fileName: fileName
    })
 return storage ;
}

export {fileUpload,upload};