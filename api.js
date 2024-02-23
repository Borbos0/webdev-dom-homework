let userName = document.getElementById("add-form-name");
let userComment = document.getElementById("add-form-text");
export function dat(Dat) {
    let rusDat;
    if (Dat === undefined || Dat === NaN || Dat === null) {
        rusDat = new Date();
    }
    else {
        rusDat = new Date(Dat);
    }
    let month = rusDat.getMonth();
    let minute = rusDat.getMinutes();
    let day = rusDat.getDate();
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (month < 9) {
        month = "0" + (month + 1);
    }
    if (day < 9) {
        day = "0" + (day + 1);
    }
    const fullRusDat = day + "." +
        month + "." + "24" + " " +
        rusDat.getHours() + ":" + minute;
    return fullRusDat;
}
export function initGet() {
    return fetch("https://wedev-api.sky.pro/api/v1/daniil-ermolin/comments",
        {
            method: "GET",
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
    return fetch("https://wedev-api.sky.pro/api/v1/daniil-ermolin/comments",
        {
            method: "POST",
            body: JSON.stringify({
                text: userComment.value,
                name: userName.value,
                forceError: true,
            }),
        });
}