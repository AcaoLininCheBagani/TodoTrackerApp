import { pipeline } from "@huggingface/transformers";

export const sendToWhisper = async (audioBlob: string): Promise<any> => {
  // 🔥 Point to your Whisper server
  const WHISPER_API_URL =
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:8001/transcribe"
      : "https://YOUR_NGROK_URL.ngrok.io/transcribe"; // ← Replace with your ngrok URL

  // try {
  //     const formData = new FormData();
  //     formData.append('file', audioBlob, 'voice.webm');

  //     const res = await fetch(WHISPER_API_URL, {
  //         method: 'POST',
  //         body: formData,
  //     });

  //     if (!res.ok) {
  //         const err = await res.json().catch(() => ({}));
  //         throw new Error(err.detail || 'Failed to reach Whisper server');
  //     }

  //     return res.json();
  // }
  // catch (err) {
  //     console.error('whisper python call failed:', err);
  //     return 'Failed to reach Whisper server'
  // }
  try {
    // console.log(audioBlob);
    // const arrayBuffer = await audioBlob.arrayBuffer();
    // const audioCtx = new AudioContext();
    // const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    // const audioData = audioBuffer.getChannelData(0);
    const transcriber = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-tiny.en",
      { dtype: "q8" },
    );
    const output = await transcriber(audioBlob);
    console.log(output);
  } catch (err) {
    console.error("whisper python call failed:", err);
    return "Failed to reach Whisper server";
  }
};
