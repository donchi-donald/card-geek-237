var databaseHandler = {
db: null,
createDatabase: function(){
    this.db = window.openDatabase(
        "card.db",
        "1.0",
        "card database",
        1000000);
    this.db.transaction(
        function(tx){
            //Run sql here using tx
            tx.executeSql(
                "create table if not exists card(_id integer primary key, frage text, antwort text)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table: " + error.message);
                }
            );
        },
        function(error){
            console.log("Transaction error: " + error.message);
        },
        function(){
            console.log("Create DB transaction completed successfully");
        }
    );

},

deleteDatabase: function(){
    this.db.transaction(

    );
}
}