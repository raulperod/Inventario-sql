$(function(){
    //para poner fechas por default/falta checar bien
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    document.getElementById("Ffinal").value = today;
    document.getElementById("FfinalB").value = today;
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    today = year + "-" + month + "-" + day;
    document.getElementById("Finicial").value = today;
    document.getElementById("FinicialB").value = today;
});
