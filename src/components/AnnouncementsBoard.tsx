import React, { useState } from 'react';
import { Announcement, UserRole } from '../types';
import { saveAnnouncementToFirestore, deleteAnnouncementFromFirestore } from '../services/firebaseService';
import { Bell, Plus, Trash2, Megaphone, Calendar, User, CheckCircle2 } from 'lucide-react';

interface AnnouncementsBoardProps {
  announcements: Announcement[];
  currentRole: UserRole | null;
  currentUserName: string;
}

export const AnnouncementsBoard: React.FC<AnnouncementsBoardProps> = ({
  announcements,
  currentRole,
  currentUserName,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'general' | 'academic' | 'urgent' | 'parent'>('general');
  const [targetAudience, setTargetAudience] = useState<'all' | 'teachers' | 'parents' | 'students'>('all');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const canPost = currentRole === 'super_admin' || currentRole === 'principal' || currentRole === 'vice_principal';

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      const newAnn: Announcement = {
        id: `ann-${Date.now()}`,
        title: title.trim(),
        content: content.trim(),
        date: new Date().toISOString().split('T')[0],
        sender: `${currentUserName} (${currentRole === 'super_admin' ? 'ዋና አድሚን' : currentRole === 'principal' ? 'ዋና ር/መምህር' : 'ም/ር/መምህር'})`,
        category,
        targetAudience,
      };

      await saveAnnouncementToFirestore(newAnn);
      setTitle('');
      setContent('');
      setShowForm(false);
      setSuccessMsg('ማስታወቂያው በFirebase Firestore ቀጥታ ተመዝግቧል!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to save announcement', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('ይህ ማስታወቂያ ከFirebase ዳታቤዝ ይሰረዝ?')) {
      try {
        await deleteAnnouncementFromFirestore(id);
      } catch (err) {
        console.error('Failed to delete announcement', err);
      }
    }
  };

  const getCategoryBadge = (cat?: string) => {
    switch (cat) {
      case 'urgent':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-100 text-rose-800">አስቸኳይ</span>;
      case 'academic':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">የትምህርት</span>;
      case 'parent':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">የወላጆች</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">አጠቃላይ</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 rounded-lg text-amber-700">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              የትምህርት ቤቱ የቀጥታ ማስታወቂያ ሰሌዳ (Firestore Real-time Announcements)
              <span className="flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ቀጥታ ግንኙነት (Live)
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              በFirebase Firestore አማካኝነት በቀጥታ ለሁሉም ወላጆች፣ መምህራንና አስተዳዳሪዎች የሚተላለፉ መልዕክቶች
            </p>
          </div>
        </div>

        {canPost && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>አዲስ ማስታወቂያ ለጥፍ</span>
          </button>
        )}
      </div>

      {successMsg && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {showForm && canPost && (
        <form onSubmit={handleCreateAnnouncement} className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">አዲስ ማስታወቂያ መመዝገቢያ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">የማስታወቂያ ርዕስ *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ምሳሌ፡ የሁለተኛ ወሰነ-ትምህርት የወላጆች ስብሰባ"
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-700 mb-1">ምድብ</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="general">አጠቃላይ ማስታወቂያ</option>
                  <option value="academic">የትምህርት ጉዳይ</option>
                  <option value="urgent">አስቸኳይ ማሳሰቢያ</option>
                  <option value="parent">የወላጆች ጥሪ</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-700 mb-1">ተደራሽ</label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="all">ለሁሉም (All)</option>
                  <option value="parents">ለወላጆች ብቻ</option>
                  <option value="teachers">ለመምህራን ብቻ</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">የማስታወቂያ ዝርዝር ይዘት *</label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="ዝርዝር መልዕክቱን እዚህ ይጻፉ..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-md transition-colors"
            >
              ይቅር
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-md shadow-xs transition-colors"
            >
              {submitting ? 'በመላክ ላይ...' : 'አሁን ለጥፍ'}
            </button>
          </div>
        </form>
      )}

      {/* Announcements List */}
      <div className="mt-4 space-y-3">
        {announcements.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            ምንም የተለጠፈ ማስታወቂያ የለም።
          </div>
        ) : (
          announcements.map((ann) => (
            <div
              key={ann.id}
              className="p-4 bg-slate-50/70 hover:bg-slate-50 rounded-lg border border-slate-200/80 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  {getCategoryBadge(ann.category)}
                  <h4 className="text-sm font-semibold text-slate-900">{ann.title}</h4>
                </div>
                {canPost && (
                  <button
                    onClick={() => handleDelete(ann.id)}
                    title="ማስታወቂያውን ሰርዝ"
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line mb-3">
                {ann.content}
              </p>
              <div className="flex items-center gap-4 text-[11px] text-slate-500 border-t border-slate-200/60 pt-2">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>{ann.sender}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{ann.date}</span>
                </span>
                {ann.targetAudience && ann.targetAudience !== 'all' && (
                  <span className="text-slate-400">
                    ተደራሽ፡ {ann.targetAudience === 'parents' ? 'ወላጆች' : 'መምህራን'}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
