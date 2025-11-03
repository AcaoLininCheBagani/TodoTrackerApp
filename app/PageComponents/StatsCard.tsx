import { CheckCircle, Circle } from 'lucide-react';
import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardFooter } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { useTodoStore } from '../providers/todo-store-provider';

export default function StatsCard() {
    const {todos} = useTodoStore((state) => state)

    const stats = {
        total: todos?.length,
        completed: todos?.filter(t => t.completed).length,
        active: todos?.filter(t => !t.completed).length
    };

    const statsArray = [
        { icon: <CheckCircle className="w-8 h-8 text-blue-600" />, name: 'Total Tasks', stat: stats.total, desc: 'Total task within the day' },
        { icon: <CheckCircle className="w-8 h-8 text-green-600" />, name: 'Completed', stat: stats.completed, desc: 'Completed for today' },
        { icon: <Circle className="w-8 h-8 text-orange-600" />, name: 'Active', stat: stats.active, desc: 'Remaining task for today' },
    ];
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statsArray.map((elem, key) => (
                <Card className="@container/card" key={key}>
                    <CardHeader>
                        <CardDescription>{elem.name}</CardDescription>
                        <CardAction>
                            <Avatar>
                                {elem.icon}
                            </Avatar>
                        </CardAction>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {elem.stat}
                        </CardTitle>
                        <div className="text-muted-foreground">
                            {elem.desc}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}