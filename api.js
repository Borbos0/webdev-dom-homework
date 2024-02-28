let userName = document.getElementById("add-form-name");
let userComment = document.getElementById("add-form-text");
export let token;

export const setToken = (newToken) => {
    token = newToken;
};
export function initGet() {
    return fetch("https://wedev-api.sky.pro/api/v2/daniil-ermolin/comments",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            if (response.status === 400) {
                throw new Error("Слишком короткое имя пользователя или комментария");
            }
            if (response.status === 500) {
                throw new Error("Попробуйте через какое-то время");
            }
            return response.json();
        });
}
export function initPost() {
    return fetch("https://wedev-api.sky.pro/api/v2/daniil-ermolin/comments",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                text: userComment.value,
                name: userName.value,
                forceError: true,
            }),
        });
}
export function initPostAuth(login, password) {
    return fetch("https://wedev-api.sky.pro/api/user/login",
        {
            method: "POST",
            body: JSON.stringify({
                login,
                password
            }),
        }).then((response) => {
            return response.json();
        });
}