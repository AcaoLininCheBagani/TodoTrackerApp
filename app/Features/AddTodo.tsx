import { useRef } from 'react';
import { Plus, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useTodoStore } from "../providers/todo-store-provider";
import TranscribeButton from './TranscribeButton';
export default function AddTodo() {
  const { addTodo } = useTodoStore((state) => state)
  const inputRef = useRef<HTMLInputElement>(null);
  console.log('render me?')

  const clearInput = () => {
 if (inputRef.current) {
      inputRef.current.value = ''; // ✅ Safe DOM access
      inputRef.current.focus();    // Optional
    }
  };

  return (
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
        {/* <TranscribeButton setNewTodo={setNewTodo} addTodo={addTodo}/> */}
      </div>
    </Card>
  )
}