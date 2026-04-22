import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";

export default function AppShell({ children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#F8F8FB] text-[#0C0E16] dark:bg-[#141625] dark:text-white lg:flex">
      <aside className="flex h-[72px] items-center justify-between bg-[#373B53] md:h-20 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[103px] lg:flex-col lg:rounded-r-[20px]">
        <div className="flex h-full w-[72px] items-center justify-center rounded-r-[20px] bg-[#7C5DFA] md:w-20 lg:h-[103px] lg:w-full">
          <img src={logo} alt="Logo" className="h-17 w-17 sm:h-20 sm:w-20 lg:h-[103px] lg:w-[103px]" />
        </div>

        <div className="flex items-center gap-6 px-6 lg:w-full lg:flex-col lg:gap-8 lg:border-t lg:border-white/10 lg:py-6">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="text-xl text-[#858BB2] transition hover:text-white"
          >
            {theme === "light" ? "☾" : "☀"}
          </button>
          <img src={avatar} alt="User" className="h-8 w-8 lg:h-[40px] lg:w-[40px] rounded-full" />
        </div>
      </aside>

      <main className="mx-auto w-full max-w-[950px] px-6 py-8 md:px-10 lg:ml-[120px] lg:px-12 lg:py-16">
        {children}
      </main>
    </div>
  );
}
