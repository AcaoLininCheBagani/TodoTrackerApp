import { useRef } from 'react';
import { Plus, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useTodoStore } from "../providers/todo-store-provider";
import TranscribeButton from './TranscribeButton';
import * as motion from "motion/react-client"

export default function AddTodo() {

  const addTodo = useTodoStore((state) => state.addTodo)
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''; // ✅ Safe DOM access
      inputRef.current.focus();    // Optional
    }
  };

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
            type='text'
            ref={inputRef}
            placeholder="Add a new task..."
            onKeyDown={(e) => e.key === 'Enter' && !e.repeat && addTodo(inputRef?.current?.value) && clearInput()}
          />
          <Button
            variant="outline" size="lg"
            onClick={() => {
              addTodo(inputRef?.current?.value),
                clearInput()
            }}
          >
            <Plus className="w-5 h-5" />
            Add
          </Button>
          <TranscribeButton addTodo={addTodo} />
        </div>
      </Card>
    </motion.article>
  )
}