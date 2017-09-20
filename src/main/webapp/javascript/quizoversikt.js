
//Placeholder metode for å vise at det går an å legge inn rader
//Skal hente inn rad-informasjon v.h.a. AJAX senere.

$("button").click(function(){
    var name = $("#name").val();
    var email = $("#email").val();
    var markup = "<tr><td>kek</td><td>" + name + "</td><td>" + email + "</td><td class='knappfelt'><button type='button' class='btn btn-success btn-block'>Bli med!</button></td></tr>";
    $("table tbody").append(markup);
});

// Find and remove selected table rows
$(".delete-row").click(function(){
    $("table tbody").find('input[name="record"]').each(function(){
        if($(this).is(":checked")){
            $(this).parents("tr").remove();
        }
    });
});