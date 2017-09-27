///VIKTIG///
//Hvis dette er true, er countdown alltid 6 sekunder
var testerProgram = false;
var testSekunderTilStart = 12;

///VIKTIG///

//Variabler
var quizId ;
var kallenavn;
var tid2 = window.setInterval(ventTilStartTid,1000);
var sekunderTilStart;

var quiz = {
    tittel:"",
    id:0,
    sporsmaalArray:[],
    sporsmaalNaa:0,
    startDato:"",
    startTid:"",
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
getQuizId();
getKallenavn();
hentQuiz(quizId);


//Set opp layout
$("#tittel").text("Hei "+kallenavn+", velkommen til ventesiden")

function ventTilStartTid() {
    if (sekunderTilStart > 0) {
        sekunderTilStart--;
        console.log("Sekunder til start satt til: "+sekunderTilStart);
        $("#tidIgjenOutput").text("Det er "+sekunderTilStart+" sekunder til quizzen begynner")
    }
    //Har en if her så dette bare kjøres én gang
    else if (sekunderTilStart === 0) {
        document.location.href = "quiz.html";
    }
}

function finnTidTilStart() {
    if (testerProgram === true) {
        sekunderTilStart = testSekunderTilStart;
        console.log(sekunderTilStart);
    }
    else {
        var startTid = new Date(quiz.startDato+"T"+quiz.startTid+":00+02:00");
        var tidnaa = new Date().getTime();
        sekunderTilStart = tidnaa - startTid.getTime();

        console.log("Sekunder til start satt til: "+sekunderTilStart);
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
            console.log("Hentet ut "+quiz.startDato);
            console.log("Hentet ut "+quiz.startTid);
            finnTidTilStart();
        }
    })
}