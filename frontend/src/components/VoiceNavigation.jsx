import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

const VoiceNavigation = () => {
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Process voice commands
  React.useEffect(() => {
    if (!listening && transcript) {
      const lowerCaseTranscript = transcript.toLowerCase();

      if (
        lowerCaseTranscript.includes("home") ||
        lowerCaseTranscript.includes("main")
      ) {
        navigate("/");
      } else if (lowerCaseTranscript.includes("about")) {
        navigate("/about");
      } else if (lowerCaseTranscript.includes("contact")) {
        navigate("/contact");
      } else if (lowerCaseTranscript.includes("feedback")) {
        navigate("/feedback");
      } else if (
        lowerCaseTranscript.includes("profile") ||
        lowerCaseTranscript.includes("my profile")
      ) {
        navigate("/my-profile");
      } else if (
        lowerCaseTranscript.includes("orders") ||
        lowerCaseTranscript.includes("my orders")
      ) {
        navigate("/my-orders");
      } else if (
        lowerCaseTranscript.includes("login") ||
        lowerCaseTranscript.includes("sign in")
      ) {
        navigate("/login");
      }

      resetTranscript();
    }
  }, [transcript, listening, navigate, resetTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <button
      onClick={SpeechRecognition.startListening}
      className={`p-2 rounded-full ${
        listening ? "text-red-500 animate-pulse" : "text-gray-700"
      }`}
      aria-label={listening ? "Listening..." : "Start voice navigation"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    </button>
  );
};

export default VoiceNavigation;
