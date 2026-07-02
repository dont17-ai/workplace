/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { DATABASES, RELATIONS } from '../data/workspaceData';
import { DatabaseId, DatabaseConfig, DatabaseRelation } from '../types';
import {
  Database,
  Link,
  Info,
  ChevronRight,
  ArrowRight,
  GitCommit,
  GitMerge,
  Cpu,
  Layers,
  Sparkles,
  Search
} from 'lucide-react';

export default function DatabaseSchemaVisualizer() {
  const [selectedDbId, setSelectedDbId] = useState<DatabaseId>('congviec');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedDb = DATABASES.find((db) => db.id === selectedDbId) || DATABASES[0];

  // Find all relations connected to the selected database
  const activeRelations = RELATIONS.filter(
    (rel) => rel.fromDb === selectedDbId || rel.toDb === selectedDbId
  );

  const getDbById = (id: DatabaseId) => {
    return DATABASES.find((db) => db.id === id);
  };

  const filteredDbs = DATABASES.filter((db) =>
    db.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    db.vietnameseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in" id="db-visualizer-tab">
      {/* Tab Header */}
      <div>
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Thiết kế Schema & Liên thông dữ liệu</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
          <Database className="w-5.5 h-5.5 text-black dark:text-white shrink-0" />
          Kiến trúc 12 Central Databases & Bản đồ Quan hệ
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Nhấp vào bất kỳ cơ sở dữ liệu nào bên trái để kiểm tra cấu trúc thuộc tính (Properties) chuẩn hóa trong Notion, xem các liên kết hai chiều (Relations) và lý do kiến trúc đi kèm.
        </p>
      </div>

      {/* Hub & Spoke Architecture Visualizer (Stripe style) */}
      <div className="bg-slate-950 text-slate-300 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
          <Cpu className="w-4 h-4" /> Kiến trúc Hub & Spoke (Một nguồn sự thật)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase">1. CENTRAL STORAGE (HUB)</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              12 Cơ sở dữ liệu gốc được đặt ẩn ở trang quản trị. Không lưu trực tiếp tại các trang bộ môn lẻ. Dữ liệu tập trung hoàn toàn.
            </p>
          </div>
          
          <div className="flex justify-center text-slate-400">
            <div className="hidden md:flex items-center gap-2">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-slate-400"></span>
              <GitMerge className="w-5 h-5 animate-pulse" />
              <span className="h-px w-8 bg-gradient-to-r from-slate-400 to-transparent"></span>
            </div>
            <span className="md:hidden">⬇️ Linked Database Views</span>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase">2. DEPT DASHBOARDS (SPOKES)</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Các tổ bộ môn dùng bộ lọc kéo dữ liệu về hiển thị. Người dùng sửa đổi tại đây, dữ liệu lập tức đồng bộ về Hub tổng.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive visualizer sandbox split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side (5 Columns): List of 12 Databases */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Danh sách Central Databases ({DATABASES.length})</span>
            
            <div className="relative w-44">
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Tìm DB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2 py-1 bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-850 rounded text-[11px] outline-none"
                id="search-db-list"
              />
            </div>
          </div>
          
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin" id="db-cards-list">
            {filteredDbs.map((db) => {
              const isActive = db.id === selectedDbId;
              const relCount = RELATIONS.filter((r) => r.fromDb === db.id || r.toDb === db.id).length;
              
              return (
                <button
                  key={db.id}
                  onClick={() => setSelectedDbId(db.id)}
                  className={`w-full flex items-center justify-between text-left p-3.5 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-black dark:bg-slate-900 dark:border-slate-850 dark:hover:border-slate-600'
                  }`}
                  id={`db-card-select-${db.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${
                      isActive ? 'bg-black text-white dark:bg-slate-750' : 'bg-slate-50 dark:bg-slate-800 text-slate-600'
                    }`}>
                      {db.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-xs font-bold truncate ${isActive ? 'text-black dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                        {db.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">{db.vietnameseName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 shrink-0 pl-3">
                    <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 font-semibold" title="Số lượng trường dữ liệu">
                      {db.properties.length} fields
                    </span>
                    {relCount > 0 && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 rounded font-bold" title="Số liên kết quan hệ">
                        🔗 {relCount}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side (7 Columns): Selected Database Schema & Active Relations */}
        <div className="lg:col-span-7 space-y-6" id="db-details-panel">
          {/* Properties Schema Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{selectedDb.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2">
                    {selectedDb.name}
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-[9px] font-sans font-medium uppercase tracking-wider">Notion Property List</span>
                  </h3>
                  <p className="text-xs text-slate-400">{selectedDb.vietnameseName} — {selectedDb.description}</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-2">Property Name</th>
                    <th className="pb-2">Notion Type</th>
                    <th className="pb-2 pl-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {selectedDb.properties.map((prop, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                      <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200 font-mono">{prop.name}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          prop.type === 'Relation' 
                            ? 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200' 
                            : prop.type === 'Rollup'
                              ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
                              : prop.type === 'Formula'
                                ? 'bg-purple-50 text-purple-600 dark:bg-purple-950/20'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {prop.type}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-500 dark:text-slate-400 pl-4">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Database Relations (Linked Database explanation) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Link className="w-4.5 h-4.5 text-black dark:text-white" /> Giải thích mối quan hệ liên kết (Relations)
            </h3>

            <div className="space-y-3" id="db-relations-list">
              {activeRelations.map((rel, idx) => {
                const targetId = rel.fromDb === selectedDbId ? rel.toDb : rel.fromDb;
                const targetDb = getDbById(targetId);
                if (!targetDb) return null;
                
                return (
                  <div key={idx} className="p-4 bg-slate-50/60 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                        <span>{selectedDb.icon} {selectedDb.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span>{targetDb.icon} {targetDb.name}</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 rounded font-bold uppercase">{rel.type} Relation</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {rel.reason}
                    </p>
                  </div>
                );
              })}

              {activeRelations.length === 0 && (
                <div className="flex items-center gap-2 p-4 bg-amber-50/50 text-amber-700 dark:bg-amber-950/10 dark:text-amber-400 rounded-xl text-xs border border-amber-100 dark:border-amber-900/30">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>Database này độc lập, hoạt động như danh mục tĩnh hoặc chưa liên thông quan hệ.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
