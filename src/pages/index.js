import { elFormClasses } from "../components/constans.js";
import { enableValidation } from "../components/validate.js";
import { getArrayCards } from "../components/card.js";
import { getUserInformation, getInitialCards } from "../utils/api.js";
import { getUserId } from "../components/card.js";
import { profileName,profileSubline, avatarProfile } from "../components/modal.js";
import './index.css';

//Функция отрисовки профиля пользователя
const fillingUserProfile = () => {
  getUserInformation()
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

Promise.all([
  getUserInformation(),
  getInitialCards()
])

.then((values)=>{ //попадаем сюда когда оба промиса будут выполнены
  //Вызов функции отрисовки карточек с сервера
  getArrayCards();
})

.catch((err)=>{ //попадаем сюда если один из промисов завершаться ошибкой
  console.log(err);
})

fillingUserProfile();
