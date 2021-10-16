import { elFormClasses } from "../components/constans.js";
import { enableValidation } from "../components/validate.js";
import { addInitialCards } from "../components/card.js";
import { getUserInformation, getInitialCards } from "../utils/api.js";
import { getUserId } from "../components/card.js";
import { profileName,profileSubline, avatarProfile } from "../components/modal.js";
import './index.css';

//Функция отрисовки профиля пользователя
const fillingUserProfile = (res) => {
    getUserId(res._id);
    profileName.textContent = res.name;
    profileSubline.textContent = res.about;
    avatarProfile.style.backgroundImage = `url('${res.avatar}')`;
}

//Вызов функции запуска валидации
enableValidation(elFormClasses);

Promise.all([
  getUserInformation(),
  getInitialCards()
])

.then((values)=>{ //попадаем сюда когда оба промиса будут выполнены
  fillingUserProfile(values[0]);
  addInitialCards(values[1]);
})

.catch((err)=>{ //попадаем сюда если один из промисов завершаться ошибкой
  console.log(err);
})
