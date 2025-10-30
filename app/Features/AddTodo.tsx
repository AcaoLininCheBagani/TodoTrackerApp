import { useState, useRef } from "react";
import { Plus, Mic } from 'lucide-react';
import { AddTodoProps } from '../entities/todos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
export default function AddTodo({ newTodo, setNewTodo, addTodo }: AddTodoProps) {

   const [transcript, setTranscript] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

  return (
    <Card className="p-6 mb-8 @container/card">
      <div className="flex gap-3">
        <Input
         className="h-10 px-4 text-lg"
          type='text'
          value={newTodo}
          placeholder="Add a new task..."
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.repeat && addTodo()}
        />
        <Button
          variant="outline" size="lg"
          onClick={addTodo}
        >
          <Plus className="w-5 h-5" />
          Add
        </Button>

        <Button
          variant="outline" size="lg"
          // onClick={startRecording}
        >
          <Mic className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  )
}