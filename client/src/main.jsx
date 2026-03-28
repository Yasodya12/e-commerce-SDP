import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

axios.interceptors.request.use((config) => {
    if (config.url?.startsWith("http://localhost:5000")) {
        config.url = config.url.replace("http://localhost:5000", apiBaseUrl);
    }

    return config;
});

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
            <Toaster />
        </Provider>
    </BrowserRouter>,
);
