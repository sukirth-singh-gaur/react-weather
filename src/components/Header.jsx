import { CloudDrizzle, LucideMoon, LucideSunDim } from "lucide-react";

const Header = ({ toggleTheme, className }) => {
  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between w-full max-lg:mb-2 bg-theme p-2 md:px-6 border-b border-theme opacity-90 ${className}`}
    >
      <div className="flex flex-1">
        <CloudDrizzle />
      </div>
      <div className="flex flex-1 justify-end">
        <button
          onClick={toggleTheme}
          className="size-8 flex items-center justify-center rounded-full cursor-pointer"
        >
          <LucideMoon
            className="flex dark:hidden"
            onClick={() => {
              localStorage.setItem("theme", "dark");
            }}
          />
          <LucideSunDim
            className="hidden dark:flex"
            onClick={() => {
              localStorage.setItem("theme", "light");
            }}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
