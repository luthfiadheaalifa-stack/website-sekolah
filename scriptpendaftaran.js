document.addEventListener("DOMContentLoaded", function () {

    const tombolDaftar = document.querySelectorAll(
        'a[href="pendaftaran.html"]'
    );

    tombolDaftar.forEach(function (tombol) {

        tombol.addEventListener("click", function (event) {

            const konfirmasi = confirm(
                "Apakah Anda ingin melanjutkan ke formulir pendaftaran MIMORI?"
            );

            if (!konfirmasi) {
                event.preventDefault();
            }

        });

    });

});


const form = document.getElementById('registrationForm');

const guardianFields =
    document.getElementById('guardianFields');

const guardianInputs =
    guardianFields.querySelectorAll('input, textarea');

// MENAMPILKAN DATA WALI
document.querySelectorAll(
    'input[name="hasGuardian"]'
).forEach((radio) => {

    radio.addEventListener('change', (event) => {

        const showGuardian =
            event.target.value === 'Ya';

        guardianFields.hidden = !showGuardian;

        guardianInputs.forEach((input) => {

            input.required =
                showGuardian && input.id !== 'guardianJob';

            if (!showGuardian) {
                input.value = '';
            }

        });

    });

});

// MEMBATASI UKURAN FILE MAKSIMAL 5 MB
document.querySelectorAll(
    'input[type="file"]'
).forEach((input) => {

    input.addEventListener('change', () => {

        const maxSize = 5 * 1024 * 1024;

        const tooLarge = [...input.files].find(
            (file) => file.size > maxSize
        );

        if (tooLarge) {

            alert(
                `File "${tooLarge.name}" melebihi batas 5 MB.`
            );

            input.value = '';

        }

    });

});

// RESET FORMULIR
form.addEventListener('reset', () => {

    setTimeout(() => {

        guardianFields.hidden = true;

        guardianInputs.forEach((input) => {
            input.required = false;
        });

        document.getElementById(
            'formMessage'
        ).textContent = '';

        document.getElementById(
            'formMessage'
        ).className = 'form-message';

    }, 0);

});

// VALIDASI DAN SIMULASI PENGIRIMAN
form.addEventListener('submit', (event) => {

    event.preventDefault();

    const message =
        document.getElementById('formMessage');

    if (!form.reportValidity()) {
        return;
    }

    message.textContent =
        'Formulir berhasil diperiksa. Hubungkan dengan server sekolah agar data dan dokumen dapat tersimpan.';

    message.className =
        'form-message success';

    message.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

});
