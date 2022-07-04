import { refs } from '../refs/refs';
import api from '../api-service/get-deatils';

const { modalRefs } = refs();

// Получить ссылки на эл.
// принимает data одного фильма и подставляет в соответсвующие елементы значения.

function renderModalDetails() {
  console.log(555555);
  api.getDetails(496450).then(data => {
    console.log(data);
  });
  //   console.log(movieInfo);
  // const imgSrc =
}
