const BASE_URL = "https://moodwave-6b5s.onrender.com";

async function request(path, options = {}) {
    const token = localStorage.getItem("authToken");

    let res;
    try {
        res = await fetch(`${BASE_URL}${path}`, {
            ...options,
            headers: {
                ...(options.body ? { "Content-Type": "application/json" } : {}),
                Authorization: `Token ${token}`,
                ...options.headers,
            },
        });
    } catch (err) {
        // network failure, backend asleep/unreachable, etc.
        return { ok: false, status: 0, data: null, error: "Network error" };
    }

    let data = null;
    const text = await res.text();
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        // response wasn't JSON 
        return { ok: false, status: res.status, data: null, error: "Server returned an unexpected response" };
    }

    if (!res.ok) {
        return { ok: false, status: res.status, data, error: data?.error || `Request failed (${res.status})` };
    }

    return { ok: true, status: res.status, data, error: null };
}

export function apiGet(path) {
    return request(path, { method: "GET" });
}

export function apiPost(path, body) {
    return request(path, { method: "POST", body: JSON.stringify(body) });
}