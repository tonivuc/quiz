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

//Oppdater tiden det er igjen til quizen starter
function oppdaterTid() {
    //If (tidfelt regn ut hvor mange sekunder som er igjen) < 100
    for (i=0; i < lokaleQuizzer.length; i++) {

        //Formaterer fra sekunder igjen til start, til dager, timer, minutter og sekunder igjen til start.
        var tidTilQuiz = Math.round((lokaleQuizzer[i].startDate - Date.now()) / 1000);
        var startTid = tidTilQuiz;
        var days = Math.floor(tidTilQuiz / (3600*24));
        startTid = startTid  % (3600*24);
        hrs = Math.floor(startTid / 3600);
        startTid = startTid % 3600;
        mnts = Math.floor(startTid / 60);
        startTid = startTid % 60;
        secs = startTid;

        //Legger til alt som ikke er lik 0 i til i en String som vises i tabellen
        var tidTilQuizString = "";
        if (days != 0) tidTilQuizString += days + " dager, ";
        if (days != 0 || hrs != 0) tidTilQuizString += hrs + " timer, ";
        if (days != 0 || hrs != 0 || mnts != 0) tidTilQuizString += mnts + " minutter, ";
        tidTilQuizString += secs + " sekunder";


        //tidNaa brukes som en gjemt atributt for å sortere tabellen etter tid
        var selector = "#tidFelt";
        selector += lokaleQuizzer[i].id;
        var tidNaa = $("#sekTilStart"+lokaleQuizzer[i].id).text();
        if (tidNaa < -30000 || tidNaa === "Ugyldig tid") {
            $(selector).text("Ugyldig tid");
        }
        else if (tidNaa < 0 || tidNaa === "Startet") {
            $(selector).text("Startet");
        }
        else {
            tidNaa--;
            $(selector).text(tidTilQuizString);
            $("#sekTilStart"+lokaleQuizzer[i].id).text(tidNaa);
        }
    }
}


var valgtQuiz; //Variabel som sier hvilken quiz brukeren har trykt på

//Knapp for å navigere til quiz
$(document).on("click", ".quizButton", function(event){
    valgtQuiz = $(this).attr('id');
    $('#kallenavnModal').modal('show');
});


var valgtFerdigQuiz; //Variabel som sier hvilken av de ferdiglagde quizzene brukeren har trykt på

//Knapp for å gi brukeren mulighet til å velge starttidspunkt for den ferdiglagde quizen han/hun har trykt på
$(document).on("click", ".quizArkivButton", function(event) {

    //Setter opp dateTime-velgeren
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

//Logikk for hva som skal skje når bruker har valgt/ikke valgt startid for ferdiglagd quiz og trykt "ok"
$("#startTidOk").click(function () {

    //Hvis bruker ikke har valgt starttid kommer det opp en varsel om at bruker ikke har valgt starttid
    if ($("#dateTimePickerInput").val() == "") {
        $("#manglerStarttid").show();

    } else {

        var dateString = $("#dateTimePickerInput").val(),
            dateTimeParts = dateString.split(' - '),
            timeParts = dateTimeParts[1].split(':'),
            dateParts = dateTimeParts[0].split(' '),
            date;

        date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);

        //Dato og tid fra DateTime-velgeren sendes til Rest-serveren og gjøres om til en liveQuiz.
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
    var markupStart = "<tr id='rad"+quiz.id+"'><td><img style='margin-left:5px; float:left' class='scoreboardKnapp' id='"+scoreBoardId+"' border='0' alt='scorebaord' src='img/scoreboard-symbol.png' width='20' height='20'>"+quiz.tittel+"</td><td id='"+tidFeltId+"'></td><td class='sekunderTilStart' id='sekTilStart"+quiz.id+"'>"+sekundertil+"</td><td class='knappfelt'><button id='";
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

//Henter inn en array med live og ferdiglagde quizer fra serveren
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

            //Sorterer quizene, den som begynner om kortest tid kommer øverst osv.
            if (lokaleQuizzer.length != 0) {
                $("#myTable").tablesorter( {sortList: [[2,0]]});  // <-- 'myTable' is the id of your table
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