import { renderThumbnails } from './render-thumbnails.js';
import { initUploadPhotoForm } from './upload-photo-form.js';
import { initImageEditor } from './image-editor.js';
import { getData } from './api.js';
import { showDataLoadError } from './messages.js';
import { setPhotos } from './full-size-picture.js';
import { initFilters } from './filters.js';

// Инициализация формы загрузки и редактора изображений
initUploadPhotoForm();
initImageEditor();

// Загрузка данных с сервера
getData()
  .then((photos) => {
    setPhotos(photos);
    renderThumbnails(photos);
    initFilters(photos);
  })
  .catch((err) => {
    showDataLoadError(err.message);
  });

