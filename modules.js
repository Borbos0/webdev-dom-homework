let userName = document.getElementById("add-form-name");
const confirmButton = document.getElementById("add-form-button");
let userComment = document.getElementById("add-form-text");
const elementList = document.getElementById("list");
const preloadText = document.getElementById('preload');
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
// Нажатие на кнопку лайк
function initLikeButtonsListeners(comments) {
    const likeButtonsElements = document.querySelectorAll(".like-button");

    for (const likeButtonsElement of likeButtonsElements) {
        likeButtonsElement.addEventListener("click", event => {
            event.stopPropagation();
            const index = likeButtonsElement.dataset.index;
            if (comments[index].isLike === false) {
                comments[index].like++;
                comments[index].isLike = true;
            }
            else {
                comments[index].like--;
                comments[index].isLike = false;
            }
            renderComments(comments);
        });
    }
};
const initEventListeners = () => {
    const commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
            console.log(commentElement);
        });
    }
};
// Ответ на комментарий
function reanswerComment(comments) {
    const answerComment = document.querySelectorAll('.comment');
    const formText = document.querySelector('.add-form-text');
    answerComment.forEach((comment, index) => {
        comment.addEventListener('click', () => {
            formText.value = `${comments[index].name} \n${comments[index].commentUser}`
        })
    })
}
export function renderComments(comments) {
    const commentHtml = comments?.map((comment, index) => {
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
                        <button class="${comment.isLike ? 'like-button -active-like' : 'like-button'}" data-index="${index}"></button>
                      </div>
                    </div>
                  </li>`
    }).join("");

    elementList.innerHTML = commentHtml;
    initLikeButtonsListeners(comments);
    initEventListeners();
    reanswerComment(comments);
}