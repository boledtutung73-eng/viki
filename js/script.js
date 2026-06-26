$(document).ready(function () {

    let fotoPreview = "";

    $("#nim,#hp").on("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    });

    $("#foto").change(function () {

        $("#errFoto").text("");

        let file = this.files[0];

        if (!file) {
            $("#preview").attr("src", "");
            return;
        }

        let ext = file.name.split('.').pop().toLowerCase();

        if (ext != "jpg" && ext != "jpeg" && ext != "png") {
            $("#errFoto").text("Format harus JPG/JPEG/PNG");
            $("#preview").attr("src", "");
            this.value = "";
            return;
        }

        if (file.size > 2097152) {
            $("#errFoto").text("Ukuran maksimal 2 MB");
            $("#preview").attr("src", "");
            this.value = "";
            return;
        }

        let reader = new FileReader();

        reader.onload = function (e) {

            fotoPreview = e.target.result;

            $("#preview").attr("src", fotoPreview);

        }

        reader.readAsDataURL(file);

    });

    $("#formPendaftaran").submit(function (e) {

        e.preventDefault();

        $(".error").text("");

        let valid = true;

        let nim = $("#nim").val().trim();
        let nama = $("#nama").val().trim();
        let email = $("#email").val().trim();
        let hp = $("#hp").val().trim();
        let jk = $("input[name='jk']:checked").val();
        let prodi = $("#prodi").val();
        let alamat = $("#alamat").val().trim();

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // NIM
        if (nim === "") {
            $("#errNim").text("NIM wajib diisi");
            valid = false;
        } else if (!/^\d+$/.test(nim)) {
            $("#errNim").text("NIM harus angka");
            valid = false;
        } else if (nim.length !== 8) {
    $("#errNim").text("NIM harus tepat 8 digit");
    valid = false;
}

        // Nama
        if (nama.length < 5) {
            $("#errNama").text("Nama minimal 5 karakter");
            valid = false;
        }

        // Email
        if (!emailPattern.test(email)) {
            $("#errEmail").text("Format email tidak valid");
            valid = false;
        }

        // HP
        if (hp === "") {
            $("#errHp").text("Nomor HP wajib diisi");
            valid = false;
        } else if (hp.length < 10) {
            $("#errHp").text("Nomor HP minimal 10 digit");
            valid = false;
        }

        // JK
        if (!jk) {
            $("#errJk").text("Pilih jenis kelamin");
            valid = false;
        }

        // Prodi
        if (prodi == "") {
            $("#errProdi").text("Pilih program studi");
            valid = false;
        }

        // Alamat
        if (alamat.length < 10) {
            $("#errAlamat").text("Alamat minimal 10 karakter");
            valid = false;
        }

        // Foto
        if ($("#foto")[0].files.length === 0) {
            $("#errFoto").text("Pas foto wajib diupload");
            valid = false;
        }

        if (valid) {

            $("#cardNim").text(nim);
            $("#cardNama").text(nama);
            $("#cardEmail").text(email);
            $("#cardHp").text(hp);
            $("#cardJk").text(jk);
            $("#cardProdi").text(prodi);
            $("#cardAlamat").text(alamat);

            $("#cardFoto").attr("src", fotoPreview);

            $("#formContainer").fadeOut(function () {
                $("#cardContainer").fadeIn();
            });

        }

    });

    $("#editBtn").click(function () {

        $("#cardContainer").fadeOut(function () {
            $("#formContainer").fadeIn();
        });

    });

    $("#resetBtn").click(function () {

        $(".error").text("");

        $("#preview").attr("src", "");

        fotoPreview = "";

    });

});