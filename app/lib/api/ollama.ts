export const callLLM = async (text: string) => {
    try {
        const res = await fetch('http://localhost:8000/llm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        const data = await res.json();
        return data
    } catch (err) {
        console.error('LLM call failed:', err);
        return 'Sorry, I had trouble processing that.'
    }
};

