$(document).ready(function(){

let fotoPreview = "";

$("#foto").change(function(){

    $("#errFoto").text("");

    let file = this.files[0];

    if(!file){
        return;
    }

    let ext = file.name.split('.').pop().toLowerCase();

    if(ext != "jpg" && ext != "jpeg" && ext != "png"){
        $("#errFoto").text("Format harus JPG, JPEG atau PNG");
        $("#preview").attr("src","");
        $(this).val("");
        return;
    }

    if(file.size > 2097152){
        $("#errFoto").text("Ukuran maksimal 2 MB");
        $("#preview").attr("src","");
        $(this).val("");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e){

        fotoPreview = e.target.result;

        $("#preview").attr("src",fotoPreview);

    }

    reader.readAsDataURL(file);

});

$("#formPendaftaran").submit(function(e){

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
    let foto = $("#foto").val();

    if(nim == ""){
        $("#errNim").text("NIM wajib diisi");
        valid = false;
    }
    else if(!/^[0-9]+$/.test(nim)){
        $("#errNim").text("NIM harus angka");
        valid = false;
    }
    else if(nim.length < 8){
        $("#errNim").text("Minimal 8 digit");
        valid = false;
    }

    if(nama == ""){
        $("#errNama").text("Nama wajib diisi");
        valid = false;
    }
    else if(nama.length < 5){
        $("#errNama").text("Minimal 5 karakter");
        valid = false;
    }

    let emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        $("#errEmail").text("Email tidak valid");
        valid = false;
    }

    if(!/^[0-9]+$/.test(hp)){
        $("#errHp").text("Nomor HP harus angka");
        valid = false;
    }
    else if(hp.length < 10){
        $("#errHp").text("Minimal 10 digit");
        valid = false;
    }

    if(!jk){
        $("#errJk").text("Pilih jenis kelamin");
        valid = false;
    }

    if(prodi == ""){
        $("#errProdi").text("Pilih program studi");
        valid = false;
    }

    if(alamat.length < 10){
        $("#errAlamat").text("Alamat minimal 10 karakter");
        valid = false;
    }

    if(foto == ""){
        $("#errFoto").text("Pas foto wajib diupload");
        valid = false;
    }

    if(valid){

        $("#cardNim").text(nim);
        $("#cardNama").text(nama);
        $("#cardEmail").text(email);
        $("#cardHp").text(hp);
        $("#cardJk").text(jk);
        $("#cardProdi").text(prodi);
        $("#cardAlamat").text(alamat);

        $("#cardFoto").attr("src",fotoPreview);

        $("#formContainer").fadeOut(function(){

            $("#cardContainer").fadeIn();

        });

    }

});

$("#editBtn").click(function(){

    $("#cardContainer").fadeOut(function(){

        $("#formContainer").fadeIn();

    });

});

$("#resetBtn").click(function(){

    $(".error").text("");

    $("#preview").attr("src","");

});

});