import { elFormClasses } from "../components/constans.js";
import { enableValidation } from "../components/validate.js";
import { getArrayCards } from "../components/card";
import { fillingUserProfile } from "../utils/api.js";
import './index.css';

//Вызов функции запуска валидации
enableValidation(elFormClasses);

//Вызов функции загрузки профиля
fillingUserProfile();

//Вызов функции отрисовки карточек с сервера
getArrayCards();
