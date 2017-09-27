


//Kan bruke det her til å få ut QuizID fra URLen
//Dette ble erstattet med LocalStorage
/*
www.mysite.com/my_app.html?Use_Id=abc

var GET = {};

var query = window.location.search.substring(1).split("&");
for (var i = 0, max = query.length; i < max; i++)
{
    if (query[i] === "") // check for trailing & with no param
        continue;

    var param = query[i].split("=");
    //GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
}
*/

var tid = window.setInterval(tellNed,1000);
var tid2 = window.setInterval(ventTilStartTid,1000);

var sekunderTilStart = 0;
var startet = false;

///VIKTIG///
//Hvis dette er true, er countdown alltid 6 sekunder
var testerProgram = true;
var testSekunderTilStart = 6;

///VIKTIG///

//Objekt og variabler
var quiz = {
    tittel:"",
    id:0,
    sporsmaalArray:[],
    sporsmaalNaa:0,
    startTidspunkt:""
};

var sporsmaal = {
    sporsmaalTekst:"",
    svarArray:[],
    bildeURL:"",
    riktigSvar:0,
    varighet:0
};

var tidIgjen = 0;
var quizId = 0; //Lar denne være manuell for testing
var kallenavn;
var poeng = 0;
var valgtSvar = 0;


//Hent stuff fra localstorage
function getQuizId() {
    quizId = localStorage.getItem("quizId");
    console.log("QuizID= "+quizId);
}

function getKallenavn() {
    kallenavn = localStorage.getItem("kallenavn");
    console.log("Kallenavn: "+kallenavn)
    $("#kallenavnOutput").text(kallenavn);
}


//Generelle metoder
function main() {
    getQuizId();
    getKallenavn();
    hentQuiz(quizId);
}

//Kjør javascript
finnTidTilStart();

function ventTilStartTid() {
    if (sekunderTilStart > 0) {
        sekunderTilStart--;
    }
    //Har en if her så dette bare kjøres én gang
    else if (sekunderTilStart === 0) {
        startet = true;
        main();
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

$(document).on("click", ".funkyradio-primary", function(event){
    //Legg inn valgt quiz som en slags cookie
    valgtSvarKnapp = $(this).attr('id');
    valgtSvar= valgtSvarKnapp.substr(valgtSvarKnapp.length - 1); //Få tak i indeksen som kan brukes i sporsmaal.sporsmaalArray
});

function sjekkRiktigSvar() {
    if(valgtSvar == sporsmaal.riktigSvar) {
        console.log("Riktig svar!");
        return true;
    }
    else {
        console.log("Feil svar!");
        return false;
    }
}



//Oppdater layout

function setupLayout() {
    sporsmaal = quiz.sporsmaalArray[quiz.sporsmaalNaa];
    console.log(sporsmaal.varighet);
    tidIgjen = sporsmaal.varighet;
    $("#sporsmaalTekst").text(sporsmaal.sporsmaalTekst);
    $("#poeng").text("Poeng: "+poeng);
    console.log("BildeURL: "+sporsmaal.bildeURL);
    $("#quizbilde").attr("src",sporsmaal.bildeURL);
    fjernAlleSvar();
    nyeSvar();
}

/*
function leggInnSvarAlternativer() {
    for (i=0; i < sporsmaal.svarArray.length; i++) {
        $(".list-group").append("<div class='funkyradio-primary'  id='radioParent"+i+"'> <input class='radioknapp' type='radio' name='radio' id='radio"+i+"'/> <label for='radio"+i+"'>"+sporsmaal.svarArray[i]+"</label></div>");
    }

}
*/

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

//Gå videre til neste spørsmål
function nesteSporsmaal() {
    oppdaterSpillerPoeng();

    if (quiz.sporsmaalNaa >= quiz.sporsmaalArray.length-1) {
        document.location.href = "scoreboard.html";
    }
    else {
        quiz.sporsmaalNaa++;
        console.log("Vi er næ på spørsmål: "+quiz.sporsmaalNaa);


        console.log("Spørsmåltittel: "+sporsmaal.sporsmaalTekst);
        oppdaterSporsmaalNaa(); //Fortell serveren hvilket spørsmål vi er på
        //Setup layout?
        setupLayout();

    }
}

function fjernAlleSvar() {
    //$(".listgroup").empty(); Funker ikke på custom listen
    for (i=0; i < sporsmaal.svarArray.length; i++) {
        $("#radioParent"+i).remove();
    }
}

function nyeSvar() {
    //For lengden av spørsm
    console.log("Legger inn nye svar");
    for(i = 0; i < sporsmaal.svarArray.length; i++) {
        console.log(sporsmaal.svarArray[i]);
        $(".funkyradio").append("<div class='funkyradio-primary' id='radioParent"+i+"'> <input class='radioknapp' type='radio' name='radio' id='radio"+i+"'/> <label for='radio"+i+"'>"+sporsmaal.svarArray[i]+"</label></div>");
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

function oppdaterSporsmaalNaa() { //Altså spørsmålnr
    $.ajax({
        url: 'rest/QuizService/sporsmaal',
        type: 'POST',
        data: JSON.stringify(quiz),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(result) {
            console.log("Oppdaterte serveren med nåværende indeksen til nåværende spørsmål")
        }
    })
}

function leggInnSpiller() {
    $.ajax({
        url: 'rest/QuizService/quiz/'+quizId+'',
        type: 'POST',
        data: JSON.stringify(kallenavn),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(result) {
            console.log("Kallenavn "+kallenavn+" lagt på server!")
            //Kan returnere ID til spilleren kanskje?/quiz/{quizId}
        },
        error: function(error) {
            console.log(error);
        }
    })
}

function oppdaterSpillerPoeng() {
    //Hvis svar er riktig
    if (sjekkRiktigSvar() === true) {
        poeng=poeng+10;
        $.ajax({
            url: 'rest/QuizService/quiz/'+quizId+'',
            type: 'PUT',
            data: JSON.stringify({
                kallenavn:kallenavn,
                poeng:poeng,
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(result) {
                console.log("OppdaterPoeng returnerte "+result);
                //Kan returnere ID til spilleren kanskje?/quiz/{quizId}
            },
            error: function(error) {
                console.log(error);
            }
        })
    }
}



