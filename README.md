# RDSearch
Website for rare diseases related publication analysis on Pubmed database

### Technology used
- Node.js
- W3.css

### Start web server
First of all, you have to update node modules via Node command prompt:
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
The local module **Searcher** (/local_node_modules/Searcher.js) use Pubmed to retrieve full articles. 
And the local module **UpdateModule** (/local_node_modules/UpdateModule.js) is responsible for updating the data base.

### Do I need to create a data base?
Yes, you have to create a data base to test the search engine. She's needed to stock number of publications per year, rare disease informations, ...

To do this, use any sofware to manage a MySQL data base. (EasyPHP for example)

Create a data base which respect this information:
```
host     : 'localhost',
user     : 'root',
password : '',
database : 'RDSearchDB',
```

Once done, run the SQL script "raredisease.sql" provided in the repository in your MySQL data base manager
