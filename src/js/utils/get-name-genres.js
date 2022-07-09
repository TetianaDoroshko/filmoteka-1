// 1 Сделать пустой обьект genresHash и записать
// в него жанры в таком виде { id: name }, с бекенда используя getGenres().
// информация должна попадать в обьект при открытии страницы и храниться на протяжении всего сеанса.(не делать каждый раз запрос)
//
// 2 експортировать функцию getNameGenres которая принимает массив IDs,
//  берет название жанра из обьекта genresHash и возвращает
//  строку жанров в виде Action, Comedy.
// Если жанров больше чем 2, то добавляет в конец Other.
// нужно сделать доп проверки, если массив пустой(нету жанров у фильма) возвращается строка N/A.
// Может не быть жанра с тем ID что пришел с бека, нужно тоже сделать проверку, что бы не записать undefined в строку.

//=====!!!!! 2 обработка происходит в render-gallery.js фуекцией renderSingleMovie

//!!!!!!!!! ОБЕ функции надо вызывать при старте

import { getGenres } from '../api-service/get-genres';
//========getting list of movies=====
const genresList = {};


//   getGenres().then(data => makingGenresList(data));


 function makingGenresList(list) {
  
  list.genres.forEach(el => {
    genresList[el.id] = el.name;
  });
}

export function getNameGenres(movie) {
  const genresName = [];
  if (movie.genre_ids) {
    movie.genre_ids.forEach(el => {
      if (genresList[el]) {
        genresName.push(genresList[el]); // genresList -объект, созданный при старте кода. находится в get-name-genres
      }
    });
  } else {
    genresName.push('N/A');
  }

  if (genresName.length === 0) {
    genresName.push('N/A');
  }
  if (genresName.length > 3) {
    genresName.splice(3);
    genresName[2] = 'Other';
  }
  //   console.log(genresName);

  const listOfGenres = genresName.map(el => `${el}`).join(', ');

  return listOfGenres;
}

// console.log('eto', genresList);

//================ функция запроса жанров

// async function getGenres() {
//   let data;
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
//     );

//     const responseData = await response.json();
//     // console.log(responseData);
//     // data = responseData.genres.map(genre => genre.name).join(',');
//     data = responseData.genres;
//   } catch (error) {
//     console.log(error);
//   }

//   return data;
// }
