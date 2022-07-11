import { refs } from './refs/refs';
import { hideLoader, showLoader } from './loader/loader';
import { getTrendingMovies } from './api-service/get-trending-movies';
import { renderMovies } from './render/render-gallery';
import { setSessionStorage } from './storage/session-storage';
import storageConfig from './constants/storage-config';
import { createPagination, clearContainerPagination } from './pagination';

const trendingButtons = refs().trendingBtnsRef.trendingButtons;

export function trendingHandler() {
  trendingButtons.addEventListener('change', changeTrending);
}

async function changeTrending(e) {
  if (e.target.nodeName === 'INPUT') {
    showLoader();
    const data = await getTrendingMovies();

    renderMovies(data);
    setSessionStorage(storageConfig.TRENDING);
    createPagination(data.total_pages, 1);
    hideLoader();
  }
}
