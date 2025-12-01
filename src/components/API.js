export async function apiGet(url) {
    const token = localStorage.getItem("authToken");

    return fetch(url, {
        headers: {
            "Authorization": `Token ${token}`,
        }
    }).then(res => res.json());
}
