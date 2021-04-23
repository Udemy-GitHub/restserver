const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { uploadFiles, documentValidation } = require('../helpers')

const uploadFile = async (req, res) => {

    try {
        
        const file = await uploadFiles(req.files, undefined, 'images')
        
        res.json({
            file
        })
        
    } catch (msg) {
        return res.status(400).json({ msg })
    }

}

const updateFile = async (req, res) => {

    const { collection, id } = req.params
    
    try {
        
        let model = await documentValidation(collection, id)

        if (model.img) {

            const imagePath = path.join(__dirname, '../uploads/', collection, model.img)

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }

        }
        
        const file = await uploadFiles(req.files, undefined, collection)
        
        model.img = file

        await model.save()

        res.json({
            model
        })
        
    } catch (msg) {
        return res.status(400).json({ msg })
    }

}

const getFile = async (req, res) => {
 
    const { collection, id } = req.params

    let model;

    try {
        model = await documentValidation(collection, id)
    } catch (msg) {
        return res.status(400).json({ msg })
    }

    let imagePath;

    if (model.img) {

        imagePath = path.join(__dirname, '../uploads/', collection, model.img)

        if (fs.existsSync(imagePath)) {
            return res.sendFile(imagePath)
        }

    }

    imagePath = path.join(__dirname, '../assets/no-image.jpg')

    if (fs.existsSync(imagePath)) {
        res.status(404).sendFile(imagePath)
    }

}

const updateFileCloudinary = async (req, res) => {

    const { collection, id } = req.params
    
    try {
        
        let model = await documentValidation(collection, id)

        if (model.img) {

            const arrayFile = model.img.split('/')
            const file = arrayFile[arrayFile.length - 1]
            const [ public_id ] = file.split('.')
            cloudinary.uploader.destroy(public_id)
        }
        
        const { tempFilePath } = req.files.file

        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

        model.img = secure_url

        await model.save()

        res.json({
            model
        })
        
    } catch (msg) {
        return res.status(400).json({ msg })
    }

}

module.exports = {
    uploadFile,
    updateFile,
    getFile,
    updateFileCloudinary
}