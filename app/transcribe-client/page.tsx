"use client";

import { useState, useRef } from "react";

export default function TranscribeClient() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Start recording
  const startRecording = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await sendToWhisper(audioBlob);
        // Stop all tracks (microphone)
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err: any) {
      setError("Microphone access denied or not supported.");
      console.error(err);
    }
  };

  // Stop recording and send
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Send audio to your local Whisper API
  const sendToWhisper = async (audioBlob: Blob) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");

    try {
      // 🔥 Point to your Mac's local API
      const res = await fetch("http://localhost:8000/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Transcription failed");
      }

      const data = await res.json();
      setTranscript(data.text);
    } catch (err: any) {
      setError(err.message || "Failed to reach transcription server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🎤 Record & Transcribe (Local Whisper)</h1>

      <div className="flex gap-3 mb-6">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Stop & Transcribe
          </button>
        )}
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <div className="mb-4">Transcribing... (check your Mac terminal)</div>}
      {transcript && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>Transcript:</strong>
          <div className="whitespace-pre-wrap mt-2">{transcript}</div>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600">
        💡 Make sure your local Whisper API is running:  
        <code className="ml-2 bg-gray-200 px-1 rounded">uvicorn server:app --host 0.0.0.0 --port 8000</code>
      </div>
    </div>
  );
}