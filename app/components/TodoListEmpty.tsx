import { CheckCircle } from 'lucide-react';

type Filter = {
    filter: string
}
export default function TodoListEmpty({ filter }: Filter) {
    return (
        <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No tasks found</h3>
            <p className="text-gray-600">
                {filter === 'completed'
                    ? 'You haven\'t completed any tasks yet.'
                    : filter === 'active'
                        ? 'All tasks are completed!'
                        : 'Add your first task to get started.'
                }
            </p>
        </div>
    )
}