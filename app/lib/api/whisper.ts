import { pipeline } from "@huggingface/transformers";

export const sendToWhisper = async (audioURL: string): Promise<string> => {
  try {
    const transcriber = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-tiny.en",
      { dtype: "q8" },
    );
    const output = await transcriber(audioURL);
    console.log(output);
    const transcribedText = Array.isArray(output)
      ? output[0].text
      : output.text;

    return transcribedText;
  } catch (err) {
    console.error("whisper python call failed:", err);
    return "Failed to reach Whisper server";
  }
};
