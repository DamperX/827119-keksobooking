'use strict';

(function () {
  var fileTypes = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var inputAvatar = adForm.querySelector('#avatar');
  var avatarHeaderPrewview = adForm.querySelector('.ad-form-header__preview');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var inputImages = adForm.querySelector('#images');
  var formPhoto = adForm.querySelector('.ad-form__photo');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');
  var PhotoParameters = {
    width: '70',
    height: '70',
  };

  var PHOTO_PADDING = 'padding: 0;';

  var loadAvatar = function () {
    var file = inputAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
        avatarPreview.width = PhotoParameters.width;
        avatarPreview.height = PhotoParameters.height;
        avatarHeaderPrewview.style = PHOTO_PADDING;
      });

      reader.readAsDataURL(file);
    }
  };

  var loadPhoto = function () {
    var file = inputImages.files[0];
    var fileName = file.name.toLowerCase();

    var matches = fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photoWrapper = document.createElement('div');
        photoWrapper.classList.add('ad-form__photo');

        var photo = document.createElement('img');
        photo.src = reader.result;
        photo.width = PhotoParameters.width;
        photo.height = PhotoParameters.height;
        photoWrapper.appendChild(photo);
        photoContainer.insertBefore(photoWrapper, formPhoto);
      });

      reader.readAsDataURL(file);
    }
  };

  window.resetLoad = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
    var formPhotos = photoContainer.querySelectorAll('.ad-form__photo');
    for (var i = 0; i < formPhotos.length; i++) {
      photoContainer.removeChild(formPhotos[i]);
    }
  };


  inputAvatar.addEventListener('change', loadAvatar);
  inputImages.addEventListener('change', loadPhoto);
})();
