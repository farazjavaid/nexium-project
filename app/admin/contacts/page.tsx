'use client';

import React, { useState, useEffect } from 'react';
import DataTable, { Column, Action } from '@/components/admin/DataTable';
import { contactService } from '@/lib/services/contactService';
import { ContactSubmission } from '@/types/admin';
import { formatDate, formatDateTime } from '@/lib/utils';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactService.getAll();
      setContacts(response.data || []);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (contact: ContactSubmission) => {
    try {
      await contactService.markAsRead(String(contact.id));
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, is_read: true } : c))
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDelete = async (contact: ContactSubmission) => {
    if (confirm(`Are you sure you want to delete the message from ${contact.name}?`)) {
      try {
        await contactService.delete(String(contact.id));
        setContacts((prev) => prev.filter((c) => c.id !== contact.id));
      } catch (error) {
        console.error('Failed to delete contact:', error);
      }
    }
  };

  const handleView = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    handleMarkAsRead(contact);
  };

  const columns: Column[] = [
    {
      key: 'is_read',
      label: 'Status',
      render: (value: boolean) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {value ? 'Read' : 'Unread'}
        </span>
      ),
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'message',
      label: 'Message',
      render: (value: string) => (
        <span className="block truncate max-w-xs">{value}</span>
      ),
    },
    {
      key: 'created_at',
      label: 'Date',
      render: (value: string) => formatDate(value),
    },
  ];

  const actions: Action[] = [
    {
      label: 'View',
      onClick: handleView,
      variant: 'primary',
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      variant: 'danger',
    },
  ];

  const unreadCount = contacts.filter((c) => !c.is_read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Contact Submissions</h1>
          <p className="text-gray-500 mt-1">Manage all contact form submissions</p>
        </div>
        <span className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium">
          {unreadCount} Unread
        </span>
      </div>

      <DataTable
        columns={columns}
        data={contacts}
        actions={actions}
        emptyMessage="No contact submissions yet"
      />

      {selectedContact && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Contact Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="text-lg text-gray-800">{selectedContact.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-lg text-gray-800">{selectedContact.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Message</label>
                <p className="text-gray-800 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Submitted</label>
                <p className="text-gray-800">
                  {formatDateTime(selectedContact.created_at)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedContact.is_read
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {selectedContact.is_read ? 'Read' : 'Unread'}
                  </span>
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedContact);
                  setSelectedContact(null);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
