"use client";

import React from "react";
import Link from "next/link";
import { BookText, Calendar, MessageSquare, Users, PenSquare, Bell, ImagePlus } from "lucide-react";



interface AdminProps {
  stats: {
    posts: number;
    events: number;
    messages: number;
    testimonies: number;
  };
  recentSermons: SermonT[];
}

const Admin: React.FC<AdminProps> = ({ stats, recentSermons }: AdminProps) => {
  const statsData = [
    { title: "Published Posts", value: stats.posts.toString(), icon: <BookText size={20} />, color: "bg-blue-500" },
    { title: "Upcoming Events", value: stats.events.toString(), icon: <Calendar size={20} />, color: "bg-green-500" },
    { title: "Pending Messages", value: stats.messages.toString(), icon: <MessageSquare size={20} />, color: "bg-yellow-500" },
    { title: "New Testimonies", value: stats.testimonies.toString(), icon: <Users size={20} />, color: "bg-purple-500" },
  ];

  const quickActions = [
    { name: 'New Post', icon: <PenSquare size={16} />, href: '/admin/blogs' },
    { name: 'Add Event', icon: <Calendar size={16} />, href: '/admin/events' },
    { name: 'Upload Sermon', icon: <ImagePlus size={16} />, href: '/admin/srmon/' },
    { name: 'Announcements', icon: <Bell size={16} />, href: '/admin/newsletter' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to KLIC Church Content Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage and update church content, events, and announcements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white mb-4`}>
              {stat.icon}
            </div>
            <h3 className="text-gray-600 text-sm">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Sermons</h2>
          <div className="space-y-4">
            {recentSermons.length === 0 ? (
              <p className="text-gray-500">No recent sermons available</p>
            ) : (
              recentSermons.map((sermon) => (
                <div key={sermon.id} className="flex items-center space-x-4 border-b pb-4">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BookText size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">{sermon.title}</p>
                    <p className="text-sm text-gray-500">{sermon.pastor as string} • {sermon.date as string}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 text-sm font-medium transition-colors flex items-center gap-2 justify-center"
              >
                {action.icon}
                {action.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
