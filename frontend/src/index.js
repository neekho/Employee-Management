import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { store } from './app/store'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);