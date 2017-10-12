var spillere=[];

//IF quiz spørsmål er siste spørsmål, slett quiz.
var tid = window.setInterval(hentSpillere,2000);
var tid2 = window.setInterval(fjernQuiz,5000); //Setter hvor lenge man venter før man fjerner quizzen. I millisekunder.

var spiller = {
    kallenavn:"",
    poeng:0
};

var quiId = -1;
var kallenavn = "";
var spillereLagtTil = 0;
var quizferdig = false;

//Hent stuff fra localstorage
function getQuizId() {
    quizId = localStorage.getItem("quizId");
    console.log("QuizID= "+quizId);
}

function getKallenavn() {
    kallenavn = localStorage.getItem("kallenavn");
    console.log("Kallenavn: "+kallenavn);
    $("#kallenavnOutput").text(kallenavn);
}

//Generelle metoder
getKallenavn();
getQuizId();
hentSpillere();
setTittel();


//HUSK: Trenger metode for sortering av spillere etter score!

//Endre layout/html

function setTittel() {
    $("#tittel").text("Scoreboard");
    //Dette burde egentlig være tittelen til quizen. Some other time.
}

function addSpillere(startIndeks) {
    console.log("Inne i addSpillere. Spillere.length = "+spillere.length);
    console.log("Startindekks: "+startIndeks);
    console.log("Spillere lagt til så langt: "+spillereLagtTil);
    for (i=startIndeks; i < spillere.length; i++) {
        spillereLagtTil++; //Holder oversikt over hvor mange spillere vi har lagt til
        var markup = "<li class='list-group-item justify-contentbetween'>"+spillere[i].kallenavn+"<span class='badge badge-default badge-pill' id='"+i+"'>"+spillere[i].poeng+"</span></li>";
        var spesialMarkup = "<li class='list-group-item justify-contentbetween active'>"+spillere[i].kallenavn.replace(/"/g, "")+"<span class='badge badge-default badge-pill' id="+i+">"+spillere[i].poeng+"</span></li>";

        //Gjør så kallenavnavn kan sammenlignes
        var gaasoyne = '"';
        var fiksetKallenavn  = gaasoyne;
        fiksetKallenavn  += kallenavn;
        fiksetKallenavn  += gaasoyne;

        if (spillere[i].kallenavn === fiksetKallenavn) {
            $(".list-group").append(spesialMarkup);
            $("#tittelPoeng").text("Din score: "+spillere[i].poeng);
        }
        else {
            $(".list-group").append(markup);
        }

        console.log("På slutten av loop nr: "+i+" Spillere.length = "+spillere.length);
        console.log("Startindekks: "+startIndeks);
        console.log("Spillere lagt til så langt: "+spillereLagtTil);


    }
    oppdaterSpillerPoeng();
}

//Live oppdatering av poeng
function oppdaterSpillerPoeng() {
    for (i=0; i < spillere.length; i++) {
        var selector = "#"+i;
        $(selector).text(spillere[i].poeng);
    }
}



//Backend-metoder
function hentSpillere() {
    $.ajax({
        url: 'rest/QuizService/quiz/'+quizId+'/spillere',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(result) {
            spillere = result;
            addSpillere(spillereLagtTil); //Legg inn de spillerne som ikke allerede er der
        },
        error: function(error) {
            console.log(error);
        }
    })
}

function fjernQuiz() {
    //console.log("FjernQuiz er deaktivert av debug-grunner")
    if (kallenavn == "" || kallenavn == " " || kallenavn == "undefined")  {
        console.log("Kallenavn er tomt, ikke slett quiz!")
    }
    else  {
        $.ajax({
            url: 'rest/QuizService/quiz/'+quizId+'',
            type: 'DELETE',
            success: function(result) {
                console.log("Fjernet quiz fra indeks "+result);
            }
        });
    }

}
