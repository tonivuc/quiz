
//Hoved-objekt, inneholder mange spørsmål med svar.
    var quiz = {

    };

    var knappnr = 0;
    var midlertidligSvarArray = [];
    var selectedKnapp;
    var selectedKnappNr;

    //Legger inn nytt
    $("#nyttSvarKnapp").click(function () {
        var svar = $("#nyttSvar").val();
        midlertidligSvarArray.push(svar);
        $(".funkyradio").append("<div class='funkyradio-primary' id='radioParent"+knappnr+"'> <input class='radioknapp' type='radio' name='radio' id='radio"+knappnr+"'/> <label for='radio"+knappnr+"'>"+svar+"</label></div>");
        knappnr++;
    });

    $(document).on("click", ".radioknapp", function(event){
        selectedKnapp = $(this).attr('id');
        selectedKnappNr = selectedKnapp.substr(selectedKnapp.length - 1); //Last index
    });

    $("#sporsmaalFerdig").click(function () {

        var sporsmaal = {
            sporsmaalTekst:"",
            svarArray:[],
            riktigSvar:0,
            varighet:0
        };

        sporsmaal.sporsmaalTekst =$("#nyttSporsmaalInput").val();
        sporsmaal.riktigSvar = selectedKnappNr;
        sporsmaal.varighet = $("#spmVarighet").val();
        //Fyll spørsmål-objektet  med svar og fjern stuff fra "Modal"
        for(i = 0; i < midlertidligSvarArray.length; i++){
            $("#radioParent"+i+"").remove();
            sporsmaal.svarArray[i] = midlertidligSvarArray[i];
        }

        $("#nyttSporsmaalInput").val("");
        $("#spmVarighet").val("");
        $("#nyttSvar").val("");
        console.log("Array length: "+quiz.sporsmaalArray.length);
        quiz.sporsmaalArray.push(sporsmaal);
        console.log(quiz.sporsmaalArray[quiz.sporsmaalArray.length-1]);
        $("#quizSporsmaalListe").append("<a href='' class='list-group-item'>"+sporsmaal.sporsmaalTekst+"</a>");

        //AJAX
        $.ajax({
            url: 'rest/lagquiz',
            type: 'POST',
            data: JSON.stringify({
                navn: $("#navnInput").val(),
                etternavn: "Odegård"
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                alert("Stringify success!");
            }
        })
    });


    //var myVar = setInterval(getFunksjon, 1000);

    // Lag ny rest-ressursen under '/kunder/'
    $("#nyttSporsmaal").click(function () {

        /*
        $.ajax({
            url: 'rest/lagquiz/' + $("#navnInput").val(),
            type: 'POST',
            success: function (result) {
                alert("Post success!");
            }
        })

        alert("test");

        */
    });

    function getFunksjon() {
        //jQuery $.get()-metode.
        $.ajax({
            url: 'rest/lagquiz/',
            type: 'GET',
            success: function (result) {
                $("h1").html(result)
            }
        })
    }
