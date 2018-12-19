'use strict';

(function () {
  var fileTypes = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var inputAvatar = adForm.querySelector('#avatar');
  var avatarHeaderPrewview = adForm.querySelector('.ad-form-header__preview');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');

  var AvatarParameters = {
    width: '70',
    height: '70',
  };

  var AVATAR_PADDING = 'padding: 0;';

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
        avatarPreview.width = AvatarParameters.width;
        avatarPreview.height = AvatarParameters.height;
        avatarHeaderPrewview.style = AVATAR_PADDING;
      });

      reader.readAsDataURL(file);
    }
  };

  window.resetLoad = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
  };


  inputAvatar.addEventListener('change', loadAvatar);
})();
