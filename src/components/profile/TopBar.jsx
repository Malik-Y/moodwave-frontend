import { LogOut } from "lucide-react";

export default function TopBar({ onBack, onLogout }) {
  return (
    <div className="flex justify-between items-center mb-10">
      <button
        onClick={onBack}
        className="px-5 py-2 text-sm glass rounded-full hover:bg-white/10 transition"
      >
        ←
      </button>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 text-sm glass rounded-full hover:bg-red-500/30 hover:text-red-200 transition"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}
