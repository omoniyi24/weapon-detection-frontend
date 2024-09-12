import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const WebcamCapture = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        const getVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                setStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing the webcam: ", error);
            }
        };

        getVideo();
    }, []);

    // Function to capture frames and send them to the backend
    const captureFrameAndSend = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append("frame", blob, "frame.jpg");

                try {
                    await axios.post("http://localhost:5000/webcam", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                } catch (error) {
                    console.error("Error sending frame to backend:", error);
                }
            }, "image/jpeg");
        }
    };

    useEffect(() => {
        const intervalId = setInterval(captureFrameAndSend, 1000); // Capture every second
        return () => clearInterval(intervalId); // Clean up on unmount
    }, [stream]);

    return (
        <div>
            <h2>Webcam Stream</h2>
            <video ref={videoRef} autoPlay muted width="800px" height="500px"></video>
            <canvas ref={canvasRef} style={{ display: "none" }} width="800px" height="500px"></canvas>
        </div>
    );
};

export default WebcamCapture;
