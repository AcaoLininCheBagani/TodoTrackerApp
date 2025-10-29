import { Plus, Mic } from 'lucide-react';
import { AddTodoProps } from '../entities/todos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
export default function AddTodo({ newTodo, setNewTodo, addTodo }: AddTodoProps) {
  return (
    <Card className="p-6 mb-8">
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
          onClick={addTodo}
        >
          <Mic className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  )
}