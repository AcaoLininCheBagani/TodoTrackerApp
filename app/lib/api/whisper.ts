import { pipeline } from "@huggingface/transformers";

export const sendToWhisper = async (audioBlob: string): Promise<any> => {
    try {
        const transcriber = await pipeline(
            "automatic-speech-recognition",
            "Xenova/whisper-tiny.en",
            { dtype: "q8" },
        );
        const output = await transcriber(audioBlob);
        console.log(output); 
        const transcribedText = Array.isArray(output) ? output[0].text : output.text;

       // For more complex extraction, use a model trained on similar tasks
        const extractor = await pipeline(
            "text2text-generation",
            "Xenova/t5-small" // Or try other T5 variants
        );
        
        const extractionPrompt = `Extract todo item from: ${transcribedText}`;
        const extracted = await extractor(extractionPrompt, {
            max_new_tokens: 30
        });
        console.log(extracted)
        // const user_intents = ['add', 'update', 'delete'];

        // for (let keyword of user_intents) {
        //     if (text.match(keyword)) {
        //         console.log(keyword)
        //     }
        // }
    } catch (err) {
        console.error("whisper python call failed:", err);
        return "Failed to reach Whisper server";
    }
};
