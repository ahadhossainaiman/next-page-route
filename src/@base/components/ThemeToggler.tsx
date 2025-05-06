import { ENUM_THEME_TYPES, themeTypes } from '@lib/enums/theme.enum';
import useTheme from '@lib/hooks/useTheme';
import { FaDesktop, FaMoon, FaSun } from 'react-icons/fa';

const themeIcons = {
  [ENUM_THEME_TYPES.SYSTEM]: <FaDesktop className="w-4 h-4" />,
  [ENUM_THEME_TYPES.LIGHT]: <FaSun className="w-4 h-4" />,
  [ENUM_THEME_TYPES.DARK]: <FaMoon className="w-4 h-4" />,
};

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div role="radiogroup" className="flex items-center gap-1 border border-gray-400 rounded-full p-1 w-fit">
      {themeTypes.map((themeType) => {
        const isActive = theme === themeType;
        const label = `Switch to ${themeType.toLowerCase()} theme`;

        return (
          <button
            key={themeType}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            data-theme-switcher="true"
            data-active={isActive}
            onClick={() => setTheme(themeType)}
            className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
              isActive
                ? 'bg-gray-700 text-white'
                : 'hover:bg-gray-200 text-gray-800 dark:hover:bg-gray-700 dark:text-white'
            }`}
          >
            {themeIcons[themeType]}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggler;
