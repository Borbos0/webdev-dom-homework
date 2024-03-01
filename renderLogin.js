import { initEventListeners, renderComments } from "./render.js";
import { initPostAuth, setToken, token } from "./api.js";
const elementList = document.getElementById("list");

// Кнопка "Войти" в авторизации
export function renderAuthorizationButton(comments) {
	const authorizationButtonIn = document.getElementById(
		"authorization-button-in"
	);
	const authorizationLogin = document.getElementById("add-login");
	const authorizationPassword = document.getElementById("add-password");
	authorizationButtonIn.addEventListener("click", () => {
		authorizationLogin.classList.backgroundColor = "";
		authorizationPassword.classList.backgroundColor = "";
		if (authorizationLogin.value === "") {
			authorizationLogin.classList.backgroundColor = "red";
			return;
		}
		if (authorizationPassword.value === "") {
			authorizationPassword.classList.backgroundColor = "red";
			return;
		}
		initPostAuth(authorizationLogin.value, authorizationPassword.value)
			.then((responseData) => {
				setToken(responseData.user.token);
				return renderComments(comments, responseData.user.name);
			})
			.catch((error) => {
				console.log(error);
				return alert("Неправильное имя пользователя или пароль");
			});
	});
}
export function renderAuthorizationPage() {
	const commentHtml = `<div class="comment">
          <div class="registration">
            <h2>Форма входа</h2>
            <input type="text" id="add-login" placeholder="Введите логин">
            <input type="password" id="add-password" placeholder="Введите пароль">
            <button id="authorization-button-in">Войти</button>
          </div>
        </div>`;
	elementList.innerHTML = commentHtml;
	initEventListeners();
}
