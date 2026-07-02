/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PAGES, MOCK_TASKS, MOCK_MEETINGS, MOCK_DOCUMENTS, MOCK_PROJECTS, MOCK_MEMBERS } from '../data/workspaceData';
import { PageId, PageConfig, MockTask, MockMeeting, MockDocument, MockProject } from '../types';
import {
  FileText,
  Users,
  Briefcase,
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  CheckCircle2,
  Folder,
  ArrowLeft,
  UserCheck,
  Search,
  BookOpen,
  Sliders,
  Copy,
  Download,
  ShieldCheck,
  Heart,
  Lightbulb,
  FileSpreadsheet,
  AlertCircle,
  Archive,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';

interface DepartmentDashboardProps {
  pageId: PageId;
  tasks: MockTask[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: Omit<MockTask, 'id'>) => void;
  onPageChange: (id: PageId) => void;
}

export default function DepartmentDashboard({
  pageId,
  tasks,
  onToggleTask,
  onAddTask,
  onPageChange,
}: DepartmentDashboardProps) {
  const page = PAGES.find((p) => p.id === pageId) || PAGES[0];
  
  // Local states
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states for creating simple tasks
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(MOCK_MEMBERS[0]);
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newTaskDeadline, setNewTaskDeadline] = useState('2026-07-15');

  const handleCopyLink = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    onAddTask({
      title: newTaskTitle,
      status: 'Not Started',
      priority: newTaskPriority,
      assignee: newTaskAssignee,
      deadline: newTaskDeadline,
      department: page.title,
    });
    
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  // Helper filters based on active page
  const pageTasks = tasks.filter((t) => t.department === page.title);
  const pageProjects = MOCK_PROJECTS.filter((p) => p.department === page.title);
  const pageDocs = MOCK_DOCUMENTS.filter((d) => d.department === page.title);

  // Custom mock staff members allocated for departments
  const getDeptMembers = () => {
    switch (pageId) {
      case 'bgh':
        return MOCK_MEMBERS.filter(m => m.includes('BGH'));
      case 'tieuhoc':
        return MOCK_MEMBERS.filter(m => m.includes('Tiểu học') || m.includes('Khánh Chi'));
      case 'trunghoc':
        return MOCK_MEMBERS.filter(m => m.includes('Trung học') || m.includes('Bách'));
      case 'vanphong':
        return MOCK_MEMBERS.filter(m => m.includes('Văn phòng') || m.includes('Hành chính'));
      case 'pdp':
        return MOCK_MEMBERS.filter(m => m.includes('PDP'));
      case 'cths':
        return MOCK_MEMBERS.filter(m => m.includes('CTHS'));
      case 'tuyensinh':
        return MOCK_MEMBERS.filter(m => m.includes('Tuyển sinh'));
      case 'dvhs':
        return MOCK_MEMBERS.filter(m => m.includes('DVHS'));
      default:
        return MOCK_MEMBERS;
    }
  };

  const deptMembers = getDeptMembers();

  // Color classes map for themes - mapped to clean monochrome and dark slate for minimalism
  const colorThemes = {
    blue: 'border-slate-200 dark:border-slate-800 focus:ring-slate-500 bg-black dark:bg-slate-800 hover:bg-slate-900',
    indigo: 'border-slate-200 dark:border-slate-800 focus:ring-slate-500 bg-black dark:bg-slate-800 hover:bg-slate-900',
    emerald: 'border-slate-200 dark:border-slate-800 focus:ring-slate-500 bg-black dark:bg-slate-800 hover:bg-slate-900',
    violet: 'border-slate-200 dark:border-slate-800 focus:ring-slate-500 bg-black dark:bg-slate-800 hover:bg-slate-900',
    amber: 'border-slate-200 dark:border-slate-800 focus:ring-slate-500 bg-black dark:bg-slate-800 hover:bg-slate-900',
    teal: 'border-slate-200 dark:border-slate-800 focus:ring-slate-500 bg-black dark:bg-slate-800 hover:bg-slate-900',
    rose: 'border-slate-200 dark:border-slate-800 focus:ring-slate-500 bg-black dark:bg-slate-800 hover:bg-slate-900',
    orange: 'border-slate-200 dark:border-slate-800 focus:ring-slate-500 bg-black dark:bg-slate-800 hover:bg-slate-900',
    cyan: 'border-slate-200 dark:border-slate-800 focus:ring-slate-500 bg-black dark:bg-slate-800 hover:bg-slate-900',
    sky: 'border-slate-200 dark:border-slate-800 focus:ring-slate-500 bg-black dark:bg-slate-800 hover:bg-slate-900',
    slate: 'border-slate-200 dark:border-slate-900 focus:ring-slate-500 bg-black dark:bg-slate-800 hover:bg-slate-900',
  };

  const accentColor = page.accentColor as keyof typeof colorThemes;
  const activeThemeClass = colorThemes[accentColor] || colorThemes.indigo;

  // Render individual customized databases pages if it is a central database / resource view
  if (pageId === 'hoclieu') {
    // --- KHO HỌC LIỆU DYNAMIC RENDER ---
    const allHocLieu = MOCK_DOCUMENTS.filter(d => d.type === 'Học liệu' || d.type === 'Tài liệu');
    const filteredHocLieu = allHocLieu.filter(d => 
      (filterType === 'All' || d.department === filterType) &&
      d.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6 animate-fade-in" id="hoclieu-dashboard">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Thư viện Học liệu Số</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{page.icon}</span> {page.vietnameseTitle}
            </h2>
          </div>
          <button 
            onClick={() => onPageChange('home')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
            id="back-home-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại Home
          </button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl">
          {page.description} Giáo án điện tử, giáo trình số, bộ đề kiểm tra, và slide bài giảng được lưu trữ có cấu trúc để chia sẻ toàn trường.
        </p>

        {/* Filters and search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-2 items-center">
            <Sliders className="w-4 h-4 text-slate-400 shrink-0" />
            {['All', 'Tổ Tiểu học', 'Tổ Trung học', 'Tổ PDP'].map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterType(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterType === dept
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'
                }`}
                id={`filter-dept-${dept.replace(/\s+/g, '')}`}
              >
                {dept === 'All' ? 'Tất cả khối' : dept}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm tên học liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 focus:border-black dark:border-slate-700 text-xs rounded-lg outline-none"
              id="search-hoclieu"
            />
          </div>
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHocLieu.map((doc) => (
            <div key={doc.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded font-bold uppercase">
                  {doc.type}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                  doc.status === 'Đã ban hành' 
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' 
                    : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20'
                }`}>
                  {doc.status}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug hover:text-black dark:hover:text-white cursor-pointer">
                  {doc.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">Khối/Phòng: {doc.department}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-xs text-slate-400">
                <span>Soạn thảo: {doc.author}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleCopyLink(`https://drive.google.com/school/file-${doc.id}`, doc.id)}
                    className="p-1.5 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500"
                    title="Sao chép liên kết"
                    id={`copy-hoclieu-${doc.id}`}
                  >
                    {copiedId === doc.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()} 
                    className="p-1.5 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-indigo-500"
                    title="Tải học liệu"
                    id={`download-hoclieu-${doc.id}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
          {filteredHocLieu.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400 text-xs font-semibold">
              Không có tài nguyên học liệu nào khớp với bộ lọc.
            </div>
          )}
        </div>
      </div>
    );
  }

  if (pageId === 'bieumau') {
    // --- KHO BIỂU MẪU DYNAMIC RENDER ---
    const allBieuMau = MOCK_DOCUMENTS.filter(d => d.type === 'Biểu mẫu');
    
    return (
      <div className="space-y-6 animate-fade-in" id="bieumau-dashboard">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wider block">Hành chính Chuẩn hóa</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{page.icon}</span> {page.vietnameseTitle}
            </h2>
          </div>
          <button 
            onClick={() => onPageChange('home')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
            id="back-home-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại Home
          </button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl">
          {page.description} Cung cấp các biểu mẫu chuẩn hóa để tải xuống và hoàn thiện thủ tục nhanh chóng, tinh gọn thời gian chờ duyệt.
        </p>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4">Mã Biểu Mẫu</th>
                <th className="p-4">Tên Biểu Mẫu</th>
                <th className="p-4">Bộ Phận Phát Hành</th>
                <th className="p-4 text-right">Tải xuống / Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {allBieuMau.map((bm, index) => (
                <tr key={bm.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                  <td className="p-4 font-mono text-slate-800 dark:text-slate-200 font-bold">BM-HC-0{index+1}</td>
                  <td className="p-4 text-slate-800 dark:text-slate-200 text-sm font-semibold">{bm.title}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{bm.department}</td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button 
                        onClick={() => handleCopyLink(`https://drive.google.com/school/form-${bm.id}`, bm.id)}
                        className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 rounded text-slate-500"
                        id={`copy-bm-${bm.id}`}
                      >
                        {copiedId === bm.id ? 'Đã sao chép' : 'Copy link'}
                      </button>
                      <button 
                        onClick={() => alert(`Bắt đầu tải: ${bm.title}`)}
                        className="p-1.5 bg-black hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 text-white rounded cursor-pointer"
                        title="Tải file"
                        id={`download-bm-${bm.id}`}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (pageId === 'quytrinh') {
    // --- QUY TRÌNH SOP DYNAMIC RENDER ---
    const allSOP = MOCK_DOCUMENTS.filter(d => d.type === 'Quy trình');
    
    return (
      <div className="space-y-6 animate-fade-in" id="quytrinh-dashboard">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Sổ tay Vận hành tiêu chuẩn</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{page.icon}</span> {page.vietnameseTitle}
            </h2>
          </div>
          <button 
            onClick={() => onPageChange('home')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
            id="back-home-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại Home
          </button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl">
          {page.description} Sổ tay hướng dẫn từng quy trình vận hành tiêu chuẩn trong nhà trường. Giúp xử lý đồng đều, an toàn các công vụ, sự cố học đường.
        </p>

        <div className="space-y-6">
          {allSOP.map((sop) => (
            <div key={sop.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-850 flex items-center justify-center text-slate-800 dark:text-slate-200">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{sop.title}</h4>
                    <p className="text-[11px] text-slate-400">Đơn vị chủ trì: {sop.department} | Cập nhật: {sop.updatedAt}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded text-[11px] font-bold uppercase tracking-wider">
                  {sop.status}
                </span>
              </div>

              {/* Steps workflow visual */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Quy trình các bước (Workflow)</span>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50/60 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1.5 relative">
                    <span className="absolute top-3 right-3 text-2xl font-black text-slate-200/50">01</span>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">Bước 1: Tiếp Nhận</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Tiếp nhận thông tin sơ bộ, ghi biên bản nhanh và gửi báo cáo về Trưởng bộ phận phụ trách trong 15 phút.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50/60 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1.5 relative">
                    <span className="absolute top-3 right-3 text-2xl font-black text-slate-200/50">02</span>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">Bước 2: Xử Lý</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Phối hợp các tổ liên quan tiến hành xử lý đúng theo chỉ dẫn chuyên môn. Ký phiếu phê duyệt hành chính nếu có.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50/60 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1.5 relative">
                    <span className="absolute top-3 right-3 text-2xl font-black text-slate-200/50">03</span>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">Bước 3: Lưu Trữ</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Cập nhật trạng thái hoàn tất, lưu biên bản đầy đủ vào DB_TaiLieu hệ thống để tích lũy kho tri thức.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (pageId === 'thanhvien') {
    // --- DANH BẠ THÀNH VIÊN DYNAMIC RENDER ---
    const [memberSearch, setMemberSearch] = useState('');
    const filteredMembers = MOCK_MEMBERS.filter(m => m.toLowerCase().includes(memberSearch.toLowerCase()));

    return (
      <div className="space-y-6 animate-fade-in" id="thanhvien-dashboard">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Hội đồng Sư phạm & Nhân sự</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{page.icon}</span> {page.vietnameseTitle}
            </h2>
          </div>
          <button 
            onClick={() => onPageChange('home')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
            id="back-home-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại Home
          </button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl">
          {page.description} Danh bạ nhân sự điện tử tích hợp, phục vụ liên hệ khẩn, họp ban bộ môn và liên thông phân công nhiệm vụ.
        </p>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm cán bộ, giáo viên..."
            value={memberSearch}
            onChange={(e) => setMemberSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 focus:border-black dark:border-slate-700 text-xs rounded-lg outline-none font-medium"
            id="search-members"
          />
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((m, idx) => {
            const isBGH = m.includes('BGH');
            const isGiaoVien = m.includes('Giáo viên');
            const role = m.split(' - ')[1]?.replace(')', '') || 'Cán bộ';
            const name = m.split(' (')[0];
            
            return (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 hover:shadow-md transition-all flex items-center gap-4">
                <img 
                  src={`https://images.unsplash.com/photo-${1500000000000 + (idx*10000)}?auto=format&fit=crop&q=80&w=150`}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800"
                  referrerPolicy="no-referrer"
                />
                
                <div className="space-y-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{name}</h4>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{role}</p>
                  <p className="text-[10px] text-slate-400">an.nv@school.edu.vn</p>
                  
                  <span className="inline-block text-[9px] px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded font-bold uppercase">
                    Đang hoạt động
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- GENERAL DEPARTMENTAL DASHBOARD ---
  return (
    <div className="space-y-8 animate-fade-in" id="departmental-dashboard">
      {/* Cover Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="h-36 w-full relative">
          <img
            src={page.cover}
            alt={page.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <div className="px-6 pb-6 pt-10 relative">
          {/* Back btn */}
          <button 
            onClick={() => onPageChange('home')}
            className="absolute -top-12 left-6 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg text-[10px] font-bold uppercase cursor-pointer"
            id="dept-back-home"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>

          {/* Icon */}
          <div className="absolute -top-10 right-6 w-16 h-16 bg-slate-900 text-white rounded-xl flex items-center justify-center text-3xl shadow-lg border-4 border-white dark:border-slate-900">
            {page.icon}
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              {page.vietnameseTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {page.description}
            </p>
          </div>

          {/* Internal quick summary */}
          <div className="flex gap-4 mt-4 text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {deptMembers.length} thành viên
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {pageTasks.length} việc phòng ban
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Kanban board & Documents folder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Kanban Board Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-slate-400" /> Bảng phân công công việc (Kanban DB_CongViec)
                </h3>
                <p className="text-[11px] text-slate-400">Xem tiến độ, chuyển đổi trạng thái bằng cách nhấp chọn</p>
              </div>

              <button
                onClick={() => setIsAddingTask(!isAddingTask)}
                className="flex items-center gap-1 px-3 py-1.5 bg-black hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                id="add-task-toggle"
              >
                <Plus className="w-3.5 h-3.5" /> Giao việc mới
              </button>
            </div>

            {/* Simple Inline Form to create task */}
            {isAddingTask && (
              <form onSubmit={handleCreateTask} className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Tạo nhanh công việc</h4>
                <div className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Tên công việc..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none"
                    id="new-task-title-input"
                  />
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Người thực hiện</label>
                      <select
                        value={newTaskAssignee}
                        onChange={(e) => setNewTaskAssignee(e.target.value)}
                        className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                        id="new-task-assignee-select"
                      >
                        {deptMembers.map((m, idx) => (
                          <option key={idx} value={m}>{m.split(' (')[0]}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Độ khẩn cấp</label>
                      <select
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value as any)}
                        className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md font-semibold"
                        id="new-task-priority-select"
                      >
                        <option value="High">🔴 Khẩn cấp (SLA 48h)</option>
                        <option value="Medium">🟡 Trung bình</option>
                        <option value="Low">🔵 Thường</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingTask(false)}
                    className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 rounded-lg text-xs"
                    id="cancel-add-task"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-1.5 text-white rounded-lg text-xs font-semibold ${activeThemeClass}`}
                    id="submit-new-task"
                  >
                    Lưu nhiệm vụ
                  </button>
                </div>
              </form>
            )}

            {/* Kanban columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="kanban-columns">
              {/* Column: Not Started */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider justify-between">
                  <span>Chưa bắt đầu ({pageTasks.filter(t => t.status === 'Not Started').length})</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                </div>
                <div className="space-y-2 min-h-[150px]">
                  {pageTasks.filter(t => t.status === 'Not Started').map(task => (
                     <div
                      key={task.id}
                      onClick={() => onToggleTask(task.id)}
                      className="p-3 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-xl space-y-2 shadow-xs cursor-pointer hover:border-black dark:hover:border-slate-600 transition-colors"
                      id={`kanban-task-item-${task.id}`}
                    >
                      <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200">{task.title}</h5>
                      <div className="flex justify-between items-center text-[9px] text-slate-400">
                        <span>{task.assignee.split(' (')[0]}</span>
                        <span className="flex items-center gap-0.5 text-rose-500"><Clock className="w-2.5 h-2.5" /> {task.deadline.split('-')[2]} hg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column: In Progress */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider justify-between">
                  <span>Đang làm ({pageTasks.filter(t => t.status === 'In Progress').length})</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></span>
                </div>
                <div className="space-y-2 min-h-[150px]">
                  {pageTasks.filter(t => t.status === 'In Progress').map(task => (
                    <div
                      key={task.id}
                      onClick={() => onToggleTask(task.id)}
                      className="p-3 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-xl space-y-2 shadow-xs cursor-pointer hover:border-black dark:hover:border-slate-600 transition-colors"
                      id={`kanban-task-item-${task.id}`}
                    >
                      <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200">{task.title}</h5>
                      <div className="flex justify-between items-center text-[9px] text-slate-400">
                        <span>{task.assignee.split(' (')[0]}</span>
                        <span className="flex items-center gap-0.5 text-rose-500"><Clock className="w-2.5 h-2.5" /> {task.deadline.split('-')[2]} hg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column: Completed */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider justify-between">
                  <span>Hoàn tất ({pageTasks.filter(t => t.status === 'Completed').length})</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="space-y-2 min-h-[150px]">
                  {pageTasks.filter(t => t.status === 'Completed').map(task => (
                    <div
                      key={task.id}
                      onClick={() => onToggleTask(task.id)}
                      className="p-3 bg-slate-50 dark:bg-slate-950/10 border border-slate-100 dark:border-slate-850 rounded-xl space-y-2 opacity-60 cursor-pointer"
                      id={`kanban-task-item-${task.id}`}
                    >
                      <h5 className="text-xs font-semibold text-slate-600 line-through dark:text-slate-400">{task.title}</h5>
                      <div className="flex justify-between items-center text-[9px] text-slate-400">
                        <span>{task.assignee.split(' (')[0]}</span>
                        <span className="text-emerald-500 font-bold">Xong</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Department Documents / Học liệu liên kết */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Folder className="w-4.5 h-4.5 text-slate-400" /> Thư mục Học liệu & Giáo án bộ môn (DB_TaiLieu)
            </h3>
            
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {pageDocs.map((doc) => (
                <div key={doc.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{doc.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Loại: {doc.type} | Ban hành bởi {doc.author}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    doc.status === 'Đã ban hành' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
              {pageDocs.length === 0 && (
                <div className="py-6 text-center text-slate-400 text-xs italic">
                  Chưa có tài liệu số trực thuộc phòng ban.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Members, Wiki & Announcements */}
        <div className="space-y-6">
          {/* Department Team Gallery */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-400" /> Đội ngũ nhân sự (DB_ThanhVien)
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {deptMembers.map((member, idx) => {
                const name = member.split(' (')[0];
                const role = member.split(' (')[1]?.replace(')', '') || 'Cán bộ';
                return (
                  <div key={idx} className="flex items-center gap-2.5 p-2 bg-slate-50/50 dark:bg-slate-950/20 rounded-xl border border-slate-100 dark:border-slate-850">
                    <img 
                      src={`https://images.unsplash.com/photo-${1500000000000 + (idx*5000)}?auto=format&fit=crop&q=80&w=100`}
                      alt={name}
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{name}</h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold truncate">{role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Department Wiki & SOP Quicklinks */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-slate-400" /> Wiki & Quy chuẩn bộ phận
            </h3>

            <div className="space-y-2.5">
              <button onClick={() => onPageChange('quytrinh')} className="w-full flex items-center justify-between p-2.5 bg-slate-50/60 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 dark:bg-slate-950/10 text-left">
                <span>📖 Sổ tay SOP hành chính chuẩn</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              
              <button onClick={() => onPageChange('bieumau')} className="w-full flex items-center justify-between p-2.5 bg-slate-50/60 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 dark:bg-slate-950/10 text-left">
                <span>📑 Danh mục biểu mẫu ban hành</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Department Projects list */}
          {pageProjects.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-slate-400" /> Chiến dịch phụ trách (DB_DuAn)
              </h3>

              <div className="space-y-3">
                {pageProjects.map((p) => (
                  <div key={p.id} className="p-3 bg-slate-50/60 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{p.id}</span>
                      <span className="text-slate-400">{p.endDate}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{p.title}</h4>
                    
                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-slate-400">
                        <span>Tiến trình</span>
                        <span className="font-bold text-black dark:text-white">{p.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-black dark:bg-slate-400 rounded-full" style={{ width: `${p.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
