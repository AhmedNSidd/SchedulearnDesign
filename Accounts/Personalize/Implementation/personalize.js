var img_url;

$(document).ready(function () {

  $(".id_profile_pic").change(function () {
    $(".bd-crop-picture-modal-lg").modal();
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#crop_picture').attr('src', e.target.result);
            img_url = e.target.result;
        }
        reader.readAsDataURL(this.files[0]);
    }
});
  var cropped = $("#crop_picture").croppie({
    viewport: {
        width: 200,
        height: 200,
        type: 'circle'
    }
  });

  $('.bd-crop-picture-modal-lg').on('shown.bs.modal', function (e) {
    cropped.croppie('bind', {
      url: img_url,
    });
  })

  $("#saveCrop").on("click", function(ev) {
    cropped.croppie('result', {
								type: 'base64',
								format: 'jpeg',
								size: {width: 200, height: 200}
							}).then(function (resp) {
                /*
                $.ajax({
                    type: 'POST',
                    url: '/dashboard/my_profile/edit_profile_pic/',
                    data: {'profile_pic': resp},
                    success: function () {
                        location.reload();
                    }

                });
                */
                console.dir($(".picture"));
                var base64 = "url(" + resp + ")"
                $(".picture").css('background-image', base64)
								$('.bd-crop-picture-modal-lg').modal('hide');
              })
  });

  $("#cancelCrop").on("click", function () {
    location.reload();
  });

  $(".camera-icon").on("click", function() {
    $(".id_profile_pic").click();
  });


});
