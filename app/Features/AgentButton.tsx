"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
export default function VoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Get speech recognition class
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("❌ Web Speech API not supported in this browser.");
      console.error("❌ Web Speech API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.trim();
        console.log(event.results, "hey");
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
          console.log("🗣 Final:", transcript);
        } else {
          interimTranscript += transcript;
        }
      }

      if (interimTranscript) console.log("🎙 Interim:", interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("🛑 Stopped listening");
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      console.log("🎧 Listening...");
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Web Speech API Demo</h1>

      <div className="space-x-2">
        <button
          onClick={startListening}
          disabled={isListening}
          className={`px-4 py-2 rounded ${
            isListening
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Start Listening
        </button>

        <button
          onClick={stopListening}
          disabled={!isListening}
          className={`px-4 py-2 rounded ${
            !isListening
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          Stop Listening
        </button>
      </div>

      {isListening && (
        <p className="mt-4 text-green-600">
          Listening... <span className="animate-pulse">●</span>
        </p>
      )}
    </div>
  );
}
