import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv'

dotenv.config()
// Replace with your actual connection string and container name
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!AZURE_STORAGE_CONNECTION_STRING || !AZURE_STORAGE_CONTAINER_NAME) {
  throw new Error("Azure Storage connection string or container name is not set.");
}

// Create BlobServiceClient instance
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Get the container client
export const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);

module.exports = { containerClient };
