import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

const VoiceNavigation = ({
  categories = [],
  selectedCategories = [],
  setSelectedCategories = () => {},
  onVoiceCommand = () => {},
}) => {
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const processVoiceCommand = (command) => {
    const lowerCaseCommand = command.toLowerCase();
    let handled = false;

    // Category selection commands
    if (lowerCaseCommand.startsWith("select ")) {
      const category = lowerCaseCommand.replace("select ", "").trim();
      const matchedCategory = categories.find(
        (cat) => cat.toLowerCase() === category
      );

      if (matchedCategory && !selectedCategories.includes(matchedCategory)) {
        setSelectedCategories((prev) => [...prev, matchedCategory]);
        handled = true;
      }
    }
    // Category deselection commands
    else if (lowerCaseCommand.startsWith("deselect ")) {
      const category = lowerCaseCommand.replace("deselect ", "").trim();
      const matchedCategory = categories.find(
        (cat) => cat.toLowerCase() === category
      );

      if (matchedCategory) {
        setSelectedCategories((prev) =>
          prev.filter((cat) => cat !== matchedCategory)
        );
        handled = true;
      }
    }
    // Clear filters command
    else if (
      lowerCaseCommand.includes("clear filter") ||
      lowerCaseCommand.includes("reset filter")
    ) {
      setSelectedCategories([]);
      handled = true;
    }
    // Navigation commands
    else {
      if (
        lowerCaseCommand.includes("home") ||
        lowerCaseCommand.includes("main")
      ) {
        navigate("/");
        handled = true;
      } else if (lowerCaseCommand.includes("about")) {
        navigate("/about");
        handled = true;
      } else if (lowerCaseCommand.includes("contact")) {
        navigate("/contact");
        handled = true;
      } else if (lowerCaseCommand.includes("feedback")) {
        navigate("/feedback");
        handled = true;
      } else if (
        lowerCaseCommand.includes("profile") ||
        lowerCaseCommand.includes("my profile")
      ) {
        navigate("/my-profile");
        handled = true;
      } else if (
        lowerCaseCommand.includes("orders") ||
        lowerCaseCommand.includes("my orders")
      ) {
        navigate("/my-orders");
        handled = true;
      } else if (
        lowerCaseCommand.includes("login") ||
        lowerCaseCommand.includes("sign in")
      ) {
        navigate("/login");
        handled = true;
      }
    }

    return handled;
  };

  React.useEffect(() => {
    if (!listening && transcript) {
      const handled = processVoiceCommand(transcript);
      onVoiceCommand(transcript, handled);
      resetTranscript();
    }
  }, [transcript, listening, resetTranscript]);

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
