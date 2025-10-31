'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { useVoiceAgent } from "../lib/hooks/useVoiceAgent";

export default function TranscribeButton() {
    const {
        startRecording,
        stopRecording,
        isRecording,
        isTranscribing,
        result,
        error,
    } = useVoiceAgent();

    const [llmResponse, setLlmResponse] = useState('');
    
      // Send to LLM when transcription is ready
    //   useEffect(() => {
    //     if (result?.text) {
    //       callLLM(result.text);
    //     }
    //   }, [result]);
    
    //   const callLLM = async (prompt: string) => {
    //     try {
    //       const res = await fetch('/api/llm', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ prompt }),
    //       });
    //       const data = await res.json();
    //       setLlmResponse(data.response || '');
    //     } catch (err) {
    //       console.error('LLM call failed:', err);
    //       setLlmResponse('Sorry, I had trouble processing that.');
    //     }
    //   };

    if(result){
        console.log('result', result)
    }
    return (
        <>
            {
                !isRecording ? (
                    <Button
                        variant="outline" size="lg"
                        onClick={startRecording}
                    >
                        <Mic className="w-5 h-5" />
                    </Button>
                ) : (

                    <Button
                        variant="destructive" size="lg"
                        onClick={stopRecording}
                    >
                        <MicOff className="w-5 h-5" />
                    </Button>
                )
            }
        </>
    )
}