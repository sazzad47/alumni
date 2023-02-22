export const videoUpload = async (videoFile) => {
    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('upload_preset', process.env.CLOUD_UPDATE_PRESET);
    formData.append('resource_type', 'video');
  
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/video/upload`, {
      method: 'POST',
      body: formData,
    });
  
    const data = await response.json();
    return data.secure_url;
  }