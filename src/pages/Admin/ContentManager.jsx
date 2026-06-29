import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useDarkMode } from "../../context/DarkModeContext";
import { Plus, Trash2, Save, Sparkles } from "lucide-react";

export default function ContentManager({ setIsLoggedIn }) {
  const { isDarkMode } = useDarkMode();
  const [items, setItems] = useState([
    { id: 1, title: "Voice Screening", description: "Public screening page for demo users", type: "page" },
    { id: 2, title: "Technology Overview", description: "Highlights AI and screening capabilities", type: "content" },
  ]);
  const [newItem, setNewItem] = useState({ title: "", description: "", type: "page" });

  const addItem = () => {
    if (!newItem.title.trim() || !newItem.description.trim()) return;
    setItems([{ id: Date.now(), ...newItem }, ...items]);
    setNewItem({ title: "", description: "", type: "page" });
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const bgGradient = isDarkMode
    ? "linear-gradient(135deg, #0f1729 0%, rgba(20, 45, 100, 0.8) 100%)"
    : "linear-gradient(135deg, #f0f4f8 0%, #e0eaf5 100%)";

  const textPrimary = isDarkMode ? "white" : "#0f1729";
  const textSecondary = isDarkMode ? "#93c5fd" : "#475569";
  const cardBg = isDarkMode ? "rgba(30, 58, 138, 0.5)" : "rgba(255, 255, 255, 0.8)";
  const cardBorder = isDarkMode ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(59, 130, 246, 0.2)";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: bgGradient }}>
      <AdminSidebar setIsLoggedIn={setIsLoggedIn} />
      <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: textPrimary, margin: 0 }}>Content Manager</h1>
              <p style={{ color: textSecondary, marginTop: "6px" }}>Add or delete public content from the admin panel.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#3b82f6", fontWeight: 700 }}>
              <Sparkles size={18} />
              Live updates
            </div>
          </div>

          <div style={{ background: cardBg, border: cardBorder, borderRadius: "16px", padding: "20px", marginBottom: "20px" }}>
            <h3 style={{ color: textPrimary, marginTop: 0 }}>Add New Content</h3>
            <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "1fr 1fr 120px auto" }}>
              <input value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} placeholder="Title" style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid rgba(59,130,246,0.2)", background: "rgba(255,255,255,0.6)" }} />
              <input value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} placeholder="Description" style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid rgba(59,130,246,0.2)", background: "rgba(255,255,255,0.6)" }} />
              <select value={newItem.type} onChange={(e) => setNewItem({ ...newItem, type: e.target.value })} style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid rgba(59,130,246,0.2)", background: "rgba(255,255,255,0.6)" }}>
                <option value="page">Page</option>
                <option value="content">Content</option>
              </select>
              <button onClick={addItem} style={{ padding: "10px 14px", border: "none", background: "linear-gradient(135deg, #3b82f6, #0ea5e9)", color: "white", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                <Plus size={16} /> Add
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gap: "14px" }}>
            {items.map((item) => (
              <div key={item.id} style={{ background: cardBg, border: cardBorder, borderRadius: "16px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div>
                  <h4 style={{ color: textPrimary, margin: 0 }}>{item.title}</h4>
                  <p style={{ color: textSecondary, margin: "6px 0 0" }}>{item.description}</p>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ padding: "6px 10px", borderRadius: "999px", background: "rgba(59,130,246,0.12)", color: "#3b82f6", fontSize: "12px", fontWeight: 700 }}>{item.type}</span>
                  <button onClick={() => deleteItem(item.id)} style={{ border: "none", background: "rgba(239,68,68,0.12)", color: "#ef4444", padding: "8px 10px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
