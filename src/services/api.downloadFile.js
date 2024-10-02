import { notifyOnSuccess, notifyOnFail } from '../axios.config';

export const downloadImage = async imageUrl => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob(); // Get the image as a blob
    const url = window.URL.createObjectURL(blob); // Create a temporary URL for the blob
    const link = document.createElement('a'); // Create an anchor element
    link.href = url;
    link.setAttribute('download', 'image.jpg'); // Set the filename for download
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Programmatically trigger a click
    link.parentNode.removeChild(link); // Remove the link from the document
    window.URL.revokeObjectURL(url); // Clean up the URL object
    notifyOnSuccess('Image downloaded successfully!');
    return true;
  } catch (error) {
    notifyOnFail('Error downloading the image:');
    console.error(error);
    return false;
  }
};
