import { X } from 'lucide-react';
import { useTodoStore } from '../providers/todo-store-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export default function TodoListEdit() {

    const { editingText, setEditingText, saveEdit, cancelEdit } = useTodoStore((state) => state)

    return (
        <div className="flex items-center gap-3">
            <Input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
            />
            <Button
                onClick={saveEdit}
                variant='outline'
                size='default'
            >
                Save
            </Button>
            <Button
                onClick={cancelEdit}
                variant='outline'
                size='default'
            >
                <X className="w-4 h-4" />
            </Button>
        </div>
    )
}