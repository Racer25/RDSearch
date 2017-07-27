# RDSearch
Website for rare diseases related publication analysis on Pubmed database

### Technology used
- Node.js
- W3.css

### Start web server
First of all, you have to update node modules:
```
npm update
```

Once done, use this command each time you want to start the web server:
```
node app.js
```

### Stop web server
Use **CTRL + C**

### How to go to the website?
On your browser: http://localhost:8080/

### Which file do the search on Pubmed?
The local module **Searcher** (/local_node_modules/Searcher.js)

### Do I need to create a data base?
Yes, you have to create a data base to test the search engine.

To do this, use any sofware to manage a MySQL data base. (EasyPHP for example)

Create a data base which respect this information:
```
host     : 'localhost',
user     : 'root',
password : '',
database : 'RDSearchDB',
```

Once done, run the SQL script "raredisease.sql" provided in the repository
