export const updateRootTheme = (color) => {
    document.documentElement.style.setProperty("--color",`var(--color-${color})`);
}