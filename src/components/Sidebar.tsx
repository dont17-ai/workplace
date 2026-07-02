/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PAGES } from '../data/workspaceData';
import { PageId, PageConfig } from '../types';
import {
  Home,
  Users,
  Briefcase,
  Calendar,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  Lock,
  Award,
  Database,
  Archive
} from 'lucide-react';

interface SidebarProps {
  activePage: PageId;
  onPageChange: (id: PageId) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activePage, onPageChange, isOpen, onToggle }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState({
    workspace: false,
    departments: false,
    database: false,
    resources: false,
  });

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getPageIcon = (id: PageId, emoji: string) => {
    switch (id) {
      case 'home':
        return <Home className="w-4 h-4 text-slate-500" />;
      case 'thanhvien':
        return <Users className="w-4 h-4 text-slate-500" />;
      case 'duan':
        return <Briefcase className="w-4 h-4 text-slate-500" />;
      case 'lich':
        return <Calendar className="w-4 h-4 text-slate-500" />;
      case 'kho':
        return <Archive className="w-4 h-4 text-slate-500" />;
      default:
        return <span className="text-sm leading-none">{emoji}</span>;
    }
  };

  const filteredPages = PAGES.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.vietnameseTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSectionPages = (category: PageConfig['category']) => {
    return filteredPages.filter((p) => p.category === category);
  };

  const renderSectionHeader = (
    title: string,
    key: keyof typeof collapsedSections,
    icon: React.ReactNode
  ) => {
    const isCollapsed = collapsedSections[key];
    return (
      <button
        onClick={() => toggleSection(key)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-slate-800/30 rounded transition-colors group mt-4"
        id={`section-btn-${String(key)}`}
      >
        <div className="flex items-center gap-1.5">
          {icon}
          <span>{title}</span>
        </div>
        <div className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>
    );
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/95 dark:bg-slate-900/95 shadow-md border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-200"
        aria-label="Toggle Navigation"
        id="mobile-toggle-btn"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#FCFCFC] dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id="notion-sidebar"
      >
        {/* Workspace Brand Header */}
        <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-black dark:bg-slate-800 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
            EN
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight flex items-center gap-1">
              EduNotion Hub <Lock className="w-3 h-3 text-slate-400" />
            </h1>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
              Notion Workspace
            </span>
          </div>
        </div>

        {/* Quick Search */}
        <div className="px-3 pt-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm trang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 focus:border-black dark:focus:border-slate-400 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-xs rounded-md transition-all outline-none"
              id="sidebar-search"
            />
          </div>
        </div>

        {/* Workspace Navigation */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          {/* Quick Home link */}
          <button
            onClick={() => {
              onPageChange('home');
              if (window.innerWidth < 1024) onToggle();
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-all ${
              activePage === 'home'
                ? 'bg-slate-200/60 dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            id="sidebar-link-home"
          >
            <Home className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Trang chủ Workspace</span>
          </button>

          {/* Section: Departments / Không gian phòng ban */}
          {renderSectionHeader('Không gian Phòng ban', 'departments', <Award className="w-3.5 h-3.5 text-rose-400" />)}
          {!collapsedSections.departments && (
            <div className="space-y-0.5 pl-1" id="section-departments-links">
              {getSectionPages('departments').map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    onPageChange(page.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activePage === page.id
                      ? 'bg-slate-200/60 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                  id={`sidebar-link-${page.id}`}
                >
                  <div className="flex items-center gap-2">
                    {getPageIcon(page.id, page.icon)}
                    <span className="truncate">{page.title}</span>
                  </div>
                  {activePage === page.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></span>
                  )}
                </button>
              ))}
              {getSectionPages('departments').length === 0 && (
                <span className="text-[10px] text-slate-600 pl-8 block italic">Không tìm thấy</span>
              )}
            </div>
          )}

          {/* Section: Central Databases / Dữ liệu trung tâm */}
          {renderSectionHeader('Dữ liệu Vận hành', 'database', <Database className="w-3.5 h-3.5 text-indigo-400" />)}
          {!collapsedSections.database && (
            <div className="space-y-0.5 pl-1" id="section-database-links">
              {getSectionPages('database').map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    onPageChange(page.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activePage === page.id
                      ? 'bg-slate-200/60 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                  id={`sidebar-link-${page.id}`}
                >
                  <div className="flex items-center gap-2">
                    {getPageIcon(page.id, page.icon)}
                    <span className="truncate">{page.title}</span>
                  </div>
                  {activePage === page.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></span>
                  )}
                </button>
              ))}
              {getSectionPages('database').length === 0 && (
                <span className="text-[10px] text-slate-600 pl-8 block italic">Không tìm thấy</span>
              )}
            </div>
          )}

          {/* Section: Resources / Học liệu & Quy chuẩn */}
          {renderSectionHeader('Học liệu & Quy chuẩn', 'resources', <FileText className="w-3.5 h-3.5 text-amber-400" />)}
          {!collapsedSections.resources && (
            <div className="space-y-0.5 pl-1" id="section-resources-links">
              {getSectionPages('resources').map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    onPageChange(page.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activePage === page.id
                      ? 'bg-slate-200/60 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                  id={`sidebar-link-${page.id}`}
                >
                  <div className="flex items-center gap-2">
                    {getPageIcon(page.id, page.icon)}
                    <span className="truncate">{page.title}</span>
                  </div>
                  {activePage === page.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></span>
                  )}
                </button>
              ))}
              {getSectionPages('resources').length === 0 && (
                <span className="text-[10px] text-slate-600 pl-8 block italic">Không tìm thấy</span>
              )}
            </div>
          )}
        </div>

        {/* Footer Profile */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
              alt="Avatar"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-800"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">Hiệu trưởng</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">an.nv@school.edu</span>
            </div>
          </div>
          <button className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800" title="Cài đặt hệ thống" id="sidebar-footer-settings">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30"
          id="mobile-overlay"
        ></div>
      )}
    </>
  );
}
