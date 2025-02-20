import { createRoot } from "react-dom/client";
import App from "./App";
import { addInterceptors } from './axiosApi';
import { persistor, store } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

addInterceptors(store);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
