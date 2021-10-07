import { elFormClasses } from "../components/constans.js";
import { enableValidation } from "../components/validate.js";
import { addInitialCards } from "../components/card.js";
import './index.css';

//Вызов функции запуска валидации
enableValidation(elFormClasses);

//Вызов функции добавления начальных карточек
addInitialCards();
