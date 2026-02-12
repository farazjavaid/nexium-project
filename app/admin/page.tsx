'use client';

import React, { useState, useEffect } from 'react';
import DashboardCard from '@/components/admin/DashboardCard';
import { contactService } from '@/lib/services/contactService';
import { clientService } from '@/lib/services/clientService';
import { projectService } from '@/lib/services/projectService';
import { serviceService } from '@/lib/services/serviceService';
import { testimonialService } from '@/lib/services/testimonialService';
import { formatDate } from '@/lib/utils';
import { ContactSubmission } from '@/types/admin';

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [stats, setStats] = useState({ contacts: 0, clients: 0, projects: 0, services: 0, testimonials: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactsRes, clientsRes, projectsRes, servicesRes, testimonialsRes] = await Promise.all([
          contactService.getAll(),
          clientService.getAll(),
          projectService.getAll(),
          serviceService.getAll(),
          testimonialService.getAll(),
        ]);

        setContacts(contactsRes.data || []);
        setStats({
          contacts: contactsRes.data?.length || 0,
          clients: clientsRes.data?.length || 0,
          projects: projectsRes.data?.length || 0,
          services: servicesRes.data?.length || 0,
          testimonials: testimonialsRes.data?.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statsCards = [
    {
      title: 'Total Contacts',
      value: stats.contacts,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: '#267275',
    },
    {
      title: 'Total Clients',
      value: stats.clients,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: '#1f5a5c',
    },
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: '#2a8285',
    },
    {
      title: 'Total Services',
      value: stats.services,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgColor: '#10b981',
    },
    {
      title: 'Total Testimonials',
      value: stats.testimonials,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      bgColor: '#8b5cf6',
    },
  ];

  const unreadContacts = contacts.filter((contact) => !contact.is_read);
  const recentContacts = contacts.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Contact Submissions</h2>
          <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
            {unreadContacts.length} Unread
          </span>
        </div>

        <div className="space-y-4">
          {recentContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#267275] rounded-full flex items-center justify-center text-white font-medium">
                  {contact.name.charAt(0)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-900">{contact.name}</h3>
                  {!contact.is_read && (
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{contact.email}</p>
                <p className="text-sm text-gray-700 mt-1 truncate">{contact.message}</p>
              </div>
              <div className="flex-shrink-0 text-xs text-gray-500">
                {formatDate(contact.created_at)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
