"use client"
import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, CheckCircle, Circle, Trash2, Edit3, X, User, Settings, LogOut, Menu, Home, BarChart3, Calendar, Bell, Search, Filter, TrendingUp, Users, Activity, Clock, ChevronDown, Save, Eye, EyeOff } from 'lucide-react';
import { Todos, Analytics, Completion } from '../entities/todos';
import AgentButton from '../Features/AgentButton';

export default function Dashboard() {
    const [todos, setTodos] = useState<Todos[]>([
        { id: 1, text: 'Complete project proposal', completed: false, priority: 'high', createdAt: '2024-01-15' },
        { id: 2, text: 'Review team submissions', completed: true, priority: 'medium', createdAt: '2024-01-14' },
        { id: 3, text: 'Schedule client meeting', completed: false, priority: 'high', createdAt: '2024-01-16' },
        { id: 4, text: 'Update documentation', completed: false, priority: 'low', createdAt: '2024-01-17' },
        { id: 5, text: 'Deploy new features', completed: true, priority: 'high', createdAt: '2024-01-13' },
        { id: 6, text: 'Code review', completed: false, priority: 'medium', createdAt: '2024-01-18' },
    ]);
    // Analytics data
    const [analyticsData, setAnalyticsData] = useState<Analytics[]>([]);
    const [completionData, setCompletionData] = useState<Completion[]>([]);

    const stats = {
        total: todos.length,
        completed: todos.filter(t => t.completed).length,
        active: todos.filter(t => !t.completed).length,
        completionRate: todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0
    };

    useEffect(() => {
        // Generate mock analytics data
        const generateAnalyticsData = () => {
            const data = [];
            const today = new Date();
            for (let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const dateString = date.toISOString().split('T')[0];
                const tasks = todos.filter(t => t.createdAt === dateString);
                const completed = tasks.filter(t => t.completed).length;
                const total = tasks.length;
                data.push({
                    date: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    completed,
                    total,
                    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
                });
            }
            return data;
        };

        const generateCompletionData = () => {
            const priorityCounts: Record<'high' | 'medium' | 'low', { completed: number, total: number }> = {
                high: { completed: 0, total: 0 },
                medium: { completed: 0, total: 0 },
                low: { completed: 0, total: 0 }
            };

            todos.forEach(todo => {
                priorityCounts[todo.priority].total++;
                if (todo.completed) {
                    priorityCounts[todo.priority].completed++;
                }
            });

            return Object.keys(priorityCounts).map(priority => ({
                name: priority.charAt(0).toUpperCase() + priority.slice(1),
                completed: priorityCounts[priority as keyof typeof priorityCounts].completed,
                pending: priorityCounts[priority as keyof typeof priorityCounts].total - priorityCounts[priority as keyof typeof priorityCounts].completed
            }));
        };

        setAnalyticsData(generateAnalyticsData());
        setCompletionData(generateCompletionData());
    }, [todos]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">

            <div className="space-y-8">
                {/* AI Agent */}
                <AgentButton/>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">{stats.completed}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active</p>
                                <p className="text-3xl font-bold text-orange-600 mt-1">{stats.active}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                                <p className="text-3xl font-bold text-purple-600 mt-1">{stats.completionRate}%</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Task Completion</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analyticsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="date" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="completed"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        name="Completed Tasks"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        name="Total Tasks"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks by Priority</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={completionData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="name" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="completed" fill="#10B981" name="Completed" />
                                    <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div> */}

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {todos.slice(0, 5).map(todo => (
                            <div key={todo.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className={`w-2 h-2 rounded-full ${todo.completed ? 'bg-green-500' : todo.priority === 'high' ? 'bg-red-500' : todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}></div>
                                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                    {todo.text}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {new Date(todo.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}