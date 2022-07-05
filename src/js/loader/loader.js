//експортировать 2 функции showLoader() и hideLoader() которые вешают или убирают класс is-hidden
import '../../sass/utils/_visually-hidden.scss';
import { refs } from '../refs/refs';
// показать предзагрузчик
export function showLoader() {
  refs.loaderRef.loader.classList.remove('.is-hidden');
}
// спрятать предзагрузчик
export function hideLoader() {
  refs.loaderRef.loader.classList.add('.is-hidden');
}
