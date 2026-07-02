/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PageConfig,
  DatabaseConfig,
  DatabaseRelation,
  MockTask,
  MockMeeting,
  MockDocument,
  MockProject,
  NotionFormula,
  NotionTemplate
} from '../types';

export const PAGES: PageConfig[] = [
  {
    id: 'home',
    title: 'Home Dashboard',
    vietnameseTitle: 'Trang chủ Hệ thống',
    icon: '🏠',
    description: 'Trung tâm đầu não quản trị tri thức và vận hành toàn trường. Nơi tổng hợp công việc cá nhân, thông báo chung, lịch họp và liên kết nhanh.',
    cover: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600',
    category: 'workspace',
    accentColor: 'blue'
  },
  {
    id: 'bgh',
    title: 'Ban Giám hiệu',
    vietnameseTitle: 'Văn phòng Ban Giám hiệu',
    icon: '👨💼',
    description: 'Không gian làm việc bảo mật của Ban Giám hiệu. Quản lý chiến lược, kế hoạch năm học, ngân sách, nhân sự chủ chốt và chỉ đạo điều hành.',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600',
    category: 'departments',
    accentColor: 'indigo'
  },
  {
    id: 'tieuhoc',
    title: 'Tổ Tiểu học',
    vietnameseTitle: 'Khối chuyên môn Tiểu học',
    icon: '👩🏫',
    description: 'Không gian sinh hoạt chuyên môn, giáo án, kế hoạch bài giảng, theo dõi học tập và các sự kiện dành riêng cho cấp Tiểu học.',
    cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600',
    category: 'departments',
    accentColor: 'emerald'
  },
  {
    id: 'trunghoc',
    title: 'Tổ Trung học',
    vietnameseTitle: 'Khối chuyên môn Trung học',
    icon: '🎓',
    description: 'Nơi quản lý chương trình học, ôn thi tốt nghiệp, hướng nghiệp, học liệu và đánh giá chất lượng dạy và học khối Trung học cơ sở & Phổ thông.',
    cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600',
    category: 'departments',
    accentColor: 'violet'
  },
  {
    id: 'vanphong',
    title: 'Tổ Văn phòng',
    vietnameseTitle: 'Phòng Hành chính - Kế toán',
    icon: '🏢',
    description: 'Trung tâm dịch vụ hành chính, quản lý tài sản, cơ sở vật chất, tài chính kế toán, mua sắm trang thiết bị và thủ tục pháp lý.',
    cover: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
    category: 'departments',
    accentColor: 'amber'
  },
  {
    id: 'pdp',
    title: 'Tổ PDP',
    vietnameseTitle: 'Tổ Phát triển Cá nhân (PDP)',
    icon: '🌱',
    description: 'Phát triển kỹ năng thế kỷ 21, hoạt động trải nghiệm, câu lạc bộ, hướng nghiệp, giáo dục kỹ năng sống và giá trị sống cho học sinh.',
    cover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
    category: 'departments',
    accentColor: 'teal'
  },
  {
    id: 'cths',
    title: 'Phòng CTHS',
    vietnameseTitle: 'Phòng Công tác Học sinh',
    icon: '❤️',
    description: 'Nơi chăm sóc đời sống tinh thần, tư vấn tâm lý học đường, quản lý kỷ luật tích cực, nền nếp và các hoạt động phong trào học sinh.',
    cover: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1600',
    category: 'departments',
    accentColor: 'rose'
  },
  {
    id: 'tuyensinh',
    title: 'Phòng Tuyển sinh',
    vietnameseTitle: 'Văn phòng Tuyển sinh & Truyền thông',
    icon: '📣',
    description: 'Quản lý thông tin học sinh tiềm năng, tư vấn nhập học, tổ chức sự kiện Open Day, chiến dịch truyền thông thương hiệu nhà trường.',
    cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1600',
    category: 'departments',
    accentColor: 'orange'
  },
  {
    id: 'dvhs',
    title: 'Phòng DVHS',
    vietnameseTitle: 'Phòng Dịch vụ Học sinh',
    icon: '🤝',
    description: 'Quản lý dịch vụ bán trú, xe đưa đón (bus school), đồng phục, sách giáo khoa, nhà ăn trường học và tiếp nhận ý kiến phản hồi từ phụ huynh.',
    cover: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1600',
    category: 'departments',
    accentColor: 'cyan'
  },
  {
    id: 'hoclieu',
    title: 'Kho học liệu',
    vietnameseTitle: 'Thư viện Học liệu Số',
    icon: '📚',
    description: 'Kho lưu trữ và chia sẻ giáo án, bài giảng điện tử, đề thi, chuyên đề và tài liệu tham khảo đồng bộ theo khối lớp và môn học.',
    cover: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600',
    category: 'resources',
    accentColor: 'emerald'
  },
  {
    id: 'bieumau',
    title: 'Biểu mẫu',
    vietnameseTitle: 'Hệ thống Biểu mẫu Hành chính',
    icon: '📑',
    description: 'Nơi cung cấp các biểu mẫu chuẩn của trường: đơn từ, phiếu đề xuất, báo cáo chuyên môn, mẫu đánh giá dành cho giáo viên và nhân viên.',
    cover: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1600',
    category: 'resources',
    accentColor: 'sky'
  },
  {
    id: 'quytrinh',
    title: 'Quy trình',
    vietnameseTitle: 'Sổ tay Quy trình Vận hành SOP',
    icon: '⚙️',
    description: 'Các quy trình vận hành tiêu chuẩn (SOP) của trường học nhằm thống nhất cách xử lý công việc hành chính, khẩn cấp và chuyên môn.',
    cover: 'https://images.unsplash.com/photo-1521791136368-1a46827d0412?auto=format&fit=crop&q=80&w=1600',
    category: 'resources',
    accentColor: 'slate'
  },
  {
    id: 'lich',
    title: 'Lịch công tác',
    vietnameseTitle: 'Lịch công tác & Sự kiện Trường',
    icon: '📅',
    description: 'Lịch biểu chi tiết về các kỳ thi, ngày lễ, hoạt động ngoại khóa, hội họp và các sự kiện lớn trong năm học.',
    cover: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1600',
    category: 'database',
    accentColor: 'blue'
  },
  {
    id: 'duan',
    title: 'Dự án',
    vietnameseTitle: 'Quản lý Dự án & Chiến dịch',
    icon: '📝',
    description: 'Theo dõi tiến độ triển khai các dự án trường học như cải tạo cơ sở vật chất, phát triển thương hiệu, số hóa học trình hoặc kiểm định chất lượng.',
    cover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600',
    category: 'database',
    accentColor: 'indigo'
  },
  {
    id: 'kho',
    title: 'Kho lưu trữ',
    vietnameseTitle: 'Kho dữ liệu & Hồ sơ Lịch sử',
    icon: '📂',
    description: 'Nơi lưu trữ các tài liệu năm học cũ, ảnh hoạt động sự kiện, hồ sơ kiểm định và các tài nguyên không còn vận hành trực tiếp.',
    cover: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1600',
    category: 'resources',
    accentColor: 'amber'
  },
  {
    id: 'thanhvien',
    title: 'Thành viên',
    vietnameseTitle: 'Danh bạ Nhân sự & Đội ngũ',
    icon: '👥',
    description: 'Danh bạ điện tử kết nối toàn bộ Ban Giám hiệu, Giáo viên, Nhân viên hành chính và các phòng ban liên quan kèm thông tin liên hệ nhanh.',
    cover: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600',
    category: 'database',
    accentColor: 'slate'
  }
];

export const DATABASES: DatabaseConfig[] = [
  {
    id: 'thanhvien',
    name: 'DB_ThanhVien',
    vietnameseName: 'Danh bạ Thành viên',
    icon: '👥',
    description: 'Cơ sở dữ liệu tập trung lưu trữ hồ sơ, email, chức vụ, tổ chuyên môn và trạng thái công tác của toàn bộ cán bộ giáo viên nhân viên.',
    properties: [
      { name: 'Họ và tên', type: 'Title', description: 'Tên đầy đủ của nhân sự' },
      { name: 'Chức vụ', type: 'Select', description: 'Ví dụ: Hiệu trưởng, Trưởng bộ môn, Giáo viên chủ nhiệm, Chuyên viên' },
      { name: 'Email trường', type: 'URL', description: 'Địa chỉ email công vụ (...@school.edu.vn)' },
      { name: 'Phòng ban / Tổ', type: 'Relation', description: 'Liên kết tới DB_PhongBan để biết thuộc tổ chuyên môn nào', relationTo: 'phongban' },
      { name: 'Công việc đang phụ trách', type: 'Relation', description: 'Liên kết đảo từ DB_CongViec hiển thị các việc được giao', relationTo: 'congviec' },
      { name: 'Dự án tham gia', type: 'Relation', description: 'Liên kết tới DB_DuAn để biết tham gia những ban dự án nào', relationTo: 'duan' },
      { name: 'Trạng thái hoạt động', type: 'Select', description: 'Đang làm việc / Nghỉ thai sản / Nghỉ phép / Đã nghỉ việc' }
    ]
  },
  {
    id: 'phongban',
    name: 'DB_PhongBan',
    vietnameseName: 'Phòng ban & Tổ chuyên môn',
    icon: '🏢',
    description: 'Danh mục các phòng ban, tổ chuyên môn trong trường, dùng làm trung tâm điều hướng thông tin.',
    properties: [
      { name: 'Tên Phòng Ban', type: 'Title', description: 'Ví dụ: Tổ Tiểu học, Ban Giám hiệu, Tổ Văn phòng' },
      { name: 'Trưởng bộ phận', type: 'Person', description: 'Người chịu trách nhiệm cao nhất của phòng ban (liên kết từ DB_ThanhVien)' },
      { name: 'Nhân sự trực thuộc', type: 'Relation', description: 'Liên kết hai chiều với DB_ThanhVien để hiển thị danh sách thành viên', relationTo: 'thanhvien' },
      { name: 'Số lượng nhân sự', type: 'Rollup', description: 'Đếm số lượng thành viên liên kết từ DB_ThanhVien', rollupSource: 'Nhân sự trực thuộc', rollupProperty: 'Họ và tên' },
      { name: 'Tài liệu sở hữu', type: 'Relation', description: 'Danh sách tài liệu do phòng ban này ban hành hoặc sở hữu', relationTo: 'tailieu' }
    ]
  },
  {
    id: 'tailieu',
    name: 'DB_TaiLieu',
    vietnameseName: 'Kho Tài liệu & Học liệu',
    icon: '📄',
    description: 'Lưu trữ toàn bộ tài liệu chuyên môn, giáo án, công văn, tài liệu hướng dẫn và học liệu số của trường học.',
    properties: [
      { name: 'Tên tài liệu', type: 'Title', description: 'Tiêu đề tài liệu hoặc học liệu' },
      { name: 'Loại tài liệu', type: 'Select', description: 'Giáo án / Đề thi / Sổ tay / Công văn / Học liệu số / Slide giảng dạy' },
      { name: 'Người soạn thảo', type: 'Relation', description: 'Liên kết tới DB_ThanhVien xác định tác giả', relationTo: 'thanhvien' },
      { name: 'Bộ phận sở hữu', type: 'Relation', description: 'Liên kết tới DB_PhongBan xác định đơn vị chịu trách nhiệm', relationTo: 'phongban' },
      { name: 'Khối lớp', type: 'Multi-select', description: 'Ví dụ: Khối 1, Khối 2... hoặc Toàn trường' },
      { name: 'File đính kèm / Link', type: 'URL', description: 'Đường dẫn file PDF, Word hoặc Google Drive tài liệu' },
      { name: 'Trạng thái phê duyệt', type: 'Status', description: 'Nháp / Chờ duyệt / Đã phê duyệt / Cần chỉnh sửa' }
    ]
  },
  {
    id: 'cuochop',
    name: 'DB_CuocHop',
    vietnameseName: 'Quản lý Cuộc họp',
    icon: '📅',
    description: 'Cơ sở dữ liệu lưu trữ lịch họp, chương trình họp (Agenda), biên bản cuộc họp (Meeting Minutes) và phân công sau cuộc họp.',
    properties: [
      { name: 'Chủ đề cuộc họp', type: 'Title', description: 'Tiêu đề buổi họp' },
      { name: 'Thời gian bắt đầu', type: 'Date', description: 'Ngày giờ diễn ra cuộc họp' },
      { name: 'Địa điểm / Phòng họp', type: 'Select', description: 'Phòng Hội đồng, Phòng họp nhỏ, Trực tuyến Zoom, v.v.' },
      { name: 'Người chủ trì', type: 'Relation', description: 'Người điều phối cuộc họp (DB_ThanhVien)', relationTo: 'thanhvien' },
      { name: 'Thành phần tham dự', type: 'Relation', description: 'Danh sách nhân sự tham gia (DB_ThanhVien)', relationTo: 'thanhvien' },
      { name: 'Biên bản cuộc họp', type: 'Text', description: 'Ghi chép nhanh nội dung, kết luận hoặc tóm tắt ý chính' },
      { name: 'Dự án liên quan', type: 'Relation', description: 'Họp nhằm phục vụ cho dự án nào', relationTo: 'duan' }
    ]
  },
  {
    id: 'congviec',
    name: 'DB_CongViec',
    vietnameseName: 'Quản lý Công việc (Tasks)',
    icon: '✅',
    description: 'Hệ thống quản lý và giám sát toàn bộ công việc hàng ngày của từng giáo viên, nhân sự hành chính hoặc ban dự án.',
    properties: [
      { name: 'Tên công việc', type: 'Title', description: 'Nhiệm vụ cụ thể cần thực hiện' },
      { name: 'Trạng thái', type: 'Status', description: 'Chưa bắt đầu / Đang thực hiện / Đang xem xét / Đã hoàn thành' },
      { name: 'Người thực hiện', type: 'Relation', description: 'Nhân sự chịu trách nhiệm chính (DB_ThanhVien)', relationTo: 'thanhvien' },
      { name: 'Hạn chót', type: 'Date', description: 'Thời hạn hoàn thành nhiệm vụ' },
      { name: 'Độ ưu tiên', type: 'Select', description: 'Khẩn cấp / Cao / Trung bình / Thấp' },
      { name: 'Dự án liên kết', type: 'Relation', description: 'Thuộc dự án lớn nào (DB_DuAn)', relationTo: 'duan' },
      { name: 'Thời gian còn lại', type: 'Formula', description: 'Hiển thị số ngày còn lại hoặc Cảnh báo Quá hạn', formula: 'Days_Remaining_Formula' }
    ]
  },
  {
    id: 'duan',
    name: 'DB_DuAn',
    vietnameseName: 'Dự án & Chiến dịch',
    icon: '📝',
    description: 'Quản lý các chiến dịch dài hạn, sự kiện lớn của trường học (ví dụ: Tuyển sinh năm học mới, Tổ chức Trung Thu, Kiểm định giáo dục).',
    properties: [
      { name: 'Tên Dự Án', type: 'Title', description: 'Tên sự kiện hoặc dự án lớn' },
      { name: 'Trạng thái dự án', type: 'Select', description: 'Lên kế hoạch / Đang triển khai / Tạm dừng / Đã hoàn thành' },
      { name: 'Chủ nhiệm dự án', type: 'Relation', description: 'Người chịu trách nhiệm điều phối dự án (DB_ThanhVien)', relationTo: 'thanhvien' },
      { name: 'Danh sách công việc', type: 'Relation', description: 'Các đầu việc nhỏ thuộc dự án (liên kết đảo DB_CongViec)', relationTo: 'congviec' },
      { name: 'Tiến độ dự án (%)', type: 'Formula', description: 'Tính toán % công việc đã hoàn thành trong dự án', formula: 'Progress_Bar_Formula' },
      { name: 'Ngày khởi chạy', type: 'Date', description: 'Khoảng thời gian diễn ra dự án (Start to End)' },
      { name: 'Tài liệu liên quan', type: 'Relation', description: 'Tài nguyên, hướng dẫn đi kèm dự án', relationTo: 'tailieu' }
    ]
  },
  {
    id: 'thongbao',
    name: 'DB_ThongBao',
    vietnameseName: 'Thông báo Nội bộ',
    icon: '📢',
    description: 'Các thông báo, quyết định chính thức từ Ban Giám hiệu hoặc các ban phòng chuyên môn đến toàn thể nhà trường.',
    properties: [
      { name: 'Tiêu đề thông báo', type: 'Title', description: 'Nội dung cốt lõi của thông báo' },
      { name: 'Ngày đăng', type: 'Date', description: 'Ngày ban hành thông báo' },
      { name: 'Đơn vị phát hành', type: 'Relation', description: 'Liên kết tới DB_PhongBan', relationTo: 'phongban' },
      { name: 'Mức độ quan trọng', type: 'Select', description: 'Khẩn / Quan trọng / Tin tức thường nhật' },
      { name: 'Trạng thái', type: 'Select', description: 'Bản nháp / Đã phát hành / Đã gỡ bỏ' },
      { name: 'Người ký duyệt', type: 'Relation', description: 'Hiệu trưởng hoặc Trưởng bộ phận (DB_ThanhVien)', relationTo: 'thanhvien' }
    ]
  },
  {
    id: 'khotrithuc',
    name: 'DB_KhoTriThuc',
    vietnameseName: 'Wiki & Tri thức Nội bộ',
    icon: '📚',
    description: 'Cơ sở tri thức tích lũy kinh nghiệm giảng dạy, quy trình nâng cao, bài viết chuyên môn và cẩm nang xử lý tình huống sư phạm.',
    properties: [
      { name: 'Tiêu đề bài viết', type: 'Title', description: 'Tên bài viết tri thức hoặc cẩm nang' },
      { name: 'Chủ đề', type: 'Select', description: 'Phương pháp giảng dạy / Tâm lý học sinh / Công nghệ giáo dục / Quản lý lớp học' },
      { name: 'Tác giả', type: 'Relation', description: 'Giáo viên viết bài chia sẻ (DB_ThanhVien)', relationTo: 'thanhvien' },
      { name: 'Trạng thái biên tập', type: 'Select', description: 'Đang viết / Chờ duyệt / Đã xuất bản nội bộ' },
      { name: 'Lượt xem / Đánh giá', type: 'Text', description: 'Ý kiến đóng góp từ các đồng nghiệp khác' }
    ]
  },
  {
    id: 'bieumau',
    name: 'DB_BieuMau',
    vietnameseName: 'Kho Biểu mẫu Chuẩn',
    icon: '📑',
    description: 'Lưu trữ các file mẫu chuẩn để giáo viên, nhân sự tải về sử dụng ngay.',
    properties: [
      { name: 'Tên biểu mẫu', type: 'Title', description: 'Mẫu đơn xin nghỉ phép, Phiếu thanh toán, Phiếu khảo sát...' },
      { name: 'Mã biểu mẫu', type: 'Text', description: 'Ký hiệu chuẩn hóa, ví dụ: BM-HC-01, BM-DT-15' },
      { name: 'Phòng ban ban hành', type: 'Relation', description: 'Bộ phận quản lý biểu mẫu này (DB_PhongBan)', relationTo: 'phongban' },
      { name: 'Link Download', type: 'URL', description: 'Đường dẫn file Word, Excel mẫu trên Drive trường' },
      { name: 'Cập nhật lần cuối', type: 'Date', description: 'Ngày sửa đổi biểu mẫu gần nhất' }
    ]
  },
  {
    id: 'lich',
    name: 'DB_LichSuKien',
    vietnameseName: 'Lịch công tác chung',
    icon: '📆',
    description: 'Lịch tích hợp các hoạt động dạy, học, kiểm định chất lượng, hoạt động ngoại khóa toàn trường.',
    properties: [
      { name: 'Tên Sự kiện / Lịch trình', type: 'Title', description: 'Tên hoạt động chính thức' },
      { name: 'Thời gian', type: 'Date', description: 'Ngày bắt đầu và kết thúc sự kiện' },
      { name: 'Đối tượng áp dụng', type: 'Multi-select', description: 'Học sinh / Giáo viên / Toàn trường / Phụ huynh' },
      { name: 'Loại sự kiện', type: 'Select', description: 'Chuyên môn / Ngoại khóa / Ngày lễ / Kỳ thi / Sự kiện cộng đồng' },
      { name: 'Phụ trách tổ chức', type: 'Relation', description: 'Tổ chịu trách nhiệm chính (DB_PhongBan)', relationTo: 'phongban' }
    ]
  },
  {
    id: 'muctieu',
    name: 'DB_MucTieuOKRs',
    vietnameseName: 'Mục tiêu chiến lược (OKRs)',
    icon: '🎯',
    description: 'Theo dõi mục tiêu chất lượng và chỉ số KPIs/OKRs của nhà trường và các tổ bộ môn theo từng năm học.',
    properties: [
      { name: 'Mục tiêu cốt lõi', type: 'Title', description: 'Tên mục tiêu chiến lược của năm học hoặc quý' },
      { name: 'Chỉ số đo lường (KR)', type: 'Text', description: 'Ví dụ: Đạt 95% tỷ lệ học sinh khá giỏi, tuyển sinh vượt 10% chỉ tiêu' },
      { name: 'Bộ phận chịu trách nhiệm', type: 'Relation', description: 'Liên kết tới DB_PhongBan phụ trách chính', relationTo: 'phongban' },
      { name: 'Tiến độ mục tiêu', type: 'Select', description: 'Chưa đạt / Đang bám sát / Đạt xuất sắc / Trễ hạn' },
      { name: 'Dự án bổ trợ', type: 'Relation', description: 'Các dự án được tạo ra nhằm hoàn thành mục tiêu này (DB_DuAn)', relationTo: 'duan' }
    ]
  },
  {
    id: 'tainguyen',
    name: 'DB_TaiNguyenCoSo',
    vietnameseName: 'Tài nguyên & Cơ sở vật chất',
    icon: '📦',
    description: 'Quản lý việc mượn/trả, đặt trước và kiểm kê thiết bị dạy học, phòng chức năng, iPad học tập, xe đưa đón.',
    properties: [
      { name: 'Tên Tài nguyên / Thiết bị', type: 'Title', description: 'Ví dụ: Phòng Studio, Máy chiếu di động, Bộ kính thực tế ảo VR, Xe bus số 3' },
      { name: 'Loại tài nguyên', type: 'Select', description: 'Phòng chức năng / Thiết bị CNTT / Học cụ đặc biệt / Phương tiện' },
      { name: 'Trạng thái khả dụng', type: 'Select', description: 'Sẵn sàng / Đang được mượn / Đang bảo trì / Hỏng hóc' },
      { name: 'Bộ phận quản lý trực tiếp', type: 'Relation', description: 'Đơn vị bàn giao mượn trả (DB_PhongBan)', relationTo: 'phongban' },
      { name: 'Lịch sử mượn trả', type: 'Text', description: 'Ghi chú người mượn gần nhất và thời gian trả' }
    ]
  }
];

export const RELATIONS: DatabaseRelation[] = [
  {
    fromDb: 'thanhvien',
    toDb: 'phongban',
    reason: 'Phân định rõ nhân sự thuộc bộ phận nào, đồng thời phòng ban có thể đếm tự động (Rollup) số lượng nhân viên dưới quyền.',
    type: '1:N'
  },
  {
    fromDb: 'thanhvien',
    toDb: 'congviec',
    reason: 'Giao việc chính xác cho từng cá nhân (Assignee). Giúp cá nhân xem được "Công việc của tôi" (My Tasks) ngay tại màn hình chính.',
    type: '1:N'
  },
  {
    fromDb: 'thanhvien',
    toDb: 'duan',
    reason: 'Xác định các thành viên nằm trong Ban quản lý dự án (Project Team) hoặc phân công Chủ nhiệm dự án (Project Owner).',
    type: 'N:N'
  },
  {
    fromDb: 'phongban',
    toDb: 'tailieu',
    reason: 'Quản lý quyền sở hữu tài liệu chuyên môn. Đảm bảo nhân sự phòng ban nào được truy cập nhanh tài liệu phòng ban đó.',
    type: '1:N'
  },
  {
    fromDb: 'duan',
    toDb: 'congviec',
    reason: 'Phân rã các mục tiêu lớn của dự án thành từng đầu việc cụ thể. Tiến độ dự án tự động tính toán từ % công việc hoàn thành.',
    type: '1:N'
  },
  {
    fromDb: 'duan',
    toDb: 'cuochop',
    reason: 'Liên kết các cuộc họp điều phối, họp tiến độ (Weekly Sync) trực tiếp vào không gian dự án để tra cứu quyết định đã thống nhất.',
    type: '1:N'
  },
  {
    fromDb: 'duan',
    toDb: 'tailieu',
    reason: 'Lưu trữ các kế hoạch dự án, đề xuất ngân sách, bản thiết kế liên quan trực tiếp đến dự án tại một thư mục thống nhất.',
    type: 'N:N'
  },
  {
    fromDb: 'tailieu',
    toDb: 'khotrithuc',
    reason: 'Sách giáo khoa, học trình gốc từ DB_TaiLieu có thể liên kết trực tiếp sang DB_KhoTriThuc để minh họa cho các phương pháp sư phạm.',
    type: 'N:N'
  },
  {
    fromDb: 'thongbao',
    toDb: 'phongban',
    reason: 'Xác định thông báo này do bộ phận nào ban hành hoặc áp dụng riêng cho phòng ban nào (ví dụ: Thông báo của Tổ Tiểu học).',
    type: '1:N'
  },
  {
    fromDb: 'cuochop',
    toDb: 'thanhvien',
    reason: 'Quản lý thành phần mời tham dự cuộc họp, tự động nhắc nhở trên lịch cá nhân của từng thành viên liên quan.',
    type: 'N:N'
  }
];

// --- Mock Data for Simulator ---
export const MOCK_MEMBERS = [
  'Thầy Nguyễn Văn An (BGH - Hiệu trưởng)',
  'Cô Lê Thị Bình (BGH - Phó Hiệu trưởng Tiểu học)',
  'Thầy Trần Minh Đức (BGH - Phó Hiệu trưởng Trung học)',
  'Cô Nguyễn Thu Hương (Tổ trưởng Tổ Tiểu học)',
  'Thầy Phạm Hoàng Nam (Tổ trưởng Tổ Trung học)',
  'Cô Hoàng Mỹ Linh (Trưởng phòng Tuyển sinh)',
  'Thầy Vũ Quốc Anh (Trưởng phòng Công tác Học sinh - CTHS)',
  'Cô Đặng Thu Trang (Trưởng phòng Dịch vụ Học sinh - DVHS)',
  'Thầy Đỗ Minh Quân (Tổ trưởng Tổ Văn phòng - Hành chính)',
  'Cô Mai Thanh Vân (Trưởng bộ phận PDP)',
  'Cô Phan Khánh Chi (Giáo viên Tiểu học)',
  'Thầy Trịnh Hoàng Bách (Giáo viên Toán Trung học)',
  'Cô Vũ Thùy Dương (Chuyên viên Tuyển sinh)'
];

export const MOCK_TASKS: MockTask[] = [
  { id: 'T-01', title: 'Hoàn thiện kế hoạch ngân sách năm học 2026-2027', status: 'In Progress', priority: 'High', assignee: 'Thầy Nguyễn Văn An (BGH - Hiệu trưởng)', deadline: '2026-07-15', project: 'Ngân sách học trình', department: 'Ban Giám hiệu' },
  { id: 'T-02', title: 'Xây dựng phân phối chương trình Tiếng Việt lớp 1 mới', status: 'In Progress', priority: 'High', assignee: 'Cô Nguyễn Thu Hương (Tổ trưởng Tổ Tiểu học)', deadline: '2026-07-10', project: 'Đổi mới học liệu Tiểu học', department: 'Tổ Tiểu học' },
  { id: 'T-03', title: 'Soạn thảo đề cương ôn tập thi giữa kỳ Toán lớp 10', status: 'Not Started', priority: 'Medium', assignee: 'Thầy Trịnh Hoàng Bách (Giáo viên Toán Trung học)', deadline: '2026-07-20', project: 'Ngân hàng đề thi', department: 'Tổ Trung học' },
  { id: 'T-04', title: 'Kiểm tra bảo dưỡng toàn bộ hệ thống máy lạnh phòng học', status: 'Completed', priority: 'High', assignee: 'Thầy Đỗ Minh Quân (Tổ trưởng Tổ Văn phòng - Hành chính)', deadline: '2026-06-28', project: 'Cải tạo Cơ sở vật chất hè', department: 'Tổ Văn phòng' },
  { id: 'T-05', title: 'Lên kế hoạch chương trình Teambuilding khai giảng', status: 'In Progress', priority: 'Medium', assignee: 'Cô Mai Thanh Vân (Trưởng bộ phận PDP)', deadline: '2026-07-05', project: 'Sự kiện Khai giảng 2026', department: 'Tổ PDP' },
  { id: 'T-06', title: 'Biên soạn bộ quy tắc Ứng xử Học đường tích cực', status: 'Not Started', priority: 'High', assignee: 'Thầy Vũ Quốc Anh (Trưởng phòng Công tác Học sinh - CTHS)', deadline: '2026-07-25', project: 'Nền nếp Học đường', department: 'Phòng CTHS' },
  { id: 'T-07', title: 'Chạy chiến dịch quảng cáo Facebook tuyển sinh đợt 3', status: 'In Progress', priority: 'High', assignee: 'Cô Hoàng Mỹ Linh (Trưởng phòng Tuyển sinh)', deadline: '2026-07-08', project: 'Tuyển sinh khoá mới 2026', department: 'Phòng Tuyển sinh' },
  { id: 'T-08', title: 'Khảo sát và tối ưu hóa lộ trình xe đưa đón tuyến Tây Hồ', status: 'Completed', priority: 'Medium', assignee: 'Cô Đặng Thu Trang (Trưởng phòng Dịch vụ Học sinh - DVHS)', deadline: '2026-06-30', project: 'Nâng cấp Xe đưa đón', department: 'Phòng DVHS' },
  { id: 'T-09', title: 'Tập huấn giáo viên về phương pháp tư vấn tâm lý cơ bản', status: 'Deferred', priority: 'Low', assignee: 'Thầy Vũ Quốc Anh (Trưởng phòng Công tác Học sinh - CTHS)', deadline: '2026-08-01', project: 'Tâm lý học đường', department: 'Phòng CTHS' },
  { id: 'T-10', title: 'Phát hành biểu mẫu chuẩn đăng ký CLB Ngoại khoá', status: 'Completed', priority: 'Low', assignee: 'Cô Mai Thanh Vân (Trưởng bộ phận PDP)', deadline: '2026-06-25', project: 'Quản lý Câu lạc bộ', department: 'Tổ PDP' }
];

export const MOCK_PROJECTS: MockProject[] = [
  { id: 'P-01', title: 'Tuyển sinh khoá mới học kỳ mùa Thu 2026', status: 'In Progress', progress: 68, lead: 'Cô Hoàng Mỹ Linh (Trưởng phòng Tuyển sinh)', startDate: '2026-03-01', endDate: '2026-08-31', department: 'Phòng Tuyển sinh' },
  { id: 'P-02', title: 'Đổi mới học liệu & giáo án điện tử Tiểu học', status: 'In Progress', progress: 45, lead: 'Cô Nguyễn Thu Hương (Tổ trưởng Tổ Tiểu học)', startDate: '2026-05-15', endDate: '2026-08-15', department: 'Tổ Tiểu học' },
  { id: 'P-03', title: 'Cải tạo Cơ sở vật chất & Cảnh quan hè 2026', status: 'Completed', progress: 100, lead: 'Thầy Đỗ Minh Quân (Tổ trưởng Tổ Văn phòng)', startDate: '2026-06-01', endDate: '2026-06-30', department: 'Tổ Văn phòng' },
  { id: 'P-04', title: 'Ứng dụng Học tập Dự án & Đánh giá năng lực thực tế', status: 'Planning', progress: 10, lead: 'Thầy Trần Minh Đức (BGH - PHT Trung học)', startDate: '2026-07-01', endDate: '2026-12-25', department: 'Ban Giám hiệu' },
  { id: 'P-05', title: 'Số hóa Quy trình Vận hành SOP Nội bộ', status: 'In Progress', progress: 75, lead: 'Thầy Nguyễn Văn An (Hiệu trưởng)', startDate: '2026-04-10', endDate: '2026-07-30', department: 'Ban Giám hiệu' }
];

export const MOCK_MEETINGS: MockMeeting[] = [
  { id: 'M-01', title: 'Họp Hội đồng Sư phạm tháng 7 - Rà soát công tác hè', date: '2026-07-02', time: '08:30 - 11:30', location: 'Phòng Hội đồng chính', organizer: 'Thầy Nguyễn Văn An (BGH)', status: 'Scheduled' },
  { id: 'M-02', title: 'Sinh hoạt chuyên môn cấp Tiểu học - Thảo luận giáo án lớp 1', date: '2026-07-03', time: '14:00 - 15:30', location: 'Phòng họp tổ Tiểu học', organizer: 'Cô Nguyễn Thu Hương', status: 'Scheduled' },
  { id: 'M-03', title: 'Họp nhanh Ban Tuyển sinh - Đánh giá KPI đợt 2', date: '2026-07-01', time: '16:00 - 17:00', location: 'Phòng họp Tuyển sinh / Online Teams', organizer: 'Cô Hoàng Mỹ Linh', status: 'Completed' },
  { id: 'M-04', title: 'Thống nhất lộ trình xe bus học sinh cho năm học mới', date: '2026-07-06', time: '09:00 - 10:30', location: 'Phòng họp nhỏ hành chính', organizer: 'Cô Đặng Thu Trang', status: 'Scheduled' },
  { id: 'M-05', title: 'Họp liên bộ phận PDP & CTHS xây dựng Sổ tay học sinh', date: '2026-07-08', time: '10:00 - 12:00', location: 'Phòng Studio PDP', organizer: 'Cô Mai Thanh Vân', status: 'Scheduled' }
];

export const MOCK_DOCUMENTS: MockDocument[] = [
  { id: 'D-01', title: 'Quy trình SOP Tiếp đón phụ huynh và Học sinh tiềm năng', type: 'Quy trình', author: 'Cô Hoàng Mỹ Linh', department: 'Phòng Tuyển sinh', updatedAt: '2026-06-20', status: 'Đã ban hành' },
  { id: 'D-02', title: 'Biểu mẫu BM-HC-05: Đăng ký mượn thiết bị dạy học', type: 'Biểu mẫu', author: 'Thầy Đỗ Minh Quân', department: 'Tổ Văn phòng', updatedAt: '2026-05-14', status: 'Đã ban hành' },
  { id: 'D-03', title: 'Bộ Giáo án tích hợp Sư phạm STEM khối 4', type: 'Học liệu', author: 'Cô Phan Khánh Chi', department: 'Tổ Tiểu học', updatedAt: '2026-06-28', status: 'Chờ duyệt' },
  { id: 'D-04', title: 'Hướng dẫn Xử lý Khẩn cấp sự cố y tế học đường', type: 'Quy trình', author: 'Thầy Vũ Quốc Anh', department: 'Phòng CTHS', updatedAt: '2026-06-11', status: 'Đã ban hành' },
  { id: 'D-05', title: 'Đơn xin nghỉ phép của Giáo viên chuẩn năm 2026', type: 'Biểu mẫu', author: 'Thầy Đỗ Minh Quân', department: 'Tổ Văn phòng', updatedAt: '2026-02-10', status: 'Đã ban hành' },
  { id: 'D-06', title: 'Bài viết tri thức: 5 Phương pháp Quản lý Lớp học không nước mắt', type: 'Tài liệu', author: 'Cô Nguyễn Thu Hương', department: 'Tổ Tiểu học', updatedAt: '2026-06-30', status: 'Nháp' }
];

// --- Notion Formulas Database ---
export const FORMULAS: NotionFormula[] = [
  {
    id: 'F-01',
    name: 'Thanh Tiến độ Dự án (Progress Bar 2.0)',
    description: 'Tự động tính toán tỷ lệ % nhiệm vụ hoàn thành thuộc Dự án và vẽ thành một thanh tiến độ trực quan với sắc độ chuyển màu tuyệt đẹp.',
    formula: `let(
  pct, round(100 * filter(prop("Danh sách công việc"), current.prop("Trạng thái") == "Đã hoàn thành").length() / max(1, prop("Danh sách công việc").length())),
  bar, slice("▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░", 10 - round(pct / 10), 10 - round(pct / 10) + 10),
  if(empty(prop("Danh sách công việc")), "⚠️ Chưa có đầu việc", bar + " " + pct + "%")
)`,
    explanation: 'Sử dụng biến cục bộ (let) để tăng hiệu năng. Đếm số công việc có trạng thái "Đã hoàn thành" chia cho tổng số công việc trong quan hệ, sau đó dùng slice để cắt chuỗi thanh ký tự tương ứng với số phần trăm.',
    useCase: 'Áp dụng tại DB_DuAn để theo dõi tiến độ sự kiện, chiến dịch tuyển sinh.'
  },
  {
    id: 'F-02',
    name: 'Đếm ngược Hạn chót & Cảnh báo (Days Remaining Indicator)',
    description: 'Hiển thị số ngày còn lại đến hạn chót của công việc. Nếu quá hạn, hiển thị biểu tượng cảnh báo màu đỏ; nếu đến hạn hôm nay, hiển thị lời nhắc; còn lại hiển thị số ngày kèm nhãn an toàn.',
    formula: `let(
  diff, dateBetween(prop("Hạn chót"), today(), "days"),
  if(empty(prop("Hạn chót")), "⚪ Không có hạn chót",
    if(prop("Trạng thái") == "Đã hoàn thành", "✅ Đã hoàn thành",
      if(diff < 0, "🔴 Quá hạn " + abs(diff) + " ngày",
        if(diff == 0, "🔥 Phải hoàn thành Hôm nay!", "⏳ Còn lại " + diff + " ngày")
      )
    )
  )
)`,
    explanation: 'Tính toán chênh lệch ngày giữa thuộc tính "Hạn chót" và ngày hiện tại (today()). Lồng các điều kiện if để kiểm tra trạng thái "Đã hoàn thành" trước, sau đó đưa ra các mức độ ưu tiên trực quan (Quá hạn đỏ, Hôm nay cam, Còn ngày xám).',
    useCase: 'Áp dụng tại DB_CongViec giúp giáo viên và nhân viên kiểm soát deadline công việc cá nhân.'
  },
  {
    id: 'F-03',
    name: 'Độ khẩn cấp tự động (SLA Task Priority Level)',
    description: 'Tự động tính toán mức độ khẩn cấp thực tế dựa trên sự kết hợp giữa độ ưu tiên được giao (Priority) và số ngày còn lại (Days Remaining) để tránh tình trạng giáo viên bị ngợp.',
    formula: `let(
  days, dateBetween(prop("Hạn chót"), today(), "days"),
  if(prop("Trạng thái") == "Đã hoàn thành", "🟢 Hoàn tất",
    if(days < 0, "🚨 QUÁ HẠN KHẨN CẤP",
      if(days <= 2 or prop("Độ ưu tiên") == "Khẩn cấp", "🔴 Cao độ (SLA 48h)",
        if(days <= 5 or prop("Độ ưu tiên") == "Cao", "🟡 Trung bình", "🔵 Bình thường")
      )
    )
  )
)`,
    explanation: 'Kết hợp hai thuộc tính để đưa ra một chỉ số vận hành trung thực. Những việc hạn ngắn dưới 2 ngày hoặc được gán nhãn Khẩn cấp sẽ tự động chuyển thành nhãn "🚨 QUÁ HẠN KHẨN CẤP" hoặc "🔴 Cao độ".',
    useCase: 'Áp dụng tại DB_CongViec cho nhân sự hành chính Tổ Văn phòng để xử lý đơn từ, hóa đơn hoặc mượn phòng học.'
  },
  {
    id: 'F-04',
    name: 'Trạng thái Phê duyệt Học liệu',
    description: 'Công thức dùng cho kho giáo án và học liệu, tự động tạo nhãn chất lượng nhằm nhắc nhở giáo viên chỉnh sửa hoặc báo hiệu cho Tổ trưởng chuyên môn phê duyệt.',
    formula: `if(empty(prop("File đính kèm / Link")), "❌ Thiếu học liệu đính kèm",
  if(prop("Trạng thái phê duyệt") == "Chờ duyệt", "⚠️ Đang đợi Tổ trưởng duyệt",
    if(prop("Trạng thái phê duyệt") == "Đã phê duyệt", "✅ Đã sẵn sàng giảng dạy", "📝 Đang soạn thảo - Bản nháp")
  )
)`,
    explanation: 'Kiểm tra xem giáo viên đã đính kèm file giáo án/link Drive học liệu hay chưa. Nếu chưa đính kèm, lập tức báo lỗi đỏ, bất kể trạng thái phê duyệt là gì.',
    useCase: 'Áp dụng tại DB_TaiLieu nâng cao chất lượng biên soạn bài giảng khối chuyên môn Tiểu học & Trung học.'
  }
];

// --- Notion Full Markdown Templates ---
export const TEMPLATES: NotionTemplate[] = [
  {
    id: 'TPL-HOME',
    name: 'Trang chủ Hệ thống (Home Dashboard)',
    description: 'Template Markdown thiết kế layout trang Home Dashboard trung tâm.',
    icon: '🏠',
    category: 'Màn hình chính',
    markdown: `# 🏛️ TRƯỜNG THCS & THPT CLC EDU-NOTION
> **Hệ thống Quản trị Tri thức & Vận hành Nội bộ Tập trung**
> *Cập nhật ngày: 01/07/2026 | Phiên bản hệ thống: Enterprise 3.2*

---

## ⚡ ĐIỀU HƯỚNG NHANH (QUICK NAVIGATION)
| 👨💼 [Ban Giám hiệu](bgh) | 👩🏫 [Tổ Tiểu học](tieuhoc) | 🎓 [Tổ Trung học](trunghoc) |
| :--- | :--- | :--- |
| 🏢 [Tổ Văn phòng](vanphong) | 🌱 [Tổ PDP](pdp) | ❤️ [Phòng CTHS](cths) |
| 📣 [Phòng Tuyển sinh](tuyensinh) | 🤝 [Phòng DVHS](dvhs) | 📚 [Kho Học Liệu](hoclieu) |

---

## 💻 WORKSPACE CÁ NHÂN (MY PERSONAL SPACE)
### 🔥 Công việc của tôi (My Open Tasks)
*(Linked Database View: DB_CongViec | Filter: Người thực hiện chứa [User hiện tại] & Trạng thái ≠ Đã hoàn thành | Sort: Hạn chót tăng dần)*
- [ ] Nhiệm vụ A (Hạn chót: Hôm nay)
- [ ] Nhiệm vụ B (Hạn chót: Còn 2 ngày)

### 📆 Lịch làm việc hôm nay (Today's Meetings)
*(Linked Database View: DB_CuocHop | Filter: Thời gian bằng Hôm nay | View: Calendar hoặc List)*
- 08:30 - Họp rà soát công tác hè (Phòng họp Hội đồng)

---

## 📢 THÔNG BÁO CHUNG MỚI NHẤT
*(Linked Database View: DB_ThongBao | Filter: Trạng thái = Đã phát hành | Sort: Ngày đăng giảm dần | Limit: 3 bản ghi)*
> **📢 Thông báo tuyển sinh đợt 3 năm học 2026**
> *Ban hành bởi: Phòng Tuyển sinh | Ngày 28/06/2026*
> Chỉ tiêu còn lại 45 học sinh cho cả hai khối cấp. Yêu cầu bộ phận chuyên môn hoàn tất lịch phỏng vấn trước 10/07.

---

## 📊 CÁC DỰ ÁN ĐANG TRIỂN KHAI (ACTIVE PROJECTS)
*(Linked Database View: DB_DuAn | Filter: Trạng thái dự án = Đang triển khai | View: Gallery)*
- **Tuyển sinh khoá mới học kỳ mùa Thu 2026** [▓▓▓▓▓▓▓░░░ 68%]
- **Đổi mới học liệu & giáo án điện tử Tiểu học** [▓▓▓▓░░░░░░ 45%]

---

## 📑 LIÊN KẾT NHANH (QUICK LINKS)
- 📑 [Kho Biểu mẫu Hành chính chuẩn](bieumau)
- ⚙️ [Sổ tay Quy trình SOP](quytrinh)
- 👥 [Danh bạ Thành viên trường](thanhvien)
- 📞 Hotline Hỗ trợ Kỹ thuật IT: **024-EDU-NOTION (Ext 111)**
`
  },
  {
    id: 'TPL-DEPT',
    name: 'Mẫu Trang Phòng ban / Tổ chuyên môn',
    description: 'Template chuẩn hóa cấu trúc của từng phòng ban, đảm bảo tính đồng bộ thông tin 3-click.',
    icon: '🏢',
    category: 'Phòng ban',
    markdown: `# 🏢 [TÊN PHÒNG BAN]
> **Khẩu hiệu / Nhiệm vụ cốt lõi của bộ phận**
> *Phụ trách chính: [Tên Trưởng bộ phận] | Email liên hệ: [email]@school.edu.vn*

---

## 📌 BẢN ĐỒ KHÔNG GIAN LÀM VIỆC (WORKSPACE NAVIGATOR)
* **📢 Bảng Tin Nội Bộ**: Nơi đăng các thông báo chuyên trách của phòng ban.
* **👥 Nhân Sự Trực Thuộc**: Danh sách nhân sự trong tổ (Linked DB_ThanhVien).
* **🎯 Mục Tiêu OKRs**: Mục tiêu riêng của phòng ban trong quý/năm học.

---

## 📂 KHO TÀI LIỆU & QUY TRÌNH (SOP & DOCUMENTS)
*(Linked Database View: DB_TaiLieu | Filter: Bộ phận sở hữu = [Tên phòng ban hiện tại])*
1. 📄 [Quy trình đào tạo giáo viên mới] (Trạng thái: Đã ban hành)
2. 📑 [Phiếu đề xuất vật tư chuyên môn] (Trạng thái: Đã ban hành)

---

## ⚡ QUẢN LÝ CÔNG VIỆC & DỰ ÁN (TASKS & PROJECTS)
### 📝 Các Dự án Phụ trách (Our Projects)
*(Linked Database View: DB_DuAn | Filter: Bộ phận phụ trách = [Tên phòng ban])*
- **Dự án A** - Tiến độ: 80% [▓▓▓▓▓▓▓▓░░]

### 📋 Bảng công việc chi tiết (Kanban Board)
*(Linked Database View: DB_CongViec | Filter: Phòng ban = [Tên phòng ban] | Group by: Trạng thái)*
* **Cần thực hiện**: Đầu việc 1, Đầu việc 2
* **Đang làm**: Đầu việc 3
* **Đang duyệt**: Đầu việc 4
* **Đã xong**: Đầu việc 5

---

## 📆 BIÊN BẢN & LỊCH CUỘC HỌP (MEETINGS)
*(Linked Database View: DB_CuocHop | Filter: Thành phần tham dự chứa thành viên tổ | View: Table)*
* Họp giao ban tuần 25 - Kèm Biên bản chi tiết định hướng chuyên môn.

---
[🏠 Quay lại Trang chủ](home) | [📑 Kho Biểu mẫu](bieumau) | [⚙️ Quy trình](quytrinh)
`
  }
];

export const STEP_BY_STEP_GUIDE = [
  {
    step: 1,
    title: 'Xây dựng Cơ sở hạ tầng Database tập trung',
    desc: 'Bí quyết để Notion không bị lộn xộn là KHÔNG tạo database cục bộ ở các trang con. Hãy tạo một trang ẩn riêng mang tên "⚙️ Database Trung Tâm" và dựng 12 Databases được thiết kế ở mục cấu trúc tại đây.',
    action: 'Tạo một trang con mới ở Root, đặt tên là `[Hệ thống] Central Databases`. Bên trong trang này, tạo 12 cơ sở dữ liệu kiểu Table hoặc Full Page tương ứng với danh sách DB_ThanhVien, DB_TaiLieu, DB_CongViec v.v.'
  },
  {
    step: 2,
    title: 'Thiết lập các mối quan hệ (Relations)',
    desc: 'Kết nối thông tin liên thông toàn hệ thống. Khi một Dự án liên kết với Công việc, bạn có thể tự động Rollup hoặc cập nhật tiến độ.',
    action: 'Vào DB_DuAn, thêm thuộc tính mới kiểu `Relation`, chọn liên kết đến `DB_CongViec`. Chọn tùy chọn "Show on DB_CongViec" để tạo mối quan hệ 2 chiều. Thực hiện tương tự cho các mối quan hệ khác như Thành viên - Công việc, Phòng ban - Tài liệu.'
  },
  {
    step: 3,
    title: 'Áp dụng các Công thức vận hành nâng cao',
    desc: 'Công thức giúp tự động hóa việc hiển thị, tính toán phần trăm và thời gian mà không cần người dùng nhập tay.',
    action: 'Sao chép mã công thức "Thanh Tiến độ Dự án" hoặc "Đếm ngược Hạn chót" ở Tab Công thức của phần mềm này. Thêm thuộc tính kiểu `Formula` trong Notion, dán mã vào và kiểm tra hoạt động.'
  },
  {
    step: 4,
    title: 'Dựng Home Dashboard & Linked Views',
    desc: 'Trang chủ không lưu trữ dữ liệu gốc, nó chỉ dùng tính năng "Linked View of Database" để kéo dữ liệu từ 12 Database trung tâm lên hiển thị tùy biến cho từng người dùng.',
    action: 'Tạo trang Home Dashboard. Dùng lệnh `/link` để chọn "Linked view of database", trỏ về `DB_CongViec`. Thêm Filter: "Người thực hiện" chứa "Me" và "Trạng thái" không phải "Đã hoàn thành". Điều này giúp mỗi giáo viên khi đăng nhập chỉ nhìn thấy việc của riêng họ.'
  },
  {
    step: 5,
    title: 'Xây dựng mẫu trang (Templates) cho phòng ban',
    desc: 'Giúp việc nhân bản các không gian làm việc cho phòng ban mới chỉ mất 1 click mà vẫn giữ nguyên bố cục chuyên nghiệp Apple/Stripe.',
    action: 'Sao chép "Mẫu Trang Phòng ban" ở Tab Templates. Trong Notion, tạo một trang mới cho Tổ Tiểu học, dán nội dung vào hoặc tạo một Notion Page Template để tái sử dụng nhanh chóng cho Tổ Trung học, Văn phòng, PDP...'
  }
];

export const ARCHITECTURE_PRINCIPLES = [
  {
    title: 'Nguyên tắc 1: Hub & Spoke (Một nguồn sự thật)',
    desc: 'Mọi dữ liệu gốc (Tasks, Docs, Members) chỉ tồn tại duy nhất tại một Database Trung tâm. Các trang con hoặc Dashboard phòng ban chỉ được phép hiển thị dưới dạng Linked Database View kèm theo bộ lọc (Filter) chuyên biệt. Điều này tránh việc trùng lặp dữ liệu và giúp đồng bộ hóa dữ liệu tức thì.'
  },
  {
    title: 'Nguyên tắc 2: Tối giản màu sắc & Thống nhất Icon',
    desc: 'Chỉ chọn một bộ màu thương hiệu nhất định (ví dụ: Apple Slate gồm Đen, Xám, Trắng, và Xanh Blue là màu nhấn). Sử dụng thống nhất Icon dạng Vector hoặc bộ icon mặc định tối giản của Notion. Không sử dụng các hình ảnh GIF nhấp nháy hoặc các hình vẽ tay nhiều màu sắc gây xao nhãng.'
  },
  {
    title: 'Nguyên tắc 3: Kiến trúc thông tin 3-Click',
    desc: 'Mọi tài liệu chuyên môn hoặc kế hoạch hoạt động của bất cứ phòng ban nào đều phải được tìm thấy trong tối đa 3 lần nhấp chuột từ Trang chủ. Thiết lập thanh điều hướng bánh mì (Breadcrumbs) và thanh liên kết nhanh (Quick links) đồng bộ ở đầu và cuối mọi trang con.'
  },
  {
    title: 'Nguyên tắc 4: Phân quyền thừa kế (Hierarchy Permissions)',
    desc: 'Tận dụng cấu trúc phân cấp của Notion. Ban Giám hiệu có quyền cao nhất sẽ quản lý trang cha, các tổ bộ môn nằm ở trang con. Chỉ phân quyền truy cập Full Access cho Quản trị viên hệ thống; giáo viên được cấp quyền Edit nội dung; phụ huynh hoặc học sinh ngoài trường (nếu có) chỉ được cấp quyền Can View.'
  },
  {
    title: 'Nguyên tắc 5: Độc lập công tác quản trị và lưu trữ',
    desc: 'Các dữ liệu, dự án, cuộc họp cũ của các năm học trước không được xóa bỏ, hãy chuyển trạng thái sang "Kho lưu trữ" (Archived) và thiết lập Filter ẩn chúng khỏi Dashboard làm việc hàng ngày. Điều này giúp hệ thống luôn nhẹ nhàng, load nhanh và bảo tồn được lịch sử trường học.'
  }
];
