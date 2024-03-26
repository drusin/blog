const themeStr = 'data-theme';

if (theme = localStorage.getItem(themeStr)) {
    document.documentElement.setAttribute(themeStr, theme);
}

function toggleTheme() {
    let theme;
    if (!localStorage.getItem(themeStr)) {
        theme = window.matchMedia('(prefers-color-scheme: dark)') ? 'light' : 'dark';
    }
    else {
        theme = localStorage.getItem(themeStr) === 'dark' ? 'light' : 'dark';
    }
    document.documentElement.setAttribute(themeStr, theme);
    localStorage.setItem(themeStr, theme);
}