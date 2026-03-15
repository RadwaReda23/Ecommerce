
import Login from './pages/Login';
import { useState } from "react";

const COLORS = {
  primary: "#1a3a2a",
  accent: "#c8a84b",
  light: "#f5f0e8",
  white: "#ffffff",
  muted: "#8a7d6b",
  danger: "#c0392b",
  success: "#27ae60",
  info: "#2980b9",
  border: "#ddd3c0",
  cardBg: "#fffdf8",
};

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Amiri:wght@400;700&display=swap');
`;

const mockProducts = [
  { id: 1, title: "كتاب حساب التفاضل والتكامل", price: 45, condition: "جيد جداً", seller: "أحمد محمد", sellerType: "طالب", category: "كتب", image: "📚", views: 34, time: "منذ ساعتين", status: "active" },
  { id: 2, title: "ميكروسكوب محمول", price: 320, condition: "ممتاز", seller: "د. سارة علي", sellerType: "دكتور", category: "معدات", image: "🔬", views: 87, time: "منذ يوم", status: "active" },
  { id: 3, title: "كول روب معمل", price: 30, condition: "مقبول", seller: "فاطمة حسن", sellerType: "خريجة", category: "ملابس", image: "🥼", views: 19, time: "منذ 3 أيام", status: "active" },
  { id: 4, title: "آلة حاسبة علمية Casio", price: 150, condition: "جيد", seller: "محمود إبراهيم", sellerType: "طالب", category: "أدوات", image: "🔢", views: 52, time: "منذ 5 أيام", status: "active" },
  { id: 5, title: "كتاب الكيمياء العضوية", price: 60, condition: "جيد جداً", seller: "نور أحمد", sellerType: "خريجة", category: "كتب", image: "📗", views: 41, time: "منذ أسبوع", status: "sold" },
  { id: 6, title: "حقيبة ظهر للكلية", price: 85, condition: "جيد", seller: "يوسف سامي", sellerType: "طالب", category: "أخرى", image: "🎒", views: 28, time: "منذ أسبوعين", status: "active" },
];

const mockLibrary = [
  { id: 1, title: "بالطو معمل مقاس L", available: true, borrower: null, image: "🥼", category: "ملابس" },
  { id: 2, title: "بالطو معمل مقاس M", available: false, borrower: "علي حسن", image: "🥼", category: "ملابس" },
  { id: 3, title: "نظارة واقية", available: true, borrower: null, image: "🥽", category: "معدات" },
  { id: 4, title: "قفازات معمل", available: true, borrower: null, image: "🧤", category: "معدات" },
  { id: 5, title: "بالطو معمل مقاس S", available: false, borrower: "منى إبراهيم", image: "🥼", category: "ملابس" },
];

const mockLostFound = [
  { id: 1, title: "محفظة جلد بنية", description: "وُجدت بالقرب من قاعة 101", finder: "طالب مجهول", location: "مبنى A", date: "اليوم", image: "👛", claimed: false },
  { id: 2, title: "كارنيه جامعي", description: "اسم الطالب: م.م.غير واضح", finder: "حارس الأمن", location: "عند البوابة", date: "أمس", image: "🪪", claimed: false },
  { id: 3, title: "مفاتيح خضراء", description: "مفتاحين على حلقة خضراء", finder: "دكتورة ريم", location: "معمل 3", date: "منذ يومين", image: "🔑", claimed: true },
];

const mockMessages = [
  { id: 1, from: "أحمد محمد", product: "كتاب حساب التفاضل", message: "هل الكتاب لا يزال متاحاً؟", time: "منذ 10 دقائق", unread: true },
  { id: 2, from: "فاطمة علي", product: "ميكروسكوب محمول", message: "هل يمكن التفاوض في السعر؟", time: "منذ ساعة", unread: true },
  { id: 3, from: "محمود سامي", product: "كول روب معمل", message: "متى يمكن الاستلام؟", time: "أمس", unread: false },
];

const stats = [
  { label: "منتج نشط", value: "142", icon: "🛒", color: COLORS.primary },
  { label: "صفقة مكتملة", value: "89", icon: "✅", color: COLORS.success },
  { label: "مستخدم مسجل", value: "1.2k", icon: "👥", color: COLORS.info },
  { label: "عنصر في المكتبة", value: "38", icon: "📚", color: COLORS.accent },
];

const navItems = [
  { id: "home", label: "الرئيسية", icon: "🏠" },
  { id: "products", label: "المنتجات", icon: "🛒" },
  { id: "library", label: "المكتبة", icon: "📚" },
  { id: "lostfound", label: "المفقودات", icon: "🔍" },
  { id: "messages", label: "الرسائل", icon: "💬" },
  { id: "profile", label: "حسابي", icon: "👤" },
];

export default function App() {
  const [screen, setScreen] = useState("login");
  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeLibraryTab, setActiveLibraryTab] = useState("borrow");

  const unreadCount = mockMessages.filter(m => m.unread).length;

  return (
    <>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Cairo', sans-serif; direction: rtl; background: ${COLORS.light}; color: ${COLORS.primary}; }
        .app { display: flex; min-height: 100vh; }
        .sidebar {
          width: ${sidebarOpen ? "240px" : "68px"};
          background: ${COLORS.primary}; transition: width 0.3s ease;
          display: flex; flex-direction: column; position: fixed; top: 0; right: 0; height: 100vh; z-index: 100;
        }
        .sidebar-logo { padding: 20px 16px; border-bottom: 1px solid rgba(200,168,75,0.3); display: flex; align-items: center; gap: 12px; }
        .logo-icon { width: 40px; height: 40px; background: ${COLORS.accent}; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .logo-text { color: white; overflow: hidden; white-space: nowrap; }
        .nav-items { flex: 1; padding: 16px 8px; display: flex; flex-direction: column; gap: 4px; }
        .nav-item { display: flex; align-items: center; gap: 12px; padding: 11px 12px; border-radius: 10px; cursor: pointer; color: rgba(255,255,255,0.7); transition: all 0.2s; }
        .nav-item.active { background: ${COLORS.accent}; color: ${COLORS.primary}; font-weight: 700; }
        .badge { background: ${COLORS.danger}; color: white; font-size: 10px; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: auto; }
        .main { margin-right: ${sidebarOpen ? "240px" : "68px"}; flex: 1; transition: margin-right 0.3s ease; display: flex; flex-direction: column; }
        .topbar { background: white; padding: 14px 28px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid ${COLORS.border}; position: sticky; top: 0; z-index: 50; }
        .content { padding: 28px; flex: 1; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
        .stat-card { background: white; border-radius: 16px; padding: 20px; border: 1px solid ${COLORS.border}; display: flex; align-items: center; gap: 16px; }
        .section-card { background: white; border-radius: 16px; border: 1px solid ${COLORS.border}; overflow: hidden; margin-bottom: 20px; }
        .section-header { padding: 16px 20px; border-bottom: 1px solid ${COLORS.border}; display: flex; align-items: center; justify-content: space-between; }
        .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .product-card { background: ${COLORS.cardBg}; border-radius: 14px; border: 1px solid ${COLORS.border}; overflow: hidden; cursor: pointer; }
        .product-image { height: 100px; background: #eee; display: flex; align-items: center; justify-content: center; font-size: 40px; position: relative; }
        .product-info { padding: 12px; }
        .product-price { font-size: 18px; font-weight: 900; color: ${COLORS.accent}; }
        .lost-item { display: flex; gap: 14px; padding: 14px; border-radius: 12px; border: 1px solid ${COLORS.border}; margin-bottom: 10px; background: white; }
        .message-item { display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 12px; border: 1px solid ${COLORS.border}; margin-bottom: 8px; background: white; }
        .message-item.unread { border-right: 4px solid ${COLORS.accent}; }
        .profile-header { background: ${COLORS.primary}; border-radius: 16px; padding: 28px; color: white; display: flex; align-items: center; gap: 20px; margin-bottom: 20px; }
        .profile-avatar { width: 70px; height: 70px; background: ${COLORS.accent}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; }
        .sidebar-toggle { padding: 10px; border-top: 1px solid rgba(255,255,255,0.1); }
        .toggle-btn { background: none; border: 1px solid white; color: white; cursor: pointer; padding: 5px; border-radius: 5px; width: 100%; }
      `}</style>

      {screen === "login" ? (
        <Login onLoginSuccess={() => setScreen("dashboard")} />
      ) : (
        <div className="app">
          {/* SIDEBAR */}
          <div className="sidebar">
            <div className="sidebar-logo">
              <div className="logo-icon">🔬</div>
              {sidebarOpen && <div className="logo-text"><h3>سوق العلوم</h3><span>جامعة القاهرة</span></div>}
            </div>
            <div className="nav-items">
              {navItems.map(item => (
                <div key={item.id} className={`nav-item ${activePage === item.id ? "active" : ""}`} onClick={() => setActivePage(item.id)}>
                  <span>{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                  {item.id === "messages" && unreadCount > 0 && <div className="badge">{unreadCount}</div>}
                </div>
              ))}
            </div>
            <div className="sidebar-toggle">
               <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? "◀" : "▶"}</button>
            </div>
          </div>

          {/* MAIN */}
          <div className="main">
            <div className="topbar">
              <div style={{fontWeight: 'bold'}}>{navItems.find(n => n.id === activePage)?.label}</div>
              <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                <button onClick={() => setScreen("login")} style={{background: COLORS.danger, color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer'}}>خروج</button>
                <div style={{width: '35px', height: '35px', borderRadius: '50%', background: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>م</div>
              </div>
            </div>

            <div className="content">
              {activePage === "home" && (
                <>
                  <div className="stats-grid">
                    {stats.map((s, i) => (
                      <div className="stat-card" key={i}>
                        <div style={{fontSize: '30px'}}>{s.icon}</div>
                        <div><h3>{s.value}</h3><p>{s.label}</p></div>
                      </div>
                    ))}
                  </div>
                  <div className="section-card">
                    <div className="section-header"><h3>🛒 منتجات حديثة</h3></div>
                    <div style={{padding: '20px'}} className="products-grid">
                      {mockProducts.slice(0, 3).map(p => (
                        <div key={p.id} className="product-card">
                          <div className="product-image">{p.image}</div>
                          <div className="product-info">
                            <h4>{p.title}</h4>
                            <div className="product-price">{p.price} ج.م</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activePage === "products" && (
                <div className="products-grid">
                  {mockProducts.map(p => (
                    <div key={p.id} className="product-card">
                      <div className="product-image">{p.image}</div>
                      <div className="product-info">
                        <h4>{p.title}</h4>
                        <p style={{fontSize: '12px', color: '#666'}}>البائع: {p.seller}</p>
                        <div className="product-price">{p.price} ج.م</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activePage === "messages" && (
                <div>
                  {mockMessages.map(msg => (
                    <div key={msg.id} className={`message-item ${msg.unread ? "unread" : ""}`}>
                      <div style={{width: '40px', height: '40px', background: COLORS.primary, color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{msg.from[0]}</div>
                      <div style={{flex: 1}}>
                        <strong>{msg.from}</strong>
                        <p style={{fontSize: '13px'}}>{msg.message}</p>
                      </div>
                      <span style={{fontSize: '11px'}}>{msg.time}</span>
                    </div>
                  ))}
                </div>
              )}

              {activePage === "profile" && (
                <>
                  <div className="profile-header">
                    <div className="profile-avatar">م</div>
                    <div>
                      <h2>محمد أحمد السيد</h2>
                      <p>طالب - الفرقة الثالثة</p>
                    </div>
                  </div>
                  <div className="section-card">
                    <div className="section-header"><h3>⚙️ إعدادات الحساب</h3></div>
                    <div style={{padding: '20px'}}>
                       <p><strong>البريد:</strong> m.ahmed@sci.cu.edu.eg</p>
                       <p><strong>القسم:</strong> الفيزياء</p>
                    </div>
                  </div>
                </>
              )}
              
              {/* Lost & Found Page */}
              {activePage === "lostfound" && (
                <div>
                   {mockLostFound.map(item => (
                     <div key={item.id} className="lost-item">
                       <span style={{fontSize: '30px'}}>{item.image}</span>
                       <div>
                         <h4>{item.title}</h4>
                         <p>{item.description}</p>
                         <small>📍 {item.location} | 📅 {item.date}</small>
                       </div>
                     </div>
                   ))}
                </div>
              )}

              {/* Library Page */}
              {activePage === "library" && (
                <div>
                   {mockLibrary.map(item => (
                     <div key={item.id} className="lost-item">
                       <span style={{fontSize: '30px'}}>{item.image}</span>
                       <div style={{flex: 1}}>
                         <h4>{item.title}</h4>
                         <p style={{color: item.available ? 'green' : 'red'}}>
                           {item.available ? "✅ متاح" : `❌ مستعار بواسطة ${item.borrower}`}
                         </p>
                       </div>
                       <button disabled={!item.available} style={{padding: '5px 10px', cursor: item.available ? 'pointer' : 'not-allowed'}}>طلب استعارة</button>
                     </div>
                   ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}