'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    company: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields (Name, Email, Message).');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || 'Failed to send message.');
      } else {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          phone: '',
          company: '',
          message: '',
        });
      }
    } catch {
      setError('Failed to send message.');
    }
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Me</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-black/30 p-8 rounded-lg shadow-lg">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Your message has been sent successfully!</p>}

        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-white">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded border border-gray-600 bg-black text-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-white">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded border border-gray-600 bg-black text-white"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block mb-1 font-medium text-white">
            Subject
          </label>
          <input
            name="subject"
            id="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-600 bg-black text-white"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1 font-medium text-white">
            Phone
          </label>
          <input
            name="phone"
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-600 bg-black text-white"
          />
        </div>

        <div>
          <label htmlFor="company" className="block mb-1 font-medium text-white">
            Company
          </label>
          <input
            name="company"
            id="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-600 bg-black text-white"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 font-medium text-white">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded border border-gray-600 bg-black text-white resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </main>
  );
}
