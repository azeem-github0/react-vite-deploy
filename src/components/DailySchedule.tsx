import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Plus } from 'lucide-react';

// Time slots for the schedule
const timeSlots = [
  '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
  '7:00 PM', '8:00 PM', '9:00 PM'
];

// Mock schedule data
const mockSchedule = [
  {
    id: 1,
    title: 'Morning Routine',
    startTime: '7:00 AM',
    endTime: '8:00 AM',
    category: 'personal',
    color: 'bg-purple-500',
  },
  {
    id: 2,
    title: 'Deep Work Session',
    startTime: '8:30 AM',
    endTime: '10:30 AM',
    category: 'work',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    title: 'Team Stand-up',
    startTime: '11:00 AM',
    endTime: '11:30 AM',
    category: 'meeting',
    color: 'bg-green-500',
  },
  {
    id: 4,
    title: 'Lunch Break',
    startTime: '12:00 PM',
    endTime: '1:00 PM',
    category: 'break',
    color: 'bg-yellow-500',
  },
  {
    id: 5,
    title: 'Project Planning',
    startTime: '1:30 PM',
    endTime: '3:00 PM',
    category: 'work',
    color: 'bg-blue-500',
  },
  {
    id: 6,
    title: 'Email & Communication',
    startTime: '3:30 PM',
    endTime: '4:30 PM',
    category: 'email',
    color: 'bg-orange-500',
  },
  {
    id: 7,
    title: 'Learning Session',
    startTime: '5:00 PM',
    endTime: '6:00 PM',
    category: 'learning',
    color: 'bg-pink-500',
  },
];

const DailySchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week'>('day');

  // Format the date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Move to previous/next day or week
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    const days = view === 'day' ? 1 : 7;
    
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - days);
    } else {
      newDate.setDate(newDate.getDate() + days);
    }
    
    setCurrentDate(newDate);
  };

  // Find events for a given time slot
  const getEventsForTimeSlot = (timeSlot: string) => {
    return mockSchedule.filter(event => {
      const eventStartHour = parseInt(event.startTime.split(':')[0]);
      const eventStartPeriod = event.startTime.split(' ')[1];
      const slotHour = parseInt(timeSlot.split(':')[0]);
      const slotPeriod = timeSlot.split(' ')[1];
      
      // Convert to 24 hour format for comparison
      const eventHour24 = eventStartPeriod === 'PM' && eventStartHour !== 12 
        ? eventStartHour + 12 
        : eventStartPeriod === 'AM' && eventStartHour === 12 
          ? 0 
          : eventStartHour;
      
      const slotHour24 = slotPeriod === 'PM' && slotHour !== 12 
        ? slotHour + 12 
        : slotPeriod === 'AM' && slotHour === 12 
          ? 0 
          : slotHour;
      
      return eventHour24 === slotHour24;
    });
  };

  // Calculate event duration in hours
  const getEventDuration = (event: typeof mockSchedule[0]) => {
    const startHour = parseInt(event.startTime.split(':')[0]);
    const startMinute = parseInt(event.startTime.split(':')[1].split(' ')[0]);
    const startPeriod = event.startTime.split(' ')[1];
    
    const endHour = parseInt(event.endTime.split(':')[0]);
    const endMinute = parseInt(event.endTime.split(':')[1].split(' ')[0]);
    const endPeriod = event.endTime.split(' ')[1];
    
    // Convert to 24 hour format
    const startHour24 = startPeriod === 'PM' && startHour !== 12 
      ? startHour + 12 
      : startPeriod === 'AM' && startHour === 12 
        ? 0 
        : startHour;
    
    const endHour24 = endPeriod === 'PM' && endHour !== 12 
      ? endHour + 12 
      : endPeriod === 'AM' && endHour === 12 
        ? 0 
        : endHour;
    
    // Calculate duration in hours
    const hourDiff = endHour24 - startHour24;
    const minuteDiff = (endMinute - startMinute) / 60;
    
    return hourDiff + minuteDiff;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <button
              onClick={() => navigateDate('prev')}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous day"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            
            <h2 className="mx-4 text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
              {formatDate(currentDate)}
            </h2>
            
            <button
              onClick={() => navigateDate('next')}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next day"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setView('day')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  view === 'day'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  view === 'week'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Week
              </button>
            </div>
            
            <button className="inline-flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200">
              <Plus className="h-4 w-4 mr-1" />
              Add Event
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {view === 'day' ? (
          <div className="space-y-2 overflow-y-auto max-h-[600px]">
            {timeSlots.map((timeSlot, index) => {
              const events = getEventsForTimeSlot(timeSlot);
              
              return (
                <div key={index} className="flex">
                  <div className="w-16 flex-shrink-0 flex flex-col items-center">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                      {timeSlot}
                    </div>
                    <div className="flex-grow border-r border-gray-200 dark:border-gray-700 ml-2"></div>
                  </div>
                  
                  <div className="flex-grow pl-4 py-2">
                    {events.length > 0 ? (
                      <div className="space-y-2">
                        {events.map(event => (
                          <div
                            key={event.id}
                            className={`rounded-lg p-3 ${event.color} text-white hover:shadow-md transition-shadow cursor-pointer`}
                            style={{ height: `${Math.max(getEventDuration(event) * 60, 60)}px` }}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm mt-1 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.startTime} - {event.endTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-16 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center">
                        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                          + Add activity
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Weekly view will be implemented in a future update.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailySchedule;