import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './main.css';

// Получаем корневой элемент
const rootElement = document.getElementById('root');

// Проверяем, что элемент существует
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Создаем корень и рендерим приложение
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);