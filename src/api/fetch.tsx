import type {dataToggleFavorite} from "../types/types";

export async function fetchData(url:string, body?: dataToggleFavorite) {
    const token = localStorage.getItem("user_token")

    if (!token) {
        console.warn('Требуется авторизация');
        return;
    }

    const options:RequestInit = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    if (body) {
        options.method = 'POST';
        options.body = JSON.stringify(body)
    }

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        const data = await res.json();
        return data
    } catch (error) {
        console.error('Ошибка при загрузке:', error)
        return;
    }
}