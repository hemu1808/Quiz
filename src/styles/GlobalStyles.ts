import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap');

  :root {
    --bg-color: #0f172a;
    --primary: #818cf8;
    --secondary: #c084fc;
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --glass-bg: rgba(255, 255, 255, 0.05);
    --border-color: rgba(255, 255, 255, 0.1);
    --success: #2dd4bf;
    --error: #fb7185;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Manrope', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    /*overflow: hidden*/;
  }

  body::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-image: linear-gradient(to right, var(--primary), var(--secondary));
    filter: blur(150px);
    top: 50px;
    left: -100px;
    opacity: 0.6;
    z-index: -1;
  }
  
  body::after {
    content: '';
    position: absolute;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background-image: linear-gradient(to right, #0ea5e9, var(--secondary));
    filter: blur(120px);
    bottom: 0px;
    right: -50px;
    opacity: 0.5;
    z-index: -1;
  }
`;