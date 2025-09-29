const baseTheme = {
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: '2.5rem',
    h2: '2rem',
    body: '1rem',
  },
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f4f6f8',
    white: '#ffffff',
    text: '#333333',
    error: '#e74c3c',
    gray: '#bdc3c7',
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#121212',
    white: '#1e1e1e',
    text: '#f4f6f8',
    error: '#e74c3c',
    gray: '#555',
  },
};