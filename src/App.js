import React, { useState } from "react";
import VideoStream from "./components/VideoStream";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [showStream, setShowStream] = useState(false);

    const initializeWebcam = async () => {
        try {
            // Send a request to initialize the webcam
            const response = await axios.get("http://localhost:5000/webcam");
            if (response.status === 200) {
                console.log(response.data.message); // Logs "Webcam initialized"
                setShowStream(true); // Show the video stream after the webcam is initialized
            }
        } catch (error) {
            console.error("Error initializing webcam:", error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <h1>YOLOv8 Real-Time Weapon Detection</h1>
                {!showStream ? (
                    <div>
                        <p>Click the button below to start the webcam and load the detection system.</p>
                        <button className="btn btn-primary" onClick={initializeWebcam}>
                            Start Webcam
                        </button>
                    </div>
                ) : (
                    <VideoStream />
                )}
            </div>
        </div>
    );
}

export default App;
