import { CheckCircle } from 'lucide-react';

export default function HeaderIcon() {
    return (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Track My Todo</span>
        </div>
    )
}