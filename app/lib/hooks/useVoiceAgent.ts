"use client";

import { useState, useRef } from "react";
import { sendToWhisper } from "../api/whisper";
import { audio } from "framer-motion/client";
type TranscriptionResult = {
  text: string;
  language?: string;
  language_probability?: number;
};

export function useVoiceAgent() {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    setResult(null);
    setError(null);
    setIsTranscribing(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });
      audioChunksRef.current = [];
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        setIsTranscribing(true);

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const audioURL = URL.createObjectURL(audioBlob);
        try {
          const whisperResult = await sendToWhisper(audioURL);
          setResult({
            text: whisperResult.text,
            language: whisperResult.language,
            language_probability: whisperResult.language_probability,
          });
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Transcription failed");
          }
        } finally {
          setIsTranscribing(false);
          // Clean up stream
          stream.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Auto-stop after 15 seconds
      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
      }, 15000);
    } catch (err: unknown) {
      setError("Microphone access denied or not supported.");
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      cleanup();
    }
  };

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
    setIsTranscribing(false);
  };

  return {
    startRecording,
    stopRecording,
    isRecording,
    isTranscribing,
    result,
    error,
    cleanup,
  };
}
