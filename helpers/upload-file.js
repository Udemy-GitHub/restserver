const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadFiles = (files, allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'], directory = '') => {

    return new Promise ((resolve, reject) => {

        const { file } = files
        const arrayFile = file.name.split('.')
        const extension = arrayFile[ arrayFile.length - 1 ]
    
        if (!allowedExtensions.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida. Consulte las siguientes extensiones permitidas: ${allowedExtensions}`)
        }
    
        const nameFile = uuidv4() + `.${extension}`
        const uploadPath = path.join( __dirname, '../uploads/', directory, nameFile )
    
        file.mv(uploadPath, (err) => {
    
            if (err) return reject(err)
    
            resolve(nameFile)

        })

    })

}

module.exports = {
    uploadFiles
}