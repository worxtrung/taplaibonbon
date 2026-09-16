import { useState, useRef, useEffect } from "react";

// ─── Icons ───────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);
const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? "text-amber-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
const MenuIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 33, height: 29, marginTop: -1, marginRight: 2, marginBottom: -4, marginLeft: 5 }}>
    <path strokeLinecap="square" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Học xe máy (A1-A2)", href: "#services" },
  { label: "Học ô tô (B/C1)", href: "#services" },
  { label: "Bổ túc tay lái", href: "#services" },
  { label: "Nâng hạng", href: "#services" },
  { label: "Feedback", href: "#reviews" },
];

const roadmapSteps = [
  {
    num: "01",
    icon: "📋",
    title: "Đăng ký đơn giản",
    desc: "Chỉ cần mang CMND/Hộ chiếu. Nhân viên tư vấn và hỗ trợ từ A đến Z.",
  },
  {
    num: "02",
    icon: "📖",
    title: "Học lý thuyết",
    desc: "600 câu hỏi thi; tự học hoặc có sự hỗ trợ của giáo viên.",
  },
  {
    num: "03",
    icon: "🚗",
    title: "Học lái đường trường",
    desc: "Đội ngũ giáo viên lành nghề, uy tín, nhiều kinh nghiệm đồng hành.",
  },
  {
    num: "04",
    icon: "🎯",
    title: "Tập sa hình",
    desc: "11 bài thi sa hình, được hướng dẫn kỹ càng từ đầu đến cuối.",
  },
  {
    num: "05",
    icon: "🏆",
    title: "Chinh phục kỳ thi",
    desc: "Hỗ trợ học viên từ khi đăng ký cho đến khi có bằng lái xe.",
  },
];

const features = [
  {
    icon: "👨‍🏫",
    title: "Đội ngũ giáo viên uy tín",
    desc: "Lành nghề, nhiều năm kinh nghiệm, tận tâm quan tâm từng học viên.",
  },
  {
    icon: "🔄",
    title: "Dễ dàng đổi giáo viên",
    desc: "Không hợp sau buổi đầu? Hỗ trợ đổi giáo viên ngay, không rắc rối.",
  },
  {
    icon: "💰",
    title: "Không phát sinh thêm phí",
    desc: "Học phí trọn gói, minh bạch, không thu thêm bất kỳ khoản nào.",
  },
  {
    icon: "📅",
    title: "Lộ trình bài bản",
    desc: "Theo sát lịch học, hỗ trợ toàn diện từ ngày đầu đến khi có bằng.",
  },
];

const reviews = [
  {
    name: "Nguyễn Thị Mai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Giáo viên rất tận tâm và kiên nhẫn. Mình vốn rất sợ lái xe nhưng sau khóa học ở đây mình đã tự tin cầm lái. Cảm ơn BONBON rất nhiều!",
    license: "Bằng B2",
  },
  {
    name: "Trần Văn Hùng",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Lịch học linh hoạt, phù hợp với người đi làm như mình. Học phí rõ ràng, không phát sinh thêm. Đậu thi ngay lần đầu!",
    license: "Bằng A2",
  },
  {
    name: "Lê Thị Hương",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Nhân viên tư vấn nhiệt tình từ lúc đăng ký. Giáo viên dạy rất chi tiết, kiên nhẫn. Mình học được nhiều kỹ năng lái xe thực tế.",
    license: "Bằng B1",
  },
  {
    name: "Phạm Đức Anh",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Môi trường học rất chuyên nghiệp. Cơ sở vật chất tốt, xe mới. Điều mình thích nhất là không có phí ẩn, đúng như cam kết.",
    license: "Bằng C1",
  },
  {
    name: "Võ Thị Lan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format",
    rating: 5,
    text: "Trung tâm hỗ trợ mình từng bước từ nộp hồ sơ, học lý thuyết đến thi thực hành. Cảm giác được đồng hành thật sự rất an tâm.",
    license: "Bằng B2",
  },
];

const faqs = [
  {
    q: "Học phí có tăng từ 12/2026 không?",
    a: "Học phí xe ô tô có thể điều chỉnh tăng từ tháng 12/2026 theo quy định mới. Đăng ký trước thời điểm này sẽ được áp dụng mức học phí hiện tại, giúp bạn tiết kiệm đáng kể. Hãy đăng ký sớm để hưởng ưu đãi!",
  },
  {
    q: "Học bằng ô tô mất bao lâu?",
    a: "Thời gian học phụ thuộc vào hạng bằng: Bằng B1 (số tự động) khoảng 3,5 tháng; Bằng B2 (số sàn) khoảng 4 tháng; Bằng C1 từ 5-6 tháng. Thời gian có thể linh hoạt hơn tùy khả năng học của từng học viên.",
  },
  {
    q: "Trong quá trình học có phát sinh thêm phí không?",
    a: "Hoàn toàn không! Học phí tại TẬPLÁIBONBON.COM là trọn gói bao gồm toàn bộ chi phí học lý thuyết, lái xe thực hành, sa hình, lệ phí thi và các hỗ trợ khác. Không có bất kỳ khoản phí ẩn nào.",
  },
  {
    q: "Tôi có thể tự chọn lịch học không?",
    a: "Có! Chúng tôi sắp xếp lịch học linh hoạt theo nhu cầu của bạn: sáng, chiều, tối hoặc cuối tuần. Bạn chỉ cần thông báo thời gian rảnh và chúng tôi sẽ bố trí giáo viên phù hợp.",
  },
  {
    q: "Điều kiện để đăng ký học bằng lái xe?",
    a: "Bằng A1/A2 (xe máy): từ 16/18 tuổi trở lên. Bằng B1/B2 (ô tô số tự động/số sàn): từ 18 tuổi trở lên. Bằng C1: từ 21 tuổi. Ngoài ra cần có CMND/CCCD/Hộ chiếu còn hiệu lực và đủ điều kiện sức khỏe theo quy định.",
  },
  {
    q: "Cần chuẩn bị hồ sơ gì khi đăng ký?",
    a: "Hồ sơ gồm: CMND/CCCD/Hộ chiếu (bản sao công chứng); 06 ảnh thẻ 3x4 (nền trắng); Giấy chứng nhận sức khỏe (trung tâm có thể hỗ trợ khám); Đơn đăng ký (trung tâm cung cấp). Nhân viên sẽ hướng dẫn chi tiết khi bạn đến đăng ký.",
  },
];

const services = [
  {
    icon: "🏍️",
    title: "Xe máy A1",
    sub: "Dưới 175cc",
    price: "Liên hệ",
    features: ["Lý thuyết 600 câu", "Thực hành sa hình", "Hỗ trợ thi lần 1"],
  },
  {
    icon: "🏍️",
    title: "Xe máy A2",
    sub: "Trên 175cc",
    price: "Liên hệ",
    features: ["Lý thuyết 600 câu", "Thực hành đường trường", "Hỗ trợ thi lần 1"],
  },
  {
    icon: "🚗",
    title: "Ô tô B – Số sàn",
    sub: "Bằng B2",
    price: "Liên hệ",
    features: ["~4 tháng học", "11 bài sa hình", "Không phát sinh phí"],
    highlight: true,
  },
  {
    icon: "🚗",
    title: "Ô tô B – Số tự động",
    sub: "Bằng B1",
    price: "Liên hệ",
    features: ["~3.5 tháng học", "11 bài sa hình", "Không phát sinh phí"],
  },
  {
    icon: "🚚",
    title: "Ô tô C1",
    sub: "Xe tải nhẹ",
    price: "Liên hệ",
    features: ["5-6 tháng học", "Đường trường + sa hình", "Hỗ trợ toàn trình"],
  },
  {
    icon: "🔄",
    title: "Bổ túc & Nâng hạng",
    sub: "Refresher / Upgrade",
    price: "Liên hệ",
    features: ["Linh hoạt lịch học", "Giáo viên kinh nghiệm", "Tư vấn 1-1"],
  },
];

// ─── Components ──────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= count} />
      ))}
    </div>
  );
}

function CTAButton({ label = "ĐĂNG KÝ NGAY", href = "#register", className = "" }: { label?: string; href?: string; className?: string }) {
  return (
    <a href={href} className={`btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm uppercase tracking-widest shadow-lg ${className}`}>
      {label}
    </a>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between" style={{ height: 73 }}>
          {/* Logo */}
          <a href="#" className="flex-shrink-0 flex flex-col items-center" style={{ justifyContent: "center", height: 60, width: 160, gap: "3px 2px" }}>
            <img
            src={bonbonIcon}
            alt="TẬPLÁIBONBON logo"
            className="object-contain"
            style={{ width: 70, height: 35, marginTop: 3, marginRight: 46, marginBottom: 3, marginLeft: 3 }}
            />
            <span className="font-black" style={{ fontSize: 15, letterSpacing: "0.5px", lineHeight: "17px" }}>
              <span style={{ color: "#273B78" }}>TẬPLÁI</span>
              <span style={{ color: "#57A2CD" }}>BONBON.COM</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="nav-link text-sm">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:0792598386" className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#273B78" }}>
              <PhoneIcon />
              079 259 8386
            </a>
            <CTAButton className="py-2.5 px-6 text-xs" />
          </div>

          {/* Mobile menu button */}
          <button
            className="xl:hidden p-2 rounded-lg"
            style={{ color: "#273B78" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="xl:hidden border-t border-gray-100 py-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block px-2 py-2.5 text-sm font-medium text-gray-700 hover:text-[#57A2CD]"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 mt-2">
              <a href="tel:0792598386" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#273B78" }}>
                <PhoneIcon />
                079 259 8386
              </a>
              <CTAButton className="text-center justify-center py-3 text-xs" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const rotatingWords = ["BON BON ĐI PHỐ", "BON BON VỀ QUÊ", "BON BON ĐI BIỂN", "BON BON LÊN NÚI", "BON BON VI VU"];

function RotatingText() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % rotatingWords.length);
        setFading(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block transition-all duration-400"
      style={{
        color: "#57A2CD",
        opacity: fading ? 0 : 1,
        transform: fading ? "translateY(-8px)" : "translateY(0)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        minWidth: "5ch",
      }}
    >
      {rotatingWords[current]}
    </span>
  );
}

function Hero() {
  return (
    <section className="hero-gradient pt-28 pb-0 lg:pt-24 lg:pb-0 overflow-hidden relative min-h-screen flex items-center">
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10" style={{ background: "#57A2CD" }} />
      <div className="absolute bottom-40 left-10 w-48 h-48 rounded-full opacity-5" style={{ background: "#57A2CD" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="text-white">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="text-amber-400">★</span>
              <span>Hơn 10,000+ học viên đã tin tưởng lựa chọn - Còn bạn thì sao ?</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-2 uppercase tracking-tight">
              BẰNG LÁI CÓ THỂ<br />ĐƯA BẠN ĐẾN ĐÂU?
            </h1>
            <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight mb-6" style={{ minHeight: "1.2em" }}>
              <RotatingText />
            </div>

            <div className="space-y-3.5 mb-8">
              {[
                "Giáo viên nhiều năm kinh nghiệm, đào tạo bài bản, luôn quan tâm tới học viên.",
                "Lên lịch và theo dõi học viên từ lúc đăng ký đến sau khi có bằng.",
                "Học phí trọn gói, minh bạch — không phát sinh thêm bất kỳ khoản nào.",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: "#57A2CD" }}>
                    <CheckIcon />
                  </div>
                  <p className="text-white/85 text-base lg:text-lg leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <CTAButton className="py-4 px-10 text-base shadow-2xl" />
              <a href="tel:0792598386" className="btn-outline inline-flex items-center gap-2 px-8 py-4 uppercase tracking-widest text-white border-white/40 hover:bg-white hover:text-[#273B78]" style={{ fontSize: 15, color: "white" }}>
                <PhoneIcon />
                079 259 8386
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { num: "10,000+", label: "Học viên thành công" },
                { num: "95%", label: "Tỷ lệ đậu lần đầu" },
                { num: "7+", label: "Năm kinh nghiệm" },
              ].map((s) => (
                <div key={s.num}>
                  <div className="text-2xl lg:text-3xl font-black" style={{ color: "#57A2CD" }}>{s.num}</div>
                  <div className="text-white/60 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
              <img
                src="https://images.unsplash.com/photo-1612709060421-596380268eaf?w=900&h=675&fit=crop&auto=format"
                alt="Học viên tự tin lái xe tại TẬPLÁIBONBON.COM"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(39,59,120,0.3) 100%)" }} />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: "#EAF3F9" }}>🏆</div>
              <div>
                <div className="font-bold text-sm" style={{ color: "#273B78" }}>Tỷ lệ đậu lần đầu</div>
                <div className="font-black text-xl" style={{ color: "#57A2CD" }}>95%</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-xl">
              <div className="flex items-center gap-2">
                <Stars count={5} />
              </div>
              <div className="text-xs font-semibold mt-1" style={{ color: "#273B78" }}>10,000+ đánh giá 5★</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// ─── Video Carousel ───────────────────────────────────────────────────────────
function VideoCarousel() {
  const videos = [
    { thumb: "https://images.unsplash.com/photo-1630406144797-821be1f35d75?w=400&h=600&fit=crop&auto=format", label: "Thực hành sa hình" },
    { thumb: "https://images.unsplash.com/photo-1764605514633-eb9a675ffbb8?w=400&h=600&fit=crop&auto=format", label: "Học xe máy A2" },
    { thumb: "https://images.unsplash.com/photo-1542018917221-b84272ff5462?w=400&h=600&fit=crop&auto=format", label: "Lái xe tự tin" },
    { thumb: "https://images.unsplash.com/photo-1553782097-130fef5d3e27?w=400&h=600&fit=crop&auto=format", label: "Thực hành đường trường" },
    { thumb: "https://images.unsplash.com/photo-1611508106567-6218ae6c5f6a?w=400&h=600&fit=crop&auto=format", label: "Học viên tự tin" },
  ];

  const [idx, setIdx] = useState(0);
  const max = videos.length - 3;

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#57A2CD" }}>Thực tế từ lớp học</p>
          <h2 className="text-2xl sm:text-3xl font-black" style={{ color: "#273B78" }}>Hình ảnh & Video từ học viên</h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500"
              style={{ transform: `translateX(calc(-${idx} * (220px + 16px)))` }}
            >
              {videos.map((v, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                  style={{ width: 220, height: 360 }}
                >
                  <img src={v.thumb} alt={v.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 ml-1" fill="#273B78" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="text-white font-semibold text-sm">{v.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {idx > 0 && (
            <button
              onClick={() => setIdx(Math.max(0, idx - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
              style={{ color: "#273B78" }}
            >
              <ChevronLeftIcon />
            </button>
          )}
          {idx < max && (
            <button
              onClick={() => setIdx(Math.min(max, idx + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
              style={{ color: "#273B78" }}
            >
              <ChevronRightIcon />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Roadmap ──────────────────────────────────────────────────────────────────
function Roadmap() {
  return (
    <section className="py-20" style={{ background: "#EAF3F9" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#57A2CD" }}>Từng bước rõ ràng</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide" style={{ color: "#273B78" }}>
            Lộ trình chinh phục<br className="sm:hidden" /> giấy phép lái xe
          </h2>
        </div>

        {/* Desktop stepper */}
        <div className="hidden lg:grid grid-cols-5 gap-0 relative">
          {/* connecting line */}
          <div className="absolute top-7 left-[10%] right-[10%] h-0.5" style={{ background: "linear-gradient(90deg, #57A2CD, #273B78)" }} />

          {roadmapSteps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center px-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-base mb-4 shadow-lg z-10"
                style={{ background: i === 4 ? "#273B78" : "#57A2CD" }}
              >
                {step.num}
              </div>
              <div className="text-2xl mb-2">{step.icon}</div>
              <h3 className="font-bold text-base mb-1.5" style={{ color: "#273B78" }}>{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden space-y-0">
          {roadmapSteps.map((step, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-md"
                  style={{ background: i === 4 ? "#273B78" : "#57A2CD" }}
                >
                  {step.num}
                </div>
                {i < roadmapSteps.length - 1 && (
                  <div className="w-0.5 flex-1 my-2" style={{ background: "#57A2CD", minHeight: 40 }} />
                )}
              </div>
              <div className="pb-8 pt-2">
                <div className="text-xl mb-1">{step.icon}</div>
                <h3 className="font-bold text-base mb-1" style={{ color: "#273B78" }}>{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyUs() {
  return (
    <section className="py-20 bg-white" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big stat */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#57A2CD" }}>Tại sao chọn chúng tôi</p>
          <div className="text-5xl sm:text-6xl lg:text-7xl font-black mb-3" style={{ color: "#273B78" }}>10,000+</div>
          <div className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            học viên đã chinh phục thành công giấy phép lái xe cùng<br /><strong>TẬP LÁI BON BON</strong>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="card-hover bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: "#273B78" }}>{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section className="py-20" style={{ background: "#EAF3F9" }} id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#57A2CD" }}>Khóa học đa dạng</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide" style={{ color: "#273B78" }}>
            Các khóa học tại BONBON
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className={`card-hover rounded-2xl p-7 ${s.highlight ? "shadow-xl scale-[1.02]" : "shadow-sm"} relative overflow-hidden`}
              style={{ background: s.highlight ? "#273B78" : "white" }}
            >
              {s.highlight && (
                <div className="absolute top-4 right-4 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Phổ biến nhất
                </div>
              )}
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className={`font-black text-xl mb-1 ${s.highlight ? "text-white" : ""}`} style={s.highlight ? {} : { color: "#273B78" }}>
                {s.title}
              </h3>
              <p className={`text-sm mb-5 ${s.highlight ? "text-white/60" : "text-gray-500"}`}>{s.sub}</p>
              <ul className="space-y-2 mb-7">
                {s.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${s.highlight ? "bg-white/20" : ""}`} style={s.highlight ? {} : { background: "#EAF3F9" }}>
                      <svg className="w-3 h-3" fill="none" stroke={s.highlight ? "white" : "#57A2CD"} viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={s.highlight ? "text-white/80" : "text-gray-600"}>{feat}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#register"
                className={`block text-center py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all ${
                  s.highlight
                    ? "bg-[#57A2CD] text-white hover:bg-white hover:text-[#273B78]"
                    : "border-2 border-[#57A2CD] text-[#57A2CD] hover:bg-[#57A2CD] hover:text-white"
                }`}
              >
                Đăng ký ngay
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
function Reviews() {
  const [idx, setIdx] = useState(0);
  const perPage = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3;

  return (
    <section className="py-20 bg-white" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#57A2CD" }}>Học viên chia sẻ</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide" style={{ color: "#273B78" }}>
            Tin tưởng bởi 10,000+<br />học viên thành công
          </h2>
          <p className="mt-3 text-gray-500">Cùng xem thử họ chia sẻ gì về chúng tôi nhé</p>
        </div>

        {/* Review grid (desktop) / carousel (mobile) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <ReviewCard r={reviews[idx]} />
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setIdx(Math.max(0, idx - 1))}
              disabled={idx === 0}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center disabled:opacity-30 transition"
              style={{ borderColor: "#57A2CD", color: "#57A2CD" }}
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={() => setIdx(Math.min(reviews.length - 1, idx + 1))}
              disabled={idx === reviews.length - 1}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center disabled:opacity-30 transition"
              style={{ borderColor: "#57A2CD", color: "#57A2CD" }}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ r }: { r: typeof reviews[0] }) {
  return (
    <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <Stars count={r.rating} />
      <p className="mt-4 text-gray-700 text-sm leading-relaxed italic">"{r.text}"</p>
      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100">
        <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
        <div>
          <div className="font-bold text-sm" style={{ color: "#273B78" }}>{r.name}</div>
          <div className="text-xs text-gray-500">{r.license}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Register Form ────────────────────────────────────────────────────────────
function RegisterForm() {
  const [form, setForm] = useState({ name: "", phone: "", license: "", area: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20" style={{ background: "#EAF3F9" }} id="register">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#57A2CD" }}>Bắt đầu hành trình</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide mb-5" style={{ color: "#273B78" }}>
              Đăng ký tư vấn<br />miễn phí ngay hôm nay
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Điền form bên cạnh, chúng tôi sẽ liên hệ trong vòng <strong>30 phút</strong> để tư vấn khóa học phù hợp nhất với bạn — hoàn toàn miễn phí, không ràng buộc.
            </p>
            <div className="space-y-4">
              {[
                { icon: "✅", text: "Tư vấn 1-1 miễn phí" },
                { icon: "✅", text: "Không phát sinh thêm phí khi học" },
                { icon: "✅", text: "Linh hoạt lịch học theo nhu cầu" },
                { icon: "✅", text: "Hỗ trợ từ đăng ký đến khi có bằng" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <img
                src="https://images.unsplash.com/photo-1630406144797-821be1f35d75?w=600&h=320&fit=crop&auto=format"
                alt="Giáo viên hướng dẫn học viên"
                className="rounded-2xl shadow-lg w-full object-cover"
                style={{ maxHeight: 240 }}
              />
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-black mb-2" style={{ color: "#273B78" }}>Đăng ký thành công!</h3>
                <p className="text-gray-600">Chúng tôi sẽ liên hệ với bạn trong vòng 30 phút. Cảm ơn bạn đã tin tưởng TẬPLÁIBONBON.COM!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-black mb-1" style={{ color: "#273B78" }}>Đăng ký ngay — Miễn phí tư vấn</h3>
                <p className="text-sm text-gray-500 mb-5">Điền thông tin, nhân viên sẽ liên hệ trong 30 phút!</p>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Họ và tên *</label>
                  <input
                    required
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition"
                    style={{ "--tw-ring-color": "#57A2CD" } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Số điện thoại *</label>
                  <input
                    required
                    type="tel"
                    placeholder="0912 345 678"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Loại bằng muốn học *</label>
                  <select
                    required
                    value={form.license}
                    onChange={(e) => setForm({ ...form, license: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition appearance-none bg-white"
                  >
                    <option value="">-- Chọn loại bằng --</option>
                    <option value="A1">Bằng A1 (Xe máy dưới 175cc)</option>
                    <option value="A2">Bằng A2 (Xe máy trên 175cc)</option>
                    <option value="B1">Bằng B1 (Ô tô số tự động)</option>
                    <option value="B2">Bằng B2 (Ô tô số sàn)</option>
                    <option value="C1">Bằng C1 (Xe tải nhẹ)</option>
                    <option value="botuc">Bổ túc tay lái</option>
                    <option value="nanghang">Nâng hạng bằng lái</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-sm uppercase tracking-widest shadow-xl">
                  ĐĂNG KÝ NGAY —079 259 8386
                </button>
                <p className="text-xs text-center text-gray-400">Chúng tôi cam kết bảo mật thông tin của bạn.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#57A2CD" }}>Giải đáp thắc mắc</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide" style={{ color: "#273B78" }}>
            Câu hỏi thường gặp
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base" style={{ color: "#273B78" }}>{faq.q}</span>
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-colors"
                  style={{ background: open === i ? "#273B78" : "#EAF3F9", color: open === i ? "white" : "#273B78" }}
                >
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Vẫn còn thắc mắc? Chúng tôi sẵn sàng giải đáp!</p>
          <CTAButton label="ĐĂNG KÝ TƯ VẤN MIỄN PHÍ" href="#register" />
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#273B78" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div>
            <div className="text-xl font-black mb-3">
              <span className="text-white">TẬPLÁI</span>
              <span style={{ color: "#57A2CD" }}>BONBON.COM</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Trung tâm đào tạo lái xe uy tín, chuyên nghiệp. Đồng hành cùng bạn chinh phục giấy phép lái xe từ A đến Z.
            </p>
            <div className="flex gap-3 mt-5">
              {["Facebook", "YouTube", "TikTok"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold hover:opacity-80 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: "#57A2CD" }}>Khóa học</h4>
            <ul className="space-y-2.5">
              {["Học xe máy A1-A2", "Học ô tô B số sàn", "Học ô tô B số tự động", "Bằng C1 xe tải nhẹ", "Bổ túc tay lái", "Nâng hạng bằng lái"].map((l) => (
                <li key={l}>
                  <a href="#services" className="text-white/60 text-sm hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: "#57A2CD" }}>Thông tin</h4>
            <ul className="space-y-2.5">
              {["Về chúng tôi", "Lộ trình học", "Feedback học viên", "Câu hỏi thường gặp", "Chính sách bảo mật"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: "#57A2CD" }}>Liên hệ</h4>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <span>📞</span>
                <a href="tel:0792598386" className="hover:text-white transition-colors font-semibold text-white" style={{ fontSize: 17 }}>
                  079 259 8386
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span>✉️</span>
                <span>hotro@tapláibonbon.com</span>
              </div>
              <div className="flex items-start gap-2">
                <span>📍</span>
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </div>
              <div className="flex items-start gap-2">
                <span>🕐</span>
                <span>Thứ 2 – Chủ nhật: 7:00 – 21:00</span>
              </div>
            </div>
            <a href="#register" className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest py-2.5 px-5 rounded-full transition" style={{ background: "#57A2CD", color: "white" }}>
              Đăng ký ngay
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <span>© 2026 TẬPLÁIBONBON.COM — Bản quyền được bảo lưu.</span>
          <span>Thiết kế bởi BONBON Team</span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Be Vietnam Pro', sans-serif", color: "#1F2937" }}>
      <Header />
      <main>
        <Hero />
        <VideoCarousel />
        <Roadmap />
        <WhyUs />
        <Services />
        <Reviews />
        <RegisterForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
