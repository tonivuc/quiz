// www.mysite.com/my_app.html?Use_Id=abc


//Kan bruke det her til å få ut QuizID fra URLen
//var GET = {};
/*
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

var quiz = {
    tittel:"",
    id:0,
    sporsmaalArray:[],
    sporsmaalNaa:0,
    startTidspunkt:""
};

var quizId = 0; //Lar denne være manuell for testing

function hentQuiz(id) {
    $.ajax({
        url: 'rest/QuizService/'+id+'',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            quiz = result;
            console.log("Hentet ut "+quiz.tittel);
        }
    })
}

function oppdaterSporsmaalNaa() {
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

function tellNed() {

}

hentQuiz(quizId);




