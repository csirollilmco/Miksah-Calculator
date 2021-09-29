import './style.css';
import logo from './assets/logo.png';

const app = document.querySelector('#app');

app.innerHTML = `
  <img src="${logo}" />
  <h1>Tauri App Template!</h1>
`;
