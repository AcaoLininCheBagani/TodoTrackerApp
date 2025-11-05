export const sendToWhisper = async (audioBlob: Blob): Promise<any> => {
    // 🔥 Point to your Whisper server
    const WHISPER_API_URL =
        typeof window !== 'undefined' && window.location.hostname === 'localhost'
            ? 'http://localhost:8001/transcribe'
            : 'https://YOUR_NGROK_URL.ngrok.io/transcribe'; // ← Replace with your ngrok URL

    try {
        const formData = new FormData();
        formData.append('file', audioBlob, 'voice.webm');

        const res = await fetch(WHISPER_API_URL, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.detail || 'Failed to reach Whisper server');
        }

        return res.json();
    }
    catch (err) {
        console.error('whisper python call failed:', err);
        return 'Failed to reach Whisper server'
    }
};