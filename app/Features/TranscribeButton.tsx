'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { useVoiceAgent } from "../lib/hooks/useVoiceAgent";
import { callLLM } from "../lib/api/ollama";

type TodoParams = {
    addTodo: (td: string | undefined) => void
}
export default function TranscribeButton({ addTodo }: TodoParams) {
    const {
        startRecording,
        stopRecording,
        isRecording,
        isTranscribing,
        result,
        error,
    } = useVoiceAgent();

    // Send to LLM when transcription is ready
    useEffect(() => {
        if (result?.text) {
            addTodo(result.text)
            invokeOllama(result.text);
        }
    }, [result]);

    const invokeOllama = async (text: string) => {
        if (text) {
            const response = await callLLM(text);
            console.log(response, 'response')
        }
    };

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