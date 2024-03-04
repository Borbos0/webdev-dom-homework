// Работа с DOM деревом
const elementList = document.getElementById("list");
// Нажатие на кнопку лайк
function initLikeButtonsListeners(comments) {
	const likeButtonsElements = document.querySelectorAll(".like-button");

	for (const likeButtonsElement of likeButtonsElements) {
		likeButtonsElement.addEventListener("click", (event) => {
			event.stopPropagation();
			const index = likeButtonsElement.dataset.index;
			if (comments[index].isLike === false) {
				comments[index].like++;
				comments[index].isLike = true;
			} else {
				comments[index].like--;
				comments[index].isLike = false;
			}
			renderComments(comments);
		});
	}
}
export const initEventListeners = () => {
	const commentElements = document.querySelectorAll(".comment");
	for (const commentElement of commentElements) {
		commentElement.addEventListener("click", () => {
			console.log(commentElement);
		});
	}
};
// Ответ на комментарий
function reanswerComment(comments) {
	const answerComment = document.querySelectorAll(".comment");
	const formText = document.querySelector(".add-form-text");
	answerComment.forEach((comment, index) => {
		comment.addEventListener("click", () => {
			formText.value = `${comments[index].name} \n${comments[index].commentUser}`;
		});
	});
}
export function renderComments(comments, authUser) {
	const addForm = document.querySelector(".add-form");
	const addFormName = document.querySelector(".add-form-name");
	const commentHtml = comments
		?.map((comment, index) => {
			return `<li class="comment">
    <div class="comment-header">
      <div class="comment-name">${comment.name}</div>
      <div>${comment.commentDate}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.commentUser}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter" data-count="0">${comment.like}</span>
        <button class="${
			comment.isLike ? "like-button -active-like" : "like-button"
		}" data-index="${index}"></button>
      </div>
    </div>
  </li>`;
		})
		.join("");

	elementList.innerHTML = commentHtml;
	initLikeButtonsListeners(comments);
	initEventListeners();
	reanswerComment(comments);
	if (authUser !== null && authUser !== undefined) {
		addFormName.value = authUser;
		addForm.classList.remove("hide");
	}
}
