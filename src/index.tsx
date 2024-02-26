import ReactDOM from 'react-dom/client';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
// api documentation
// https://documenter.getpostman.com/view/5709532/2s93JqTRWN
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);
