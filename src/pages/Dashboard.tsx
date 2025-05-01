import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  BarChart3,
  Clock,
  Plus,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  ClipboardList,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import ActivityForm from '../components/ActivityForm';
import DailySchedule from '../components/DailySchedule';
import ProductivityTips from '../components/ProductivityTips';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const userName = user?.user_metadata?.name || 'User';

  // Mock productivity score data
  const productivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Productivity Score',
        data: [65, 72, 78, 69, 85, 75, 82],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Mock time allocation data
  const timeAllocationData = {
    labels: ['Deep Work', 'Meetings', 'Email', 'Social Media', 'Breaks', 'Learning'],
    datasets: [
      {
        data: [35, 20, 15, 10, 10, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Mock recommended tasks
  const recommendedTasks = [
    {
      id: 1,
      title: 'Deep work session',
      time: '9:00 AM - 11:00 AM',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Check emails',
      time: '11:30 AM - 12:00 PM',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Team meeting',
      time: '2:00 PM - 3:00 PM',
      priority: 'high',
    },
    {
      id: 4,
      title: 'Learning session',
      time: '4:00 PM - 5:00 PM',
      priority: 'medium',
    },
  ];
  
  // Schedule insights
  const scheduleInsights = [
    {
      title: 'Optimal focus time',
      description: 'Your most productive hours are between 9:00 AM and 12:00 PM',
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: 'Break pattern',
      description: 'Taking shorter, more frequent breaks could improve your focus',
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
    },
    {
      title: 'Meeting optimization',
      description: 'Consider consolidating meetings to free up deep work blocks',
      icon: <Clock className="h-6 w-6 text-blue-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {userName}
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Here's an overview of your productivity
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Activity
            </button>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'overview'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedTab('schedule')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'schedule'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Schedule
              </button>
              <button
                onClick={() => setSelectedTab('reports')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'reports'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Reports
              </button>
              <button
                onClick={() => setSelectedTab('tips')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'tips'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Tips & Insights
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Productivity Score Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 col-span-1 md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                    Weekly Productivity
                  </h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                    +12% vs last week
                  </span>
                </div>
                <div className="h-64">
                  <Line 
                    data={productivityData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          grid: {
                            color: 'rgba(156, 163, 175, 0.1)',
                          },
                        },
                        x: {
                          grid: {
                            display: false,
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {/* Time Allocation Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  Time Allocation
                </h2>
                <div className="h-[200px] flex items-center justify-center">
                  <Doughnut 
                    data={timeAllocationData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      cutout: '65%',
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            boxWidth: 12,
                            font: {
                              size: 11,
                            },
                            color: document.documentElement.classList.contains('dark') ? 'white' : 'rgb(55, 65, 81)',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recommended Schedule Card */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                    Today's Recommended Schedule
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recommendedTasks.map((task) => (
                    <div key={task.id} className="py-4 flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-4 ${
                        task.priority === 'high' ? 'bg-red-500' : 
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">{task.title}</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{task.time}</p>
                      </div>
                      <button className="ml-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 rounded-b-xl">
                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">Schedule Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {scheduleInsights.map((insight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0">{insight.icon}</div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{insight.title}</h4>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedTab === 'schedule' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DailySchedule />
          </motion.div>
        )}
        
        {selectedTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center">
                <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mr-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Productivity Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">82%</p>
                  <p className="text-xs text-green-600 dark:text-green-400">↑ 8% from last week</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mr-4">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Deep Work Hours</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">24.5</p>
                  <p className="text-xs text-green-600 dark:text-green-400">↑ 3.2 from last week</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center">
                <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-3 mr-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Distraction Events</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">18</p>
                  <p className="text-xs text-red-600 dark:text-red-400">↑ 4 from last week</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detailed Activity Reports</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Your detailed productivity reports will appear here once you track more activities.
                Add your daily activities to get personalized insights and recommendations.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <ClipboardList className="h-5 w-5 mr-2" />
                  Add Your Activities
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Focus Areas</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Deep Work</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Meetings</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email & Admin</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Breaks</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Productivity Improvement</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">Deep Work Improved</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your deep work sessions increased by 15% this week. Great progress!</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">Meeting Overload</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">You spent 20% more time in meetings than optimal. Consider consolidating some meetings.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Zap className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">Energy Management</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your energy levels drop significantly after 3 PM. Consider scheduling important tasks earlier.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedTab === 'tips' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProductivityTips />
          </motion.div>
        )}
      </div>

      {/* Activity Form Modal */}
      {isModalOpen && (
        <ActivityForm onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;