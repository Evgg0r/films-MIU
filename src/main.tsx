import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App'
import {BrowserRouter} from 'react-router-dom';
import {StrictMode} from "react";
import {AuthProvider} from "./Context/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
)
