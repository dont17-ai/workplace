/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PAGES, MOCK_TASKS, MOCK_MEETINGS, MOCK_DOCUMENTS, MOCK_PROJECTS } from '../data/workspaceData';
import { PageId, PageConfig, MockTask, MockMeeting, MockDocument, MockProject } from '../types';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Calendar as CalendarIcon,
  Users,
  Briefcase,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Bell,
  Check,
  FileCheck2,
  Sparkles,
  X
} from 'lucide-react';

interface HomeDashboardProps {
  onPageChange: (id: PageId) => void;
  tasks: MockTask[];
  onToggleTask: (id: string) => void;
}

export default function HomeDashboard({ onPageChange, tasks, onToggleTask }: HomeDashboardProps) {
  const [activeTab, setActiveTab] = useState<'tasks' | 'calendar' | 'documents' | 'announcements'>('tasks');
  const [selectedMeeting, setSelectedMeeting] = useState<MockMeeting | null>(null);
  
  // Department pages for the Quick Navigation cards
  const deptPages = PAGES.filter((p) => p.category === 'departments');
  const resourcePages = PAGES.filter((p) => p.category === 'resources');

  // Stats calculation
  const totalStaff = 13;
  const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length;
  const activeProjects = MOCK_PROJECTS.filter((p) => p.status !== 'Completed').length;
  const approvedDocs = MOCK_DOCUMENTS.filter((d) => d.status === 'Đã ban hành').length;

  // Personal tasks assigned to current user mock ("Thầy Nguyễn Văn An" or department leads)
  const myTasks = tasks.filter(t => t.status !== 'Completed').slice(0, 3);
  
  // Calendar Days Setup (July 2026 as per local time context 2026-07-01)
  const currentYear = 2026;
  const currentMonthName = 'Tháng 7';
  const daysInMonth = 31;
  const startDayOffset = 3; // July 1st 2026 is a Wednesday (offset 3 for grid)

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDayOffset }, (_, i) => null);

  const getMeetingsForDay = (dayNum: number) => {
    const dateStr = `2026-07-${dayNum.toString().padStart(2, '0')}`;
    return MOCK_MEETINGS.filter((m) => m.date === dateStr);
  };

  const getPriorityColor = (priority: MockTask['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-600 border-rose-150 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 border-amber-150 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30';
      case 'Low':
        return 'bg-slate-50 text-slate-600 border-slate-150 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700/50';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="home-dashboard">
      {/* Banner & Cover Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="h-44 w-full relative">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600"
            alt="School Banner"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent"></div>
        </div>
        
        <div className="px-6 pb-6 pt-12 relative">
          {/* Logo icon avatar */}
          <div className="absolute -top-12 left-6 w-20 h-20 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-4xl shadow-xl border-4 border-white dark:border-slate-900">
            🏛️
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                TRƯỜNG THCS & THPT CLC EDU-NOTION
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Hệ thống Quản trị Tri thức & Điều hành Giáo dục toàn diện. Kết nối Ban Giám hiệu, Tổ chuyên môn và Khối văn phòng trên nền tảng Notion thông minh.
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl self-start md:self-center">
              <Sparkles className="w-4.5 h-4.5 text-slate-600 dark:text-slate-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-slate-900 dark:text-slate-200">Hôm nay: Thứ Tư</p>
                <p className="text-slate-500 dark:text-slate-400">01 Tháng 7, 2026</p>
              </div>
            </div>
          </div>

          {/* Quick Info Grid / Rollup metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider block">Thành viên</span>
                <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{totalStaff} nhân sự</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider block">Công việc mở</span>
                <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{pendingTasks} đầu việc</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider block">Dự án chạy</span>
                <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{activeProjects} chiến dịch</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider block">SOP hành chính</span>
                <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{approvedDocs} quy chuẩn</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards (No Bullet, No List - Big Card design) */}
      <div id="quick-nav-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-black dark:bg-white"></span>
            Không gian làm việc các Tổ / Phòng ban
          </h3>
          <span className="text-xs text-slate-400 font-medium">Bố cục Apple Enterprise (3-Click Navigation)</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {deptPages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              className="group flex flex-col justify-between text-left p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-black dark:hover:border-white hover:shadow-sm hover:shadow-black/5 dark:hover:bg-slate-900/80 rounded-xl transition-all duration-300"
              id={`nav-card-${page.id}`}
            >
              <div>
                <div className="w-11 h-11 rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 flex items-center justify-center text-2xl shadow-xs transition-colors mb-4">
                  {page.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                  {page.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                  {page.description}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 mt-4 group-hover:gap-2.5 transition-all">
                <span>Vào không gian</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard cá nhân & Lịch cuộc họp (Two Columns split) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Daily Hub (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-rose-500"></span>
              Workspace Cá nhân & Báo cáo tổng hợp
            </h3>
            
            {/* View selectors tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeTab === 'tasks' ? 'bg-white dark:bg-slate-900 shadow-xs text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                }`}
                id="tab-btn-tasks"
              >
                Công việc
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeTab === 'documents' ? 'bg-white dark:bg-slate-900 shadow-xs text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                }`}
                id="tab-btn-docs"
              >
                Tài liệu mới
              </button>
              <button
                onClick={() => setActiveTab('announcements')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeTab === 'announcements' ? 'bg-white dark:bg-slate-900 shadow-xs text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                }`}
                id="tab-btn-announce"
              >
                Thông báo
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 min-h-[300px]">
            {activeTab === 'tasks' && (
              <div className="space-y-4" id="home-tasks-view">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span>Nhiệm vụ chưa hoàn thành của tôi</span>
                  <span>Tổng số: {tasks.filter(t => t.status !== 'Completed').length} việc</span>
                </div>
                
                <div className="space-y-3">
                  {tasks.filter(t => t.status !== 'Completed').map((task) => (
                    <div
                      key={task.id}
                      className="group flex items-start justify-between p-3.5 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-black dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onToggleTask(task.id)}
                          className="mt-0.5 w-5 h-5 rounded-md border border-slate-300 dark:border-slate-650 flex items-center justify-center hover:border-black hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
                          id={`check-task-${task.id}`}
                        >
                          <Check className="w-3.5 h-3.5 opacity-0 group-hover:opacity-40" />
                        </button>
                        
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {task.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                            <span className="font-medium text-slate-500 dark:text-slate-400">{task.assignee.split(' (')[0]}</span>
                            <span>•</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 dark:text-slate-400">{task.department}</span>
                            {task.project && (
                              <>
                                <span>•</span>
                                <span className="italic text-slate-600 dark:text-slate-300 font-semibold">{task.project}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1.5 shrink-0 pl-4">
                        <span className={`text-[10px] px-2 py-0.5 font-bold rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority === 'High' ? 'Khẩn' : task.priority === 'Medium' ? 'Trung' : 'Thấp'}
                        </span>
                        <span className="text-[10px] text-rose-500 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Hạn: {task.deadline}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {tasks.filter(t => t.status !== 'Completed').length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-2" />
                      <p className="text-sm font-medium">Tuyệt vời! Toàn bộ công việc đã được xử lý xong!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-4" id="home-docs-view">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span>Học trình & Sổ tay mới tải lên</span>
                  <button onClick={() => onPageChange('hoclieu')} className="text-black dark:text-white font-semibold hover:underline">Xem tất cả thư viện</button>
                </div>
                
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {MOCK_DOCUMENTS.map((doc) => (
                    <div key={doc.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                           <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white cursor-pointer">
                            {doc.title}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.department}</span>
                            <span>•</span>
                            <span>Đăng bởi {doc.author}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-slate-400 font-medium">{doc.updatedAt}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          doc.status === 'Đã ban hành' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="space-y-4" id="home-announcements-view">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span>Thông báo & Nghị quyết Ban Giám hiệu</span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-[10px]">Chính thức</span>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border border-rose-100 dark:border-rose-950/30 bg-rose-50/20 dark:bg-rose-950/10 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1">
                        <Bell className="w-3.5 h-3.5" /> Khẩn cấp
                      </span>
                      <span className="text-[11px] text-slate-400">28/06/2026</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      Kế hoạch chuẩn bị cơ sở vật chất năm học mới 2026-2027
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      Yêu cầu Tổ trưởng Tổ Văn phòng hoàn thiện bảo trì hạ tầng, điều hòa lớp học trước ngày 15/07. Các giáo viên gửi đề xuất mua sắm thiết bị dạy học đặc thù trước 10/07 thông qua biểu mẫu BM-HC-05 để tiến hành nhập kho.
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <span>Người ban hành:</span>
                      <span className="text-slate-600 dark:text-slate-300">Thầy Nguyễn Văn An (Hiệu trưởng)</span>
                    </div>
                  </div>

                  <div className="p-4 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Tin tức nội bộ
                      </span>
                      <span className="text-[11px] text-slate-400">25/06/2026</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      Hoàn thành chiến dịch tập huấn giáo viên Tiểu học đợt 1
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      Hơn 25 giáo viên khối Tiểu học đã hoàn thành xuất sắc khoá huấn luyện phương pháp dạy học STEM tích hợp và đổi mới học cụ sáng tạo. Các giáo án chuẩn hóa sẽ được bổ sung vào Kho học liệu số của trường.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Calendar View / Họp hành (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-black dark:bg-white"></span>
              Lịch cuộc họp & Sự kiện
            </h3>
            <span className="text-xs font-semibold text-slate-400">{currentMonthName} {currentYear}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4 shadow-xs" id="calendar-view-container">
            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>CN</span>
              <span>T2</span>
              <span>T3</span>
              <span>T4</span>
              <span>T5</span>
              <span>T6</span>
              <span>T7</span>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square bg-slate-50/30 dark:bg-slate-950/5 rounded-md"></div>
              ))}
              
              {calendarDays.map((day) => {
                const dayMeetings = getMeetingsForDay(day);
                const hasMeetings = dayMeetings.length > 0;
                
                return (
                  <button
                    key={`day-${day}`}
                    onClick={() => {
                      if (hasMeetings) {
                        setSelectedMeeting(dayMeetings[0]);
                      }
                    }}
                    className={`aspect-square flex flex-col items-center justify-between p-1.5 text-xs font-medium rounded-lg relative border transition-all ${
                      day === 1 
                        ? 'bg-black text-white border-black dark:bg-slate-800 dark:border-slate-800 shadow-sm' 
                        : hasMeetings
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-750 hover:bg-slate-250 dark:hover:bg-slate-700 cursor-pointer'
                          : 'bg-slate-50/50 dark:bg-slate-950/20 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-850'
                    }`}
                    id={`calendar-day-${day}`}
                  >
                    <span>{day}</span>
                    {hasMeetings && (
                      <span className={`w-1.5 h-1.5 rounded-full ${day === 1 ? 'bg-white' : 'bg-black dark:bg-white'}`}></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick schedule reminder list */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Danh sách họp tuần này</span>
              
              {MOCK_MEETINGS.slice(0, 3).map((meeting) => (
                <button
                  key={meeting.id}
                  onClick={() => setSelectedMeeting(meeting)}
                  className="w-full text-left p-3 bg-slate-50/60 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 hover:border-black dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900 rounded-xl transition-all block group"
                  id={`meeting-item-${meeting.id}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-1">
                      {meeting.title}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                      meeting.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {meeting.status === 'Completed' ? 'Xong' : 'Hẹn'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3 text-slate-500" />
                      {meeting.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {meeting.time}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Projects Gallery View (Fulfills Projects Requirement) */}
      <div id="projects-section" className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-emerald-500"></span>
          Chiến dịch & Dự án trọng điểm toàn trường
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              id={`project-card-${project.id}`}
            >
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    project.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20'
                      : project.status === 'In Progress'
                        ? 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200'
                        : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20'
                  }`}>
                    {project.status === 'Completed' ? 'Đã hoàn tất' : project.status === 'In Progress' ? 'Đang chạy' : 'Lên kế hoạch'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{project.id}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">Đơn vị: {project.department}</p>
                </div>

                {/* Progress bar formula emulation */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Tiến độ thực tế</span>
                    <span className="font-bold text-black dark:text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black dark:bg-slate-400 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  {/* Notion code display emulation */}
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800/40 font-mono text-[10px] text-slate-500 flex items-center justify-between">
                    <span>Formula: Progress_Bar_2.0</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">
                      {project.progress === 100 
                        ? '▓▓▓▓▓▓▓▓▓▓ 100%' 
                        : `${'▓'.repeat(Math.round(project.progress / 10))}${'░'.repeat(10 - Math.round(project.progress / 10))} ${project.progress}%`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/60 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-850 px-5 py-3 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate">Chủ nhiệm: {project.lead.split(' (')[0]}</span>
                <span className="shrink-0 text-[11px] font-medium text-slate-400">{project.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links & Support Resources */}
      <div id="quicklinks-section" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {resourcePages.slice(0, 3).map((page) => (
          <button
            key={page.id}
            onClick={() => onPageChange(page.id)}
            className="flex items-center justify-between text-left p-4 bg-slate-50/60 dark:bg-slate-950/10 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all group"
            id={`quick-link-btn-${page.id}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl leading-none">{page.icon}</span>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{page.vietnameseTitle}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{page.title}</p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
          </button>
        ))}
      </div>

      {/* Meeting Details Modal Popup Emulation */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4" id="meeting-modal">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full overflow-hidden shadow-xl animate-scale-up">
            <div className="h-2 bg-black dark:bg-slate-800"></div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-850 dark:bg-slate-800 dark:text-slate-200 rounded text-[10px] font-bold uppercase tracking-wider">
                  Biên bản & Chương trình họp
                </span>
                <button
                  onClick={() => setSelectedMeeting(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                  id="close-meeting-modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedMeeting.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">ID: {selectedMeeting.id}</p>
              </div>

              <div className="space-y-2 text-xs border-y border-slate-100 dark:border-slate-800 py-3.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Thời gian:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedMeeting.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ngày diễn ra:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedMeeting.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Địa điểm:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedMeeting.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Người chủ trì:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedMeeting.organizer}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Nội dung họp chuẩn bị (Agenda)</span>
                <div className="bg-slate-50 dark:bg-slate-950/30 p-3 rounded-lg border border-slate-100 dark:border-slate-850/60 text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
                  <p>1. Thông qua báo cáo công tác quý/tháng gần nhất.</p>
                  <p>2. Rà soát chuẩn bị cơ sở vật chất, giáo án đào tạo.</p>
                  <p>3. Phê duyệt ngân sách tạm tính cho chiến dịch sắp tới.</p>
                  <p>4. Tổng kết biên bản và phân công đầu việc trực tiếp lên DB_CongViec.</p>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedMeeting(null);
                    onPageChange('lich');
                  }}
                  className="flex-1 py-2 bg-black hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg text-xs font-semibold text-center transition-all cursor-pointer"
                  id="modal-view-schedule-btn"
                >
                  Mở Lịch công tác
                </button>
                <button
                  onClick={() => setSelectedMeeting(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer"
                  id="modal-close-btn"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
