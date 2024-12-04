import { useState } from "react";
import instance from "../axios";

const FileUpload = ({ onUploadComplete, onLoading }) => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  onLoading(isLoading)

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setUploadStatus("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await instance.post("api/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        setUploadStatus("Upload successful!");
        const { secure_url, public_id } = data.data;

        // Call the parent callback with the upload data
        onUploadComplete({
          url: secure_url,
          publicId: public_id,
          isUploaded: true,
          isLoading,
        });
      } else {
        setUploadStatus("Upload failed. Please try again.");
        onUploadComplete({ isUploaded: false }); // Pass failure status
      }
    } catch (error) {
      setUploadStatus("Error uploading file.");
      console.error(error);
      onUploadComplete({ isUploaded: false }); // Pass failure status
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <input
        type="file"
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-100"
        onChange={handleFileChange}
      />
      {isLoading && <p className="mt-2 text-blue-500">Uploading...</p>}
      {uploadStatus && (
        <p className="mt-2 text-blue-600 text-2xl">{uploadStatus}</p>
      )}
    </div>
  );
};

export default FileUpload;
