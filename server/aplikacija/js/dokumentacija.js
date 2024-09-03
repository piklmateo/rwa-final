document.addEventListener('DOMContentLoaded', function() {
    var era_img = document.getElementById('era_img');
    var era_img_full_size = document.getElementById('era_img_full_size');

    era_img.addEventListener('click', function() {
        era_img_full_size.style.display = 'flex';
    });

    function close() {
        era_img_full_size.style.display = 'none';
    }

    era_img_full_size.addEventListener('click', function(event) {
        if (event.target === era_img_full_size) {
            close();
        }
    });
});