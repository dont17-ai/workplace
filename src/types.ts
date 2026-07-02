/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId =
  | 'home'
  | 'bgh' // Ban Giám hiệu
  | 'tieuhoc' // Tổ Tiểu học
  | 'trunghoc' // Tổ Trung học
  | 'vanphong' // Tổ Văn phòng
  | 'pdp' // Tổ PDP
  | 'cths' // Phòng CTHS
  | 'tuyensinh' // Phòng Tuyển sinh
  | 'dvhs' // Phòng DVHS
  | 'hoclieu' // Kho học liệu
  | 'bieumau' // Biểu mẫu
  | 'quytrinh' // Quy trình
  | 'lich' // Lịch công tác
  | 'duan' // Dự án
  | 'kho' // Kho lưu trữ
  | 'thanhvien'; // Thành viên

export interface PageConfig {
  id: PageId;
  title: string;
  vietnameseTitle: string;
  icon: string;
  description: string;
  cover: string;
  category: 'workspace' | 'departments' | 'database' | 'resources';
  accentColor: string;
}

export type DatabaseId =
  | 'thanhvien'
  | 'phongban'
  | 'tailieu'
  | 'cuochop'
  | 'congviec'
  | 'duan'
  | 'thongbao'
  | 'khotrithuc'
  | 'bieumau'
  | 'lich'
  | 'muctieu'
  | 'tainguyen';

export interface DatabaseField {
  name: string;
  type: 'Title' | 'Text' | 'Select' | 'Multi-select' | 'Relation' | 'Rollup' | 'Formula' | 'Date' | 'Person' | 'Status' | 'Checkbox' | 'URL';
  description: string;
  formula?: string;
  relationTo?: DatabaseId;
  rollupSource?: string;
  rollupProperty?: string;
}

export interface DatabaseConfig {
  id: DatabaseId;
  name: string;
  vietnameseName: string;
  icon: string;
  description: string;
  properties: DatabaseField[];
}

export interface DatabaseRelation {
  fromDb: DatabaseId;
  toDb: DatabaseId;
  reason: string;
  type: '1:1' | '1:N' | 'N:N';
}

export interface MockTask {
  id: string;
  title: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Deferred';
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  deadline: string;
  project?: string;
  department: string;
}

export interface MockMeeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface MockDocument {
  id: string;
  title: string;
  type: 'Quy trình' | 'Biểu mẫu' | 'Tài liệu' | 'Học liệu';
  author: string;
  department: string;
  updatedAt: string;
  status: 'Nháp' | 'Chờ duyệt' | 'Đã ban hành';
}

export interface MockProject {
  id: string;
  title: string;
  status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed';
  progress: number; // percentage
  lead: string;
  startDate: string;
  endDate: string;
  department: string;
}

export interface NotionFormula {
  id: string;
  name: string;
  description: string;
  formula: string;
  explanation: string;
  useCase: string;
}

export interface NotionTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  markdown: string;
}
