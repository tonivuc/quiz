var tid = window.setInterval(tellNed,1000);

//Objekt og variabler
var quiz = {
    tittel:"",
    id:0,
    sporsmaalArray:[],
    sporsmaalNaa:0,
    startDate:""
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
var antSvarForrigeSporsmaal = 0;

var getTidIgjen = function () {
    return tidIgjen;
}

//Hent stuff fra localstorage
function getQuizId() {
    quizId = localStorage.getItem("quizId");
    console.log("QuizID = "+quizId);
}

function getKallenavn() {
    kallenavn = localStorage.getItem("kallenavn");
    console.log("Kallenavn quiz: "+kallenavn)
    $("#kallenavnOutput").html(kallenavn);
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
            console.log("GET-success! Hentet ut "+quiz.tittel);
            setupLayout();
            leggInnSpiller();
        }
    })
}

getQuizId();
getKallenavn();
hentQuiz(quizId);

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


function fjernAlleSvar() {
    //$(".listgroup").empty(); Funker ikke på custom listen
    for (i=0; i < sporsmaal.svarArray.length; i++) {
        $("#radioParent"+i).remove();
    }
}

function nyeSvar() {
    //For lengden av spørsm
    console.log("Legger inn nye svar");
    for(i = 0; i < sporsmaal.svarArray.length;) {
        console.log(sporsmaal.svarArray[i]);
        $("#funkyradioContainer").append("<div class='funkyradio-primary' id='radioParent"+i+"'><input class='radioknapp' type='radio' name='radio' id='radio"+i+"'/> <label for='radio"+i+"' id='radioLabel"+i+"'>"+sporsmaal.svarArray[i]+"</label></div>");
        i++;
        if (sporsmaal.svarArray[i] == null) break;
    }
}

//Oppdater layout

function setupLayout() {
    if (antSvarForrigeSporsmaal > 1) {
        fjernAlleSvar();
    }
    sporsmaal = quiz.sporsmaalArray[quiz.sporsmaalNaa];
    antSvarForrigeSporsmaal = sporsmaal.svarArray.length;
    tidIgjen = sporsmaal.varighet;
    $("#sporsmaalTekst").text(sporsmaal.sporsmaalTekst);
    $("#poeng").text("Poeng: "+poeng);
    $("#quizbilde").attr("src",sporsmaal.bildeURL);
    nyeSvar();
}

/*
function leggInnSvarAlternativer() {
    for (i=0; i < sporsmaal.svarArray.length; i++) {
        $(".list-group").append("<div class='funkyradio-primary'  id='radioParent"+i+"'> <input class='radioknapp' type='radio' name='radio' id='radio"+i+"'/> <label for='radio"+i+"'>"+sporsmaal.svarArray[i]+"</label></div>");
    }

}
*/

visRiktigSvar();

function tellNed() {
    tidIgjen--;
    
    if (tidIgjen >= 0) {
        $("#tid").text(tidIgjen);
    }

    //Logikk for å gå til neste quiz, ish?

    if (tidIgjen === 0) {
        visRiktigSvar();
    }

    if (tidIgjen === -3) {
        nesteSporsmaal();
    }
}

function visRiktigSvar() {
    $("#radioLabel" + sporsmaal.riktigSvar).css({"backgroundColor":"#9DE0AD"})
};

//Gå videre til neste spørsmål
function nesteSporsmaal() {
    oppdaterSpillerPoeng();

    if (quiz.sporsmaalNaa >= quiz.sporsmaalArray.length-1) {
        document.location.href = "scoreboard.html";
    }
    else {
        quiz.sporsmaalNaa++;
        oppdaterSporsmaalNaa(); //Fortell serveren hvilket spørsmål vi er på
        //Setup layout
        setupLayout();

    }
}

function oppdaterSporsmaalNaa() { //Altså spørsmålnr
    $.ajax({
        url: 'rest/QuizService/sporsmaal',
        type: 'POST',
        data: JSON.stringify(quiz),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(result) {
            console.log("POST-success! Oppdaterte serveren med nåværende indeksen til nåværende spørsmål")
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
            console.log("POST-success! Kallenavn "+kallenavn+" lagt på server!")
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
                console.log("PUT-success! OppdaterPoeng returnerte "+result);
                //Kan returnere ID til spilleren kanskje?/quiz/{quizId}
            },
            error: function(error) {
                console.log(error);
            }
        })
    }
}



