/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { STEP_BY_STEP_GUIDE } from '../data/workspaceData';
import { Check, Clipboard, HelpCircle, Star, Sparkles, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function SetupGuide() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="setup-guide-tab">
      {/* Header */}
      <div>
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Notion Deployment Blueprint</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
          <BookOpen className="w-5.5 h-5.5 text-black dark:text-white shrink-0" />
          Hướng dẫn Từng bước Xây dựng Hệ thống trong Notion
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Thực hiện đúng theo 5 bước chuẩn hóa kỹ thuật dưới đây để triển khai hệ thống quản lý đồng bộ từ trang trắng Notion thành công cụ vận hành bền bỉ nhiều năm học.
        </p>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="p-5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5 uppercase">
            <Sparkles className="w-4 h-4 text-slate-500" /> Chuẩn bị trước khi xây dựng
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Sử dụng tài khoản **Notion Education** hoặc **Plus/Enterprise Plan** để có dung lượng đính kèm học liệu không giới hạn.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Chỉ định ít nhất 1-2 nhân sự rành về Notion phụ trách quản trị chính (Admin/IT).</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Chuẩn bị danh sách hồ sơ nhân sự (Email, chức vụ) để import hàng loạt vào DB_ThanhVien.</span>
            </li>
          </ul>
        </div>

        <div className="p-5 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/60 dark:border-amber-900/40 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 uppercase">
            <Star className="w-4 h-4 text-amber-500 animate-pulse" /> Mẹo vận hành thực tế
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            **Luôn khóa cơ sở dữ liệu (Lock Database)** sau khi đã dựng xong toàn bộ quan hệ và công thức. Điều này ngăn việc giáo viên hoặc nhân viên vô tình kéo thả, xóa cột dữ liệu hoặc sửa đổi trường công thức khi đang thao tác hàng ngày.
          </p>
        </div>
      </div>

      {/* Setup Steps Timeline */}
      <div className="space-y-6 pt-4" id="setup-timeline-container">
        {STEP_BY_STEP_GUIDE.map((item, idx) => (
          <div key={idx} className="relative flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            {/* Step marker */}
            <div className="md:w-28 shrink-0 flex items-center md:flex-col md:items-start gap-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-4 md:pb-0">
              <span className="w-9 h-9 rounded-xl bg-black dark:bg-slate-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                0{item.step}
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BƯỚC</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">QUY TRÌNH</span>
              </div>
            </div>

            {/* Step content */}
            <div className="flex-1 space-y-3">
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {item.desc}
              </p>

              <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850 rounded-xl space-y-2 relative">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Thao tác chi tiết (Action Item)</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                  {item.action}
                </p>
                
                <button
                  onClick={() => handleCopyText(item.action, idx)}
                  className="absolute top-3 right-3 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 transition-colors cursor-pointer"
                  title="Sao chép chỉ dẫn"
                  id={`copy-action-step-${idx}`}
                >
                  {copiedIndex === idx ? (
                    <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Đã copy
                    </span>
                  ) : (
                    <Clipboard className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
