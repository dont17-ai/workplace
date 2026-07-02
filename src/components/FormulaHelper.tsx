/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FORMULAS } from '../data/workspaceData';
import { Check, Clipboard, Sparkles, Cpu, AlertCircle, Bookmark } from 'lucide-react';
import { useState } from 'react';

export default function FormulaHelper() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyFormula = (formulaText: string, id: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in" id="formula-helper-tab">
      {/* Header */}
      <div>
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Notion Formulas 2.0 Engine</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
          <Cpu className="w-5.5 h-5.5 text-black dark:text-white shrink-0" />
          Thư viện Công thức Vận hành tự động hóa (Formulas)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Sao chép các đoạn mã công thức Notion dưới đây và dán trực tiếp vào thuộc tính kiểu `Formula` để hệ thống tự động vẽ thanh tiến độ hoặc đếm ngược hạn chót chính xác.
        </p>
      </div>

      {/* Grid formulas */}
      <div className="space-y-6" id="formulas-list-container">
        {FORMULAS.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center text-lg font-bold">
                  {item.id.split('-')[1]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-400">Áp dụng: {item.useCase}</p>
                </div>
              </div>

              <button
                onClick={() => handleCopyFormula(item.formula, item.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer self-start md:self-center"
                id={`copy-formula-btn-${item.id}`}
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Copy công thức</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {item.description}
            </p>

            {/* Code Box */}
            <div className="relative">
              <pre className="p-4 bg-slate-950 text-slate-300 font-mono text-xs rounded-xl overflow-x-auto border border-slate-850 max-h-[220px] scrollbar-thin">
                <code>{item.formula}</code>
              </pre>
            </div>

            {/* Explanations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-850 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Giải thích thuật toán</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  {item.explanation}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Lợi ích vận hành</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  Tăng tính tự động hóa thông tin trực quan, loại bỏ các bước báo cáo tiến trình thủ công bằng tay từ giáo viên và bộ môn.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
