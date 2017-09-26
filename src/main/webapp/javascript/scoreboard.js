var spillere=[];

var spiller = {
    kallenavn:"",
    poeng:0
};

function addSpillere() {

    for (i=0; i < spillere.length; i++) {
        var markup = "<li class='list-group-item justify-contentbetween'>Dapibus ac facilisis in<span class='badge badge-default badge-pill'>"+poeng[0]+"</span></li>"
        $(".list-group").append(markup);
    }

}

addSpiller();

function hentSpillere() {
    $.ajax({
        url: 'rest/QuizService/quiz/'+quizId+'',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(result) {
            spillere = result;
            console.log("Returnerte "+result);
            //Kan returnere ID til spilleren kanskje?/quiz/{quizId}
        },
        error: function(error) {
            console.log(error);
        }
    })
}