$(document).on("ready", function(){
    databaseHandler.createDatabase();
});
function addcard(){
    var frage = $("#txtfrage").val();
    var antwort = $("#txtantwort").val();

    if(!frage){
        alert("frage is required");
    }else{
        var r = confirm("frage: " + frage + "\n" + "antwort: " + antwort);
        if(r==true){
            cardHandler.addcard(frage, antwort);
            $("#txtfrage").val("");
            $("#txtantwort").val("");
        }
    }
}
var currentcard={
id: -1,
frage: "",
antwort:-1,
}

function displaystart(results){
    var lstfrage = $("#lstfrage");
    
    var length = results.rows.length;
    if(length==0){

    }else{
        var lstfrage = $("#lstfrage");
        lstfrage.empty(); //Clean the old data before adding.
        for(var i=0; i< length; i++){
            var item = results.rows.item(i);
            var a = $("<a />");
            var h3=$("<h3 />");
            var spanfrage=$("<span />").text(item.frage);
            var p = $("<p />").text("Id: ");
            var spanId = $("<span />").text(item._id);
            spanId.attr("frage", "_id");
            h3.append(spanfrage);
            p.append(spanId);
            a.append(p);
            a.append(h3);
            var li = $("<li/>");
            li.attr("data-filtertext", item.frage);
            li.append(a);
            lstfrage.append(li);
        }

    }
    
    lstfrage.listview("refresh");
    lstfrage.on("tap", "li", function(){
        var id= $(this).find("[frage='_id']").text();
        cardHandler.getidAntwort(id);
    });

}
$(document).on("pagebeforeshow", "#start", function(){
    cardHandler.startcard(displaystart);
    //displaystart("h");
});



function displaycards(results){
    var length = results.rows.length;
    var lstcards = $("#lstcards");
    lstcards.empty();//Clean the old data before adding.
    for(var i = 0; i< length; i++){
        var item = results.rows.item(i);
        var a = $("<a />");
        var h3 = $("<h3 />").text("frage: ");
        var h4 = $("<h4 />").text("antwort: ");
        var p = $("<p />").text("Id: ");
        var spanfrage = $("<span />").text(item.frage);
        spanfrage.attr("frage", "frage");
        var spandantwort = $("<span />").text(item.antwort);
        spandantwort.attr("frage", "antwort");
        var spanId = $("<span />").text(item._id);
        spanId.attr("frage", "_id");
        h3.append(spanfrage);
        h4.append(spandantwort);
        p.append(spanId);
        a.append(h3);
        a.append(h4);
        a.append(p);
        var li = $("<li/>");
        li.attr("data-filtertext", item.frage);
        li.append(a);
        lstcards.append(li);
    }
    lstcards.listview("refresh");
    lstcards.on("tap", "li", function(){
        currentcard.id = $(this).find("[frage='_id']").text();
        currentcard.frage = $(this).find("[frage='frage']").text();
        currentcard.antwort = $(this).find("[frage='antwort']").text();
        //Set event for the list item
        $("#popupUpdateDelete").popup("open");
    });
}

$(document).on("pagebeforeshow", "#loadpage", function(){
    cardHandler.loadcards(displaycards);
});



function deletecard(){
    var r = confirm("Delete card\nfrage: "+currentcard.frage+
                    "\nantwort: " + currentcard.antwort);
    if(r==true){
        cardHandler.deletecard(currentcard.id);
        cardHandler.loadcards(displaycards);
    }
    $("#popupUpdateDelete").popup("close");
}

$(document).on("pagebeforeshow", "#updatedialog", function(){
    $("#txtNewfrage").val(currentcard.frage);
    $("#txtNewantwort").val(currentcard.antwort);
});

function updatecard(){
    var newfrage = $("#txtNewfrage").val();
    var newantwort = $("#txtNewantwort").val();
    cardHandler.updatecard(currentcard.id, newfrage, newantwort);
    $("#updatedialog").dialog("close");
}