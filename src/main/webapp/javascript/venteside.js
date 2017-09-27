///VIKTIG///
//Hvis dette er true, er countdown alltid 6 sekunder
var testerProgram = true;
var testSekunderTilStart = 6;

///VIKTIG///

//Variabler
var quizId ;
var kallenavn;
var tid2 = window.setInterval(ventTilStartTid,1000);

var quiz = {
    tittel:"",
    id:0,
    sporsmaalArray:[],
    sporsmaalNaa:0,
    startTidspunkt:""
};

//Hent stuff fra localstorage
function getQuizId() {
    quizId = localStorage.getItem("quizId");
    console.log("QuizID= "+quizId);
}

function getKallenavn() {
    kallenavn = localStorage.getItem("kallenavn");
    console.log("Kallenavn: "+kallenavn)
    $("#kallenavnOutput").text("Hei "+kallenavn+", velkommen til ventesiden");
}

//Kjør javascript
hentQuiz(quizId);
finnTidTilStart();

function ventTilStartTid() {
    if (sekunderTilStart > 0) {
        sekunderTilStart--;
    }
    //Har en if her så dette bare kjøres én gang
    else if (sekunderTilStart === 0) {
        document.location.href = "quiz.html";
    }
}

function finnTidTilStart() {
    if (tester === true) {
        sekunderTilStart = testSekunderTilStart;
        console.log(sekunderTilStart);
    }
    else {
        var startTid = new Date(quiz.startDato+"T"+quiz.startTid+":00+02:00");
        var tidnaa = new Date().getTime();
        sekunderTilStart = tidnaa - startTid.getTime();
    }

}

function tellNed() {
    if (startet === true) {
        tidIgjen = tidIgjen-1;
        $("#tid").text(tidIgjen);

        //Logikk for å gå til neste quiz, ish?
        if (tidIgjen === 0) {
            nesteSporsmaal();
        }
    }
    else {
        //Ingen ting
    }

}

//Interaksjon med REST-server
//Hent quiz-objekt fra server
function hentQuiz(id) {
    $.ajax({
        url: 'rest/QuizService/quiz/'+id+'',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            quiz = result;
            console.log("Hentet ut "+quiz.tittel);
            setupLayout();
            leggInnSpiller();
        }
    })
}