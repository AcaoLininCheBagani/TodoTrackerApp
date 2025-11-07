import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';
import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardFooter } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { useTodoStore } from '../providers/todo-store-provider';

export default function StatsCard() {
    const { todos } = useTodoStore((state) => state)

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
                <motion.div
                    // key={key}
                    // initial={{ opacity: 0, y: 20 }}
                    // animate={{ opacity: 1, y: 0 }}
                    // transition={{ duration: 0.3 }}
                    // whileHover={{ y: -5 }}
                    key={key}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: key * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                >
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>{elem.name}</CardDescription>
                            <CardAction>
                                <motion.div
                                    key={elem.stat} // This triggers animation when stat changes
                                    initial={{ scale: 0.8, rotate: -10 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Avatar>
                                        {elem.icon}
                                    </Avatar>
                                </motion.div>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <motion.div
                                key={elem.stat} // Triggers animation when number changes
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {elem.stat}
                                </CardTitle>
                            </motion.div>
                            <div className="text-muted-foreground">
                                {elem.desc}
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
// export default function StatsCard() {
//   const { todos } = useTodoStore((state) => state);

//   const stats = {
//     total: todos?.length ?? 0,
//     completed: todos?.filter((t) => t.completed).length ?? 0,
//     active: todos?.filter((t) => !t.completed).length ?? 0,
//   };

//   const statsArray = [
//     {
//       icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
//       name: 'Total Tasks',
//       stat: stats.total,
//       desc: 'Total tasks within the day',
//     },
//     {
//       icon: <CheckCircle className="w-8 h-8 text-green-600" />,
//       name: 'Completed',
//       stat: stats.completed,
//       desc: 'Completed for today',
//     },
//     {
//       icon: <Circle className="w-8 h-8 text-orange-600" />,
//       name: 'Active',
//       stat: stats.active,
//       desc: 'Remaining tasks for today',
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//       {statsArray.map((elem, key) => (
//         <motion.div
//           key={key}
//           initial={{ opacity: 0, y: 20, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.4, delay: key * 0.1 }}
//           whileHover={{ scale: 1.03 }}
//         >
//           <Card className="transition-shadow hover:shadow-lg cursor-pointer">
//             <CardHeader className="flex items-center justify-between">
//               <CardDescription>{elem.name}</CardDescription>
//               <motion.div
//                 whileHover={{ rotate: 10, scale: 1.1 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               >
//                 <Avatar>{elem.icon}</Avatar>
//               </motion.div>
//             </CardHeader>
//             <CardFooter className="flex-col items-start gap-1.5 text-sm">
//               <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//                 <motion.span
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 + key * 0.1 }}
//                 >
//                   {elem.stat}
//                 </motion.span>
//               </CardTitle>
//               <div className="text-muted-foreground">{elem.desc}</div>
//             </CardFooter>
//           </Card>
//         </motion.div>
//       ))}
//     </div>
//   );
// }
