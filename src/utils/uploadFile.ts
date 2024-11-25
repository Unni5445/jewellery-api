import { containerClient } from '../config/azureConfig';
import path from 'path';

// Function to upload any file (buffer) to Azure Blob Storage and return the URL
export const uploadFileToAzure = async (fileBuffer: Buffer, originalName: string) => {
  try {
    const blobName = `${Math.random()}-${path.basename(originalName)}`; // Generate a unique blob name
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadOptions = {
      blockSize: 4 * 1024 * 1024, // 4MB
      concurrency: 5, // Allow 5 parallel uploads
    };

    // Upload the buffer
    await blockBlobClient.uploadData(fileBuffer,uploadOptions); // Use uploadData for buffers

    // Return the URL of the uploaded file
    const fileUrl = blockBlobClient.url;
    console.log(`File uploaded successfully. URL: ${fileUrl}`);
    
    return fileUrl;
  } catch (error: unknown) {
    console.error("Error uploading file:", (error as Error).message);
    throw error;
  }
};

module.exports = { uploadFileToAzure };
