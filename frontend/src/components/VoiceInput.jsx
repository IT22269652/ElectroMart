import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceInput = ({ onVoiceResult }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  React.useEffect(() => {
    if (!listening && transcript) {
      onVoiceResult(transcript);
      resetTranscript();
    }
  }, [transcript, listening, onVoiceResult, resetTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => SpeechRecognition.startListening()}
      className={`p-1 rounded-full ${
        listening
          ? "text-red-500 animate-pulse"
          : "text-gray-500 hover:text-blue-500"
      }`}
      aria-label={listening ? "Listening..." : "Start voice input"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
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

export default VoiceInput;
