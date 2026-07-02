/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId, MockTask } from './types';
import { MOCK_TASKS } from './data/workspaceData';
import Sidebar from './components/Sidebar';
import HomeDashboard from './components/HomeDashboard';
import DepartmentDashboard from './components/DepartmentDashboard';
import DatabaseSchemaVisualizer from './components/DatabaseSchemaVisualizer';
import SetupGuide from './components/SetupGuide';
import FormulaHelper from './components/FormulaHelper';
import PrinciplesList from './components/PrinciplesList';
import {
  Sparkles,
  LayoutDashboard,
  Database,
  BookOpen,
  Sliders,
  Award,
  Sun,
  Moon,
  Lock,
  Compass,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  Settings,
  HelpCircle,
  Menu
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'mockup' | 'database' | 'setup' | 'principles' | 'formulas'>('mockup');
  const [activePage, setActivePage] = useState<PageId>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Real reactive state for tasks to make workspace interactive!
  const [tasks, setTasks] = useState<MockTask[]>(MOCK_TASKS);

  // Handle Dark Mode toggle
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTaskStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === id) {
          const nextStatus: MockTask['status'] =
            t.status === 'Not Started'
              ? 'In Progress'
              : t.status === 'In Progress'
              ? 'Completed'
              : 'Not Started';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleAddTask = (newTask: Omit<MockTask, 'id'>) => {
    const nextId = `T-${String(tasks.length + 1).padStart(2, '0')}`;
    setTasks((prev) => [...prev, { ...newTask, id: nextId }]);
  };

  const handlePageChange = (id: PageId) => {
    setActivePage(id);
    setActiveTab('mockup'); // Automatically focus back to workspace mockup view
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen font-sans flex text-[#1A1A1A] bg-[#F8F9FA] dark:bg-slate-950 dark:text-slate-200 transition-colors duration-200`}>
      {/* Notion Replicated Navigation Sidebar (Desktop persistent, Mobile drawer) */}
      <Sidebar
        activePage={activePage}
        onPageChange={handlePageChange}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        
        {/* Core Control Center Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 shadow-xs">
          {/* Top Tabs Selector (Technical Architecture vs Live Sandbox) */}
          <div className="flex items-center gap-1.5 md:gap-3 overflow-x-auto scrollbar-none py-1 pl-10 lg:pl-0">
            <button
              onClick={() => setActiveTab('mockup')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'mockup'
                  ? 'bg-black dark:bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
              id="header-tab-mockup"
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span>Mô phỏng Workspace</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'database'
                  ? 'bg-black dark:bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
              id="header-tab-database"
            >
              <Database className="w-3.5 h-3.5 shrink-0" />
              <span>Cơ sở Dữ liệu & Relations</span>
            </button>

            <button
              onClick={() => setActiveTab('setup')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'setup'
                  ? 'bg-black dark:bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
              id="header-tab-setup"
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>Hướng dẫn từng bước</span>
            </button>

            <button
              onClick={() => setActiveTab('principles')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'principles'
                  ? 'bg-black dark:bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
              id="header-tab-principles"
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Quản trị & Mẫu</span>
            </button>

            <button
              onClick={() => setActiveTab('formulas')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'formulas'
                  ? 'bg-black dark:bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
              id="header-tab-formulas"
            >
              <FileCode className="w-3.5 h-3.5 shrink-0" />
              <span>Kho Công thức</span>
            </button>
          </div>

          {/* Theme switcher / Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl transition-all cursor-pointer"
              title="Chuyển giao diện Sáng/Tối"
              id="theme-toggle-btn"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>
          </div>
        </header>

        {/* Workspace Central Core Canvas */}
        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8 max-w-7xl w-full mx-auto pb-16">
          {activeTab === 'mockup' ? (
            activePage === 'home' ? (
              <HomeDashboard
                onPageChange={handlePageChange}
                tasks={tasks}
                onToggleTask={toggleTaskStatus}
              />
            ) : (
              <DepartmentDashboard
                pageId={activePage}
                tasks={tasks}
                onToggleTask={toggleTaskStatus}
                onAddTask={handleAddTask}
                onPageChange={handlePageChange}
              />
            )
          ) : activeTab === 'database' ? (
            <DatabaseSchemaVisualizer />
          ) : activeTab === 'setup' ? (
            <SetupGuide />
          ) : activeTab === 'principles' ? (
            <PrinciplesList />
          ) : (
            <FormulaHelper />
          )}
        </main>
      </div>
    </div>
  );
}
