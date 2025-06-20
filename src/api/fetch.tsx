export async function fetchData(url: string) {
    const token = localStorage.getItem("user_token");

    if (!token) {
        console.warn("Требуется авторизация");
        throw new Error("Нет токена");
    }

    const res = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
    }

    return await res.json();
}

export async function mutateData<T>(
    url: string,
    body: T,
    method: "POST" | "PATCH" | "PUT" | "DELETE" = "POST"
) {
    const token = localStorage.getItem("user_token");

    if (!token) {
        console.warn("Требуется авторизация");
        throw new Error("Нет токена");
    }

    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
    }

    return await res.json();
}