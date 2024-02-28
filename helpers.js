// что угодно
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