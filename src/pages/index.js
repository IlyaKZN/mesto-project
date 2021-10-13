import { elFormClasses } from "../components/constans.js";
import { enableValidation } from "../components/validate.js";
import { getArrayCards } from "../components/card.js";
import { getUserInformation } from "../utils/api.js";
import { getUserId } from "../components/card.js";
import { profileName,profileSubline, avatarProfile } from "../components/modal.js";
import './index.css';

//Функция отрисовки профиля пользователя
const fillingUserProfile = () => {
  getUserInformation()
    .then(res => {
      if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      getUserId(res._id);
      profileName.textContent = res.name;
      profileSubline.textContent = res.about;
      avatarProfile.style.backgroundImage = `url('${res.avatar}')`;
    })
    .catch((err) => {
      console.log(err);
    });
}

//Вызов функции запуска валидации
enableValidation(elFormClasses);

//Вызов функции отрисовки карточек с сервера
getArrayCards();

//Вызов функции отрисовки профиля пользователя
fillingUserProfile();
