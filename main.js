import { initGet, initPost } from "./api.js";
import { renderComments } from "./render.js";
import { renderAuthorizationPage, renderAuthorizationButton } from "./renderLogin.js";
import { dat } from "./helpers.js";

let userName = document.getElementById("add-form-name");
const confirmButton = document.getElementById("add-form-button");
let userComment = document.getElementById("add-form-text");
// По стилю искать
const elementList = document.querySelector("#list");
const preloadText = document.getElementById('preload');
let comments = [];
// Что-то для авторизации
let users = [];
const authorizationButton = document.getElementById("authorization-button");
const authorizationText = document.getElementById("authorization-text");
const authorizationBlock = document.getElementById("registration");



const fetchAndRenderTasks = () => {
    initGet().then((responseData) => {
        comments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                commentDate: dat(comment.date),
                commentUser: comment.text,
                like: comment.likes,
                isLike: comment.isLiked
            }
        });
        renderComments(comments, null);
        preloadText.classList.add('hide');
    }).catch((error) => {
        if (error != null && error != "TypeError: Failed to fetch") {
            return alert(error);
        }
        return alert("У вас отсутствует интернет");
    });
};

fetchAndRenderTasks();
// Окно авторизация
authorizationButton.addEventListener("click", () => {
    renderAuthorizationPage();
    renderAuthorizationButton(comments);
    authorizationText.classList.add("hide");
});
// Кнопка "Войти" в авторизации
// authorizationButtonIn.addEventListener("click", () => {
//     authorizationLogin.classList.backgroundColor = "";
//     authorizationPassword.classList.backgroundColor = "";
//     if (authorizationLogin.value === '') {
//         authorizationLogin.classList.backgroundColor = "red";
//         return;
//     }
//     if (authorizationPassword.value === '') {
//         authorizationPassword.classList.backgroundColor = "red";
//         return;
//     }
//     initGetAuth(authorizationLogin.value, authorizationPassword.value).then((responseData) => {
//         users = responseData.users.map((users) => {
//             return {
//                 login: users.login
//             }
//         });
//         // renderComments(comments);
//     }).catch((error) => {
//         console.log(error);
//         return alert("Какие-то проблемы");
//     });
// });
// Добавление комментария
confirmButton.addEventListener("click", () => {
    userName.style.backgroundColor = "";
    userComment.style.backgroundColor = "";
    if (userName.value === '') {
        userName.style.backgroundColor = "red";
        return;
    }
    if (userComment.value === '') {
        userComment.style.backgroundColor = "red";
        return;
    }
    initPost().then((response) => {
        confirmButton.disabled = true;
        confirmButton.textContent = "Комментарий добавляется";
        preloadText.classList.remove('hide');
        elementList.classList.add('hide');
        if (response.status === 400) {
            preloadText.classList.add('hide');
            elementList.classList.remove('hide');
            throw new Error("Слишком короткое имя пользователя или комментария");
        }
        if (response.status === 500) {
            preloadText.classList.add('hide');
            elementList.classList.remove('hide');
            throw new Error("Попробуйте через какое-то время");
        }
        response.json().then((responseData) => {
            comments = responseData.todos;
        });
    }).then((response) => {
        return fetchAndRenderTasks();
    }).then(() => {
        confirmButton.disabled = false;
        confirmButton.textContent = "Написать";
        preloadText.classList.add('hide');
        elementList.classList.remove('hide');
        if (userName.value !== '' && userComment.value !== '') {
            userName.value = '';
            userComment.value = '';
            return;
        }
    }).catch((error) => {
        confirmButton.disabled = false;
        confirmButton.textContent = "Написать";
        if (error == "TypeError: Failed to fetch") {
            return alert("У вас отсутствует интернет");
        }
        return alert(error);
    });

});