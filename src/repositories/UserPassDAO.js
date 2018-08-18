var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
let statement = 'INSERT INTO USERPASS (username, password) VALUES (:username, :password);';


export default class UserPassDAO {
    constructor() {
        this.config = {
            
            options: {
                database: 'USERAUTH', 
                encrypt: true
            }
        }

        this.queryDatabase = this.queryDatabase.bind(this);
        this.connection = new Connection(this.config);

        this.connection.on('connect', function(err) 
           {
             if (err) 
               {
                  console.log(err)
               }
            else
               {
                   queryDatabase()
               }
           }
         );
    }



queryDatabase()
   { console.log('Reading rows from the Table...');

       // Read all rows from table
     request = new Request(
          'SELECT * FROM USERPASS;',
             function(err, rowCount, rows) 
                {
                    console.log(rowCount + ' row(s) returned');
                    process.exit();
                }
            );

     request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
         });
             });
     this.connection.execSql(request);
   }
} 