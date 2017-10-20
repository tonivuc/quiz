refresh();

//Variabler
var serverQuizzer; //Quiz[]
var lokaleQuizzer = []; //Quiz[]
var ferdigQuizzer;
var lokaleFerdigQuizzer = [];
var tid = window.setInterval(refresh,2000);
var tid2 = window.setInterval(oppdaterTid,1000);

//Generelle metoder

//Legger til og fjerner quizzer lokalt avhengig av hvordan det ser ut på serveren
function sjekkMotLokalt() {
    //Sammenlign alle quizIDer i serverquizzer med quizIDer i lokaleQuizzer
    //Legg inn nye quizzer
    var fant = false;
    //Gå gjennom alle quizzer i serverQuizzer
    for (i = 0; i < serverQuizzer.length; i++) {

        //Sammenlign element i i serverquizzer, med alle element i lokalequizzer
        for (j = 0; j < lokaleQuizzer.length; j++) {

            fant = false;
            //Hvis element j har en match i lokaleQuizzer
            if (serverQuizzer[i].id == lokaleQuizzer[j].id) {
                //MÅ FINNE MINST EN!
                //Når den har funnet en, ikke let etter samme igjen!
                //Når den har funnet en instans av serverQuiz[0] i lokalequiz
                //Ikke sjekk serverQuiz[0] igjen
                fant = true;
                break;
            }
        }
        //Hvis det ikke har en match i lokale quizzer
        if (fant != true) {

            //Legg inn ny quiz i lokaleQuizzer array og i HTML
            leggInnQuiz(serverQuizzer[i]);
        }
    }

    var fantFerdigQuiz = false;
    for (i = 0; i < ferdigQuizzer.length; i++) {
        for (j = 0;  j < lokaleFerdigQuizzer.length; j++) {
            fantFerdigQuiz = false;
            if (ferdigQuizzer[i].id == lokaleFerdigQuizzer[j].id) {
                fant = true;
                break;
            }
        }
        if (!fant) {
            leggInnFerdigQuiz(ferdigQuizzer[i]);
        }
    }
}

//Endre layout/html

//Oppdater tiden det er igjen til quizzen starter
function oppdaterTid() {

    //If (tidfelt regn ut hvor mange sekunder som er igjen) < 100
    console.log("oppdaterer tid");
    for (i=0; i < lokaleQuizzer.length; i++) {

        var selector = "#tidFelt";
        selector += lokaleQuizzer[i].id;
        var tidNaa = $(selector).text();
        if (tidNaa < -30000 || tidNaa === "Ugyldig tid") {
            $(selector).text("Ugyldig tid");
        }
        else if (tidNaa < 0 || tidNaa === "Startet") {
            $(selector).text("Startet");
        }
        else {
            tidNaa--;
            $(selector).text(tidNaa);
        }
    }
}

//Knapp for å navigere til quiz
var valgtQuiz;
$(document).on("click", ".quizButton", function(event){
    valgtQuiz = $(this).attr('id');
    $('#kallenavnModal').modal('show');
});

var valgtFerdigQuiz;
$(document).on("click", ".quizArkivButton", function(event) {

    $('.form_datetime').datetimepicker({
        language:  'nb',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 0
    });

   valgtFerdigQuiz = $(this).attr('id');
   $('#startTidModal').modal('show');

});

$("#startTidOk").click(function () {
    if ($("#dateTimePickerInput").val() == "") {
        $("#manglerStarttid").show();

    } else {

        var dateString = $("#dateTimePickerInput").val(),
            dateTimeParts = dateString.split(' - '),
            timeParts = dateTimeParts[1].split(':'),
            dateParts = dateTimeParts[0].split(' '),
            date;

        date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);

        $.ajax({
            url: 'rest/QuizService/ferdigquiz/' + valgtFerdigQuiz,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                startTid: date.getTime(),
            }),
            success: function (result) {
            }
        });

        $("#startTidModal").modal('toggle');

    }
});

$("#kallenavnOK").click(function () {
    localStorage.setItem("quizId", valgtQuiz);
    localStorage.setItem("kallenavn", $("#kallenavnInput").val());
});

$(document).keypress(function (event) {
    var code = event.keyCode;
    if(code == 13 && $("#kallenavnInput").is(":focus")) {
        localStorage.setItem("quizId", valgtQuiz);
        localStorage.setItem("kallenavn", $("#kallenavnInput").val());
        document.location.href = "venteside.html";
    }
});

//Knapp for å åpne scoreboardet til en quiz
$(document).on("click", ".scoreboardKnapp", function(event){
    //Må ta substring her
    valgtQuizString = $(this).attr('id');
    valgtQuiz = valgtQuizString.slice(-1);
    localStorage.setItem("quizId", valgtQuiz);
    localStorage.setItem("kallenavn", "");
    document.location.href = "scoreboard.html";
});

//Legg inn ferdig quiz i quizArkiv
function leggInnFerdigQuiz(quiz) {

    lokaleFerdigQuizzer.push(quiz);
    var markupStart = "<tr id='rad"+quiz.id+"'><td>"+quiz.tittel+"</td><td class='knappfelt'><button id='";
    var markupMiddle = quiz.id;
    var markupLast = "' type='submit' class='btn btn-block quizArkivButton'>Start</button></form></td></tr>";
    var con1 = markupStart.concat(markupMiddle);
    var con2 = con1.concat(markupLast);
    $("#quizArkivTable tbody").append(con2);
}

//Legg inn en quiz i tabellen
function leggInnQuiz(quiz) {
    lokaleQuizzer.push(quiz);

    var startTid = new Date(quiz.startDate);
    var tidnaa = new Date();
    var sekundertil = startTid.getTime() - tidnaa.getTime();
    sekundertil = Math.round(sekundertil/1000);

    //Brukes til å finne <td> som skal oppdateres
    var tidFeltId = "tidFelt";
    tidFeltId += quiz.id;
    var scoreBoardId = "scoreBoard";
    scoreBoardId += quiz.id;

    //Alt herfra er bare for å få med hvilken quiz man har klikket på
    var markupStart = "<tr id='rad"+quiz.id+"'><td><img style='margin-left:5px; float:left' class='scoreboardKnapp' id='"+scoreBoardId+"' border='0' alt='scorebaord' src='img/scoreboard-symbol.png' width='20' height='20'>"+quiz.tittel+"</td><td id='"+tidFeltId+"'>" + sekundertil + "</td><td class='knappfelt'><button id='";
    var markupMiddle = quiz.id;
    var markupLast = "' type='submit' class='btn btn-block quizButton'>Bli med!</button></form></td></tr>";
    var con1 = markupStart.concat(markupMiddle);
    var con2 = con1.concat(markupLast);
    $("#myTable tbody").append(con2);
}


//Fjern quiz fra tabellen
function fjernQuiz(quizID) {
    console.log("Inne i fjernQuiz");
    var rad = "#rad"+quizID;
    console.log("Rad: "+rad);
    $(rad).remove();
}

//AJAX, koding mot serveren

//Henter inn en array med quizzer fra serveren
function refresh() {
    $.ajax({
        url: 'rest/QuizService/quiz',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            serverQuizzer = result; //Dette er en array med quizzer
            if (typeof lokaleQuizzer == 'undefined') {
                console.log("Undefined found. Setting to serverquizzer!")
                //lokaleQuizzer = serverQuizzer;
            }
        }
    });

    $.ajax({
        url: 'rest/QuizService/ferdigquiz',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            ferdigQuizzer = result; //Dette er en array med quizzer
            if (typeof lokaleQuizzer == 'undefined') {
                console.log("Undefined found. Setting to serverquizzer!")
                //lokaleQuizzer = serverQuizzer;
            }

            sjekkMotLokalt();
            if (lokaleQuizzer.length != 0) {
                $("#myTable").tablesorter( {sortList: [[1,0]]});  // <-- 'myTable' is the id of your table
            }

        }


    });


}




// Find and remove selected table rows
/* WTF IS DIS
$(".delete-row").click(function(){
    $("table tbody").find('input[name="record"]').each(function(){
        if($(this).is(":checked")){
            $(this).parents("tr").remove();
        }
    });
});
*/