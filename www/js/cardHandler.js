var cardHandler={
addcard: function(frage, antwort){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "insert into card(frage, antwort) values(?, ?)",
                [frage, antwort],
                function(tx, results){},
                function(tx, error){
                    console.log("add card error: " + error.message);
                }
            );
        },
        function(error){},
        function(){}
    );
},

getidAntwort: function(id){
    var antwort="";
    databaseHandler.db.readTransaction(
        function(tx){
            tx.executeSql(
                "select * from card where _id = "+id+";",
                [],
                function(tx, results){
                   antwort = results.rows.item(0).antwort;
                   confirm("Antwort: "+antwort);
                  // $("#antwortf").text(antwort);
                   // $("#popupreponse").popup("open");
                },
                function(tx, error){//TODO: Alert the message to user
                    console.log("Error while selecting the cards" + error.message);
                }
            );
        }
    );
    console.log(antwort);
    return antwort;

},

startcard: function(displaystart){
    databaseHandler.db.readTransaction(
        function(tx){
            tx.executeSql(
                "select * from card",
                [],
                function(tx, results){
                    //Do the display
                    displaystart(results);
                },
                function(tx, error){//TODO: Alert the message to user
                    console.log("Error while selecting the cards" + error.message);
                }
            );
        }
    );

},
loadcards: function(displaycards){
    databaseHandler.db.readTransaction(
        function(tx){
            tx.executeSql(
                "select * from card",
                [],
                function(tx, results){
                    //Do the display
                    displaycards(results);
                },
                function(tx, error){//TODO: Alert the message to user
                    console.log("Error while selecting the cards" + error.message);
                }
            );
        }
    );
},
deletecard:function(_id){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "delete from card where _id = ?",
                [_id],
                function(tx, results){},
                function(tx, error){//TODO: Could make an alert for this one.
                    console.log("Error happen when deleting: " + error.message);
                }
            );
        }
    );
},
updatecard: function(_id, newfrage, newantwort){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "update card set frage=?, antwort=? where _id = ?",
                [newfrage, newantwort, _id],
                function(tx, result){},
                function(tx, error){//TODO: alert/display this message to user
                    console.log("Error updating card" + error.message);
                }
            );
        }
    );
}
};