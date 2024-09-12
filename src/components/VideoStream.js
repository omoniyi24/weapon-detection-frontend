import React, { useEffect, useRef } from "react";

const VideoStream = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Directly set the src of the video element to the streaming endpoint
        if (videoRef.current) {
            videoRef.current.src = "http://localhost:5000/webapp"; // Flask stream endpoint
        }
    }, []);

    return (
        <div>
            <h2>Real-Time Weapon Detection</h2>
            {/* AutoPlay and muted for real-time display */}
            <video ref={videoRef} autoPlay muted controls width="800px" height="500px">
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoStream;
