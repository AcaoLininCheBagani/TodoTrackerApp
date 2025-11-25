import { useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useTodoStore } from "../providers/todo-store-provider";
import TranscribeButton from "./TranscribeButton";
import * as motion from "motion/react-client";
import { useVoiceAgent } from "../lib/hooks/useVoiceAgent";
export default function AddTodo() {
  const {
    startRecording,
    stopRecording,
    isRecording,
    isTranscribing,
    result,
    error,
  } = useVoiceAgent();
  const { addTodo, loading } = useTodoStore((state) => state);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // ✅ Safe DOM access
      inputRef.current.focus(); // Optional
    }
  };

  useEffect(() => {
    if (result && inputRef.current) {
      console.log(result, "test");
      inputRef.current.value = result;
    }
  }, [result]);
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      <Card className="p-6 mb-8 @container/card">
        <div className="flex gap-3">
          <Input
            className="h-10 px-4 text-lg"
            type="text"
            ref={inputRef}
            placeholder="Add a new task..."
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.repeat &&
              addTodo(inputRef?.current?.value) &&
              clearInput()
            }
          />
          <Button
            disabled={loading}
            variant="outline"
            size="lg"
            onClick={() => {
              addTodo(inputRef?.current?.value);
              clearInput();
            }}
          >
            <Plus className="w-5 h-5" />
            Add
          </Button>
          <TranscribeButton
            startRecording={startRecording}
            stopRecording={stopRecording}
            isRecording={isRecording}
          />
        </div>
      </Card>
    </motion.article>
  );
}
