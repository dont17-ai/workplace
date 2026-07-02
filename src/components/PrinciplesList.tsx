/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ARCHITECTURE_PRINCIPLES, TEMPLATES } from '../data/workspaceData';
import { Check, Clipboard, GitBranch, ShieldAlert, Award, FileText, ChevronRight, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function PrinciplesList() {
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);

  const handleCopyTemplate = (markdown: string, id: string) => {
    navigator.clipboard.writeText(markdown);
    setCopiedTemplateId(id);
    setTimeout(() => setCopiedTemplateId(null), 1500);
  };

  const activeTemplate = TEMPLATES[activeTemplateIndex];

  return (
    <div className="space-y-8 animate-fade-in" id="principles-tab">
      {/* Header */}
      <div>
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Workspace Governance & Blueprints</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
          <GitBranch className="w-5.5 h-5.5 text-black dark:text-white shrink-0" />
          Kiến trúc Phân cấp & Nguyên tắc Quản trị Sạch (Governance)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Tìm hiểu sơ đồ phân cấp trang, các nguyên tắc quản trị và bảo trì lâu dài hệ thống không bị "rác", kèm theo các mẫu thiết kế trang (Templates) chuẩn hóa.
        </p>
      </div>

      {/* Page Hierarchy and ASCII map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left (5 Columns): ASCII diagram */}
        <div className="lg:col-span-5 bg-slate-950 text-slate-300 p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
            <GitBranch className="w-4 h-4" /> Sơ đồ phân cấp các trang (Page Tree Map)
          </h3>
          
          <pre className="p-4 bg-slate-900 text-[10px] md:text-xs font-mono text-emerald-400 rounded-xl overflow-x-auto border border-slate-800 leading-relaxed scrollbar-thin">
{`🏠 HOME DASHBOARD (Trang chủ chính)
 ├── 👨💼 Ban Giám hiệu (Quyền bảo mật)
 ├── 👩🏫 Tổ Tiểu học (Khối chuyên môn)
 ├── 🎓 Tổ Trung học (Khối chuyên môn)
 ├── 🏢 Tổ Văn phòng (Hành chính - Kế toán)
 ├── 🌱 Tổ PDP (Phát triển cá nhân)
 ├── ❤️ Phòng CTHS (Công tác Học sinh)
 ├── 📣 Phòng Tuyển sinh & Truyền thông
 ├── 🤝 Phòng DVHS (Dịch vụ Học sinh)
 ├── 📚 Thư viện Học liệu Số
 ├── 📑 Kho Biểu mẫu Chuẩn SOP
 ├── ⚙️ Sổ tay Quy trình Vận hành SOP
 └── ⚙️ [⚙️ Database Trung tâm - Ẩn]
      ├── 👥 DB_ThanhVien
      ├── 🏢 DB_PhongBan
      ├── 📄 DB_TaiLieu
      ├── 📅 DB_CuocHop
      ├── ✅ DB_CongViec
      └── 📝 DB_DuAn`}
          </pre>
          <p className="text-[10px] text-slate-500 font-medium">
            *Gợi ý:* Đặt cơ sở dữ liệu gốc (Central Databases) ẩn hoàn toàn trong một folder riêng để nhân sự không vô tình thao tác sai cấu trúc dữ liệu.
          </p>
        </div>

        {/* Right (7 Columns): 5 Golden Rules */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider block">5 Nguyên tắc vàng bảo trì Workspace</h3>
          
          <div className="space-y-3" id="principles-cards-list">
            {ARCHITECTURE_PRINCIPLES.map((rule, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex gap-3 items-start">
                <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">{rule.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1 font-medium">
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Exporter (Fulfills Templates Requirement) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5" id="templates-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4.5 h-4.5 text-black dark:text-white" /> Bản mẫu thiết kế layout (Markdown Templates Exporter)
            </h3>
            <p className="text-[11px] text-slate-400">Sao chép bản thiết kế layout chuẩn hóa để bắt đầu dán trực tiếp vào trang trống Notion</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
            {TEMPLATES.map((t, index) => (
              <button
                key={t.id}
                onClick={() => setActiveTemplateIndex(index)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                  activeTemplateIndex === index 
                    ? 'bg-white dark:bg-slate-900 shadow-xs text-slate-900 dark:text-white' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                id={`template-select-${t.id}`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Template Viewer */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/20 p-4 border border-slate-100 dark:border-slate-850 rounded-xl text-xs">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200">{activeTemplate.name}</p>
              <p className="text-slate-400 text-[10px] mt-0.5">{activeTemplate.description}</p>
            </div>
            
            <button
              onClick={() => handleCopyTemplate(activeTemplate.markdown, activeTemplate.id)}
              className="flex items-center gap-1 px-3 py-1.5 bg-black hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 text-white rounded-lg text-xs font-semibold cursor-pointer"
              id="copy-template-markdown"
            >
              {copiedTemplateId === activeTemplate.id ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <pre className="p-5 bg-slate-950 text-slate-300 font-mono text-[11px] rounded-2xl overflow-x-auto border border-slate-850 max-h-[350px] scrollbar-thin leading-relaxed">
              <code>{activeTemplate.markdown}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
