import React from "react";
import { Switch } from "@nextui-org/react";
import { BookOpen, Sun, Moon } from "lucide-react";

interface NavbarProps {
  theme?: string;
  onSetTheme: (theme: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onSetTheme }) => (
  <nav className="w-full z-50 bg-white dark:bg-black border-b-4 border-black dark:border-white">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-yellow-400 border-2 border-black rotate-3 hover:rotate-0 transition-transform">
          <BookOpen
            className="w-6 h-6 text-black"
            data-testid="book-open-icon"
          />
        </div>
        <span className="text-2xl font-black">COVER CREATOR</span>
      </div>
      <Switch
        color="warning"
        defaultSelected={theme === "dark"}
        endContent={<Moon className="w-5 h-5" />}
        size="lg"
        startContent={<Sun className="w-5 h-5" />}
        onChange={() => onSetTheme(theme === "dark" ? "light" : "dark")}
      />
    </div>
  </nav>
);

export default Navbar;
