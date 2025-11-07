'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { useVoiceAgent } from "../lib/hooks/useVoiceAgent";
import { callLLM } from "../lib/api/ollama";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AgentButton() {
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

    }, [result]);

    // const invokeOllama = async (text: string) => {
    //     if (text) {
    //         const response = await callLLM(text);
    //         console.log(response, 'response')
    //     }
    // };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Talk with AI Agent:</CardTitle>
                </CardHeader>

                <CardContent>
                    <p>
                        Hit the the mic icon button to start talking with AI Chatbot.
                    </p>

                    <div className="mt-5">
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
                    </div>
                </CardContent>

            </Card>

        </div>
    )
}