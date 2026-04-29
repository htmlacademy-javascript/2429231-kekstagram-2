import { photos } from './create-array-photos.js';
import { renderThumbnails } from './render-thumbnails.js';
import { initUploadPhotoForm } from './upload-photo-form.js';
import { initImageEditor } from './image-editor.js';

renderThumbnails(photos);
initUploadPhotoForm();
initImageEditor();

