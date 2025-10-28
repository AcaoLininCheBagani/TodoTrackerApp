"use client";
import { Save } from 'lucide-react';
import { useState } from 'react';
import { Settings } from '../entities/todos';

export default function ProfileSetting() {
    const [settings, setSettings] = useState<Settings>({
        notifications: true,
        darkMode: false,
        emailNotifications: true,
        autoSave: true
    });
    const handleSettingsChange = (key: string, value: boolean) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const saveSettings = () => {
        console.log('Settings saved:', settings);
        alert('Settings saved successfully!');
    };
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-800">Notifications</h3>
                                <p className="text-sm text-gray-600">Receive notifications for task updates</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={(e) => handleSettingsChange('notifications', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-800">Email Notifications</h3>
                                <p className="text-sm text-gray-600">Receive email notifications for important updates</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) => handleSettingsChange('emailNotifications', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-800">Auto Save</h3>
                                <p className="text-sm text-gray-600">Automatically save changes to your tasks</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.autoSave}
                                    onChange={(e) => handleSettingsChange('autoSave', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-800">Dark Mode</h3>
                                <p className="text-sm text-gray-600">Switch to dark theme for better viewing</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.darkMode}
                                    onChange={(e) => handleSettingsChange('darkMode', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <button
                                onClick={saveSettings}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 font-medium"
                            >
                                <Save className="w-5 h-5" />
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}