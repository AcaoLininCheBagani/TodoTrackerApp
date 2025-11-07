// components/VoiceVisualizer.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

interface VoiceVisualizerProps {
  barCount?: number;
  barWidth?: number;
  barGap?: number;
  sensitivity?: number;
  className?: string;
}

const VoiceVisualizer = ({
  barCount = 10,
  barWidth = 8,
  barGap = 2,
  sensitivity = 2.5,
  className = ''
}: VoiceVisualizerProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bars, setBars] = useState<number[]>(Array(barCount).fill(0));
  
  // Type-safe refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      setError(null);
      
      // Initialize audio context
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
      }

      // Get microphone stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Setup analyzer
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 64; // Smaller buffer for simplicity
      analyserRef.current = analyser;

      // Connect microphone to analyzer
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsRecording(true);
      animate();
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Microphone access denied. Please allow permissions.';
      
      setError(errorMessage);
      console.error('Microphone error:', err);
    }
  };

  const stopRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    setIsRecording(false);
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setBars(Array(barCount).fill(0));
  };

  const animate = () => {
    if (!analyserRef.current || !isRecording) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Map frequency data to bar heights
    const newBars = Array.from({ length: barCount }, (_, index) => {
      const dataIndex = Math.floor(index * bufferLength / barCount);
      return Math.min(120, dataArray[dataIndex] / sensitivity); // Cap max height
    });

    setBars(newBars);
    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className={`flex flex-col items-center p-4 ${className}`}>
      <div 
        className="flex mb-4" 
        style={{ gap: `${barGap}px`, height: '96px' }}
      >
        {bars.map((height, i) => (
          <div
            key={i}
            className="bg-blue-500 rounded-sm transition-all duration-100"
            style={{ 
              width: `${barWidth}px`,
              height: `${height}px`
            }}
          />
        ))}
      </div>
      
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-4 rounded-full mb-2 transition-colors ${
          isRecording 
            ? 'bg-red-500 animate-pulse' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        {isRecording ? '⏹️' : '🎤'}
      </button>
      
      {error && <p className="text-red-500 text-sm mt-1 min-h-5">{error}</p>}
      <p className="text-gray-400 text-sm min-h-5">
        {isRecording ? 'Listening...' : 'Click microphone to start'}
      </p>
    </div>
  );
};

export default VoiceVisualizer;