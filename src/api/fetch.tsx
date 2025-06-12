export async function fetchData(url:string, token:string) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

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