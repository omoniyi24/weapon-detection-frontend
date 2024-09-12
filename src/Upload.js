import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [videoSrc, setVideoSrc] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const videoPath = response.data.file_path;
            setVideoSrc(`http://127.0.0.1:5000/video_feed?path=${videoPath}`);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>Upload Video for YOLOv8 Detection</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload and Detect</button>

            {videoSrc && (
                <div>
                    <h2>Detection Results</h2>
                    <img src={videoSrc} alt="YOLOv8 Detection" />
                </div>
            )}
        </div>
    );
}

export default Upload;
