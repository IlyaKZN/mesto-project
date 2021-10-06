import { elFormClasses } from "../src/components/constans.js";
import { enableValidation } from "../src/components/validate.js";
import { addInitialCards } from "../src/components/card.js";
import './index.css';

//Вызов функции запуска валидации
enableValidation(elFormClasses);

//Вызов функции добавления начальных карточек
addInitialCards();
