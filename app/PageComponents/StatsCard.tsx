import { CheckCircle, Circle } from 'lucide-react';
import { StatsCardProps } from '../entities/todos';

export default function StatsCard({ stats }: StatsCardProps) {

    const statsArray = [
        { icon: <CheckCircle className="w-6 h-6 text-blue-600" />, name: 'Total Tasks', stat: stats.total },
        { icon: <CheckCircle className="w-6 h-6 text-green-600" />, name: 'Completed', stat: stats.completed },
        { icon: <Circle className="w-6 h-6 text-orange-600" />, name: 'Active', stat: stats.active },
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statsArray.map((elem, key) => (
                <div key={key} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            {elem.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">{elem.name}</p>
                            <p className="text-2xl font-bold text-gray-800">{elem.stat}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}