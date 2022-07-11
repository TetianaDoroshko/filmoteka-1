import { refs } from './refs/refs';
import { hideLoader, showLoader } from './loader/loader';
import { getTrendingMovies } from './api-service/get-trending-movies';
import { renderMovies } from './render/render-gallery';
import { setSessionStorage } from './storage/session-storage';
import storageConfig from './constants/storage-config';
import { createPagination, clearContainerPagination } from './pagination';

const trendingButtons = refs().trendingBtnsRef.trendingButtons;

trendingButtons.addEventListener('change', changeTrending);

async function changeTrending(e) {
  if (e.target.nodeName === 'INPUT') {
    showLoader();
    const data = await getTrendingMovies();
    let query;

    if (e.target.checked) {
      query = e.target.value;
    }

    renderMovies(data);
    setSessionStorage(storageConfig.TRENDING, query);
    createPagination(data.total_pages, 1);
    hideLoader();
  }
}
