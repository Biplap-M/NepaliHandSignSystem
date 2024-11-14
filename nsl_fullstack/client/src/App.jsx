import React, { useState, useEffect, useRef } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import LinkIcon from "@mui/icons-material/Link";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

function App() {
  const [translatedText, setTranslatedText] = useState("Waiting for translation...");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [spokenText, setSpokenText] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [value, setValue] = useState(0);
  const videoRef = useRef(null);

  // Start camera function
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  // Simulate sign language translation
  useEffect(() => {
    const interval = setInterval(() => {
      const simulatedTranslation = "Hello!";
      setTranslatedText(simulatedTranslation);
      speakText(simulatedTranslation); // Auto-speak the translated text
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Text-to-speech function
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      setSpokenText(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Initialize speech-to-text (speech recognition)
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = "en-US";

      speechRecognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptSegment = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript((prevTranscript) => prevTranscript + transcriptSegment);
          } else {
            interimTranscript += transcriptSegment;
          }
        }
      };

      setRecognition(speechRecognition);
    } else {
      console.error("Speech Recognition not supported.");
      alert("Speech Recognition API is not supported in this browser. Please use Google Chrome.");
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
      setTranscript("Listening...");
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
      setTranscript((prev) => prev + " Stopped Listening.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Section: Camera and Animation Video */}
      <div style={styles.topSection}>
        {/* Camera Feed */}
        <div style={styles.videoContainer}>
          <video ref={videoRef} style={styles.video} autoPlay playsInline></video>
          <button onClick={startCamera} style={styles.button}>
            Start Camera
          </button>
        </div>

        {/* Animation Placeholder */}
        <div style={styles.animationContainer}>
          <h2 style={styles.subheading}>Animation Video</h2>
          <div style={styles.animationVideo}>[Sign Language Animation]</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottomSection}>
        {/* Speech-to-Text Controls and Translated Text */}
        <div style={styles.speechOutputContainer}>
          {/* Speech-to-Text Controls */}
          <div style={styles.buttonGroup}>
            <button onClick={startListening} style={{ ...styles.listenButton, backgroundColor: "#4CAF50" }}>
              <MicIcon /> Start Listening
            </button>
            <button onClick={stopListening} style={{ ...styles.listenButton, backgroundColor: "#f44336" }}>
              <StopIcon /> Stop Listening
            </button>
          </div>
          <p style={styles.transcriptOutput}>{transcript}</p>

          {/* Translated Text */}
          <div style={styles.output}>
            <h2 style={styles.subheading}>Translated Text</h2>
            <p style={styles.translatedText}>{translatedText}</p>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <Paper elevation={3} style={styles.bottomNavContainer}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            showLabels
            style={styles.bottomNav}
          >
            <BottomNavigationAction label="About" icon={<InfoIcon />} onClick={() => window.location.href = "./about_us.html"} />
            <BottomNavigationAction label="Gallery" icon={<PhotoLibraryIcon />} onClick={() => window.location.href = "./gallery.html"} />
            <BottomNavigationAction label="Organization" icon={<LinkIcon />} onClick={() => window.open("https://deafnepal.org.np/", "_blank")} />
          </BottomNavigation>
        </Paper>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    color: "#333",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  topSection: {
    display: "flex",
    width: "100%",
    height: "70%",
    position: "relative",
  },
  videoContainer: {
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "1em",
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  animationContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444",
  },
  animationVideo: {
    width: "100%",
    height: "100%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  bottomSection: {
    height: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: "10px",
  },
  speechOutputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-start",
  },
  listenButton: {
    padding: "10px 20px",
    fontSize: "1em",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  output: {
    textAlign: "left",
    marginLeft: "20px",
  },
  subheading: {
    fontSize: "1.5em",
    color: "#444",
  },
  translatedText: {
    fontSize: "1.6em",
    color: "#4CAF50",
    fontWeight: "bold",
  },
  spokenText: {
    fontSize: "1.4em",
    color: "#FF5722",
    fontWeight: "bold",
  },
  transcriptOutput: {
    fontSize: "1.2em",
    color: "#3f51b5",
    fontWeight: "bold",
    marginTop: "10px",
    textAlign: "left",
  },
  bottomNavContainer: {
    width: "100%",
  },
  bottomNav: {
    backgroundColor: "#FFFFFF",
  },
};

export default App;
