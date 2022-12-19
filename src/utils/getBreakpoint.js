export const getBreakpoint = () => window.getComputedStyle(document.body, ':before').content.replace(/"/g, '')
