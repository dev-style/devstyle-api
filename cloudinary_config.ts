require("dotenv").config();
import cloudinary from "cloudinary";



cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.uploads = (file:any , folder:any ,optionsOnUpload ={}) => {

  return new Promise ((resolve) =>{

    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type:"auto",
        folder:folder,
        ...optionsOnUpload
      },
      (error , result) =>{
        resolve({
          url:result?.url,
          secure_url:result?.secure_url
        })
      }
    )


  })

}