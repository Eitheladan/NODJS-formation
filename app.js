const express = require('express');
const jsonfile = require('jsonfile');
const bdd = require('./models/controller');

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.set('views', __dirname + '/views'); // répertoire contenant les templates
// déclaration du moteur de template utilisé
app.set('view engine', 'ejs'); // https://ejs.co/


// déclaration d'une route 

app.get('/', function (req, res) {
    res.render('index');
})


app.get('/route1', function (req, res) {
    res.render('data1', {
        resultat: "Félicitation !!!!"
    })
})

app.get('/route2/:param1/:param2', function (req, res) {
    console.log(req.params);
    res.render('data2', {
        resultat: "Félicitation !!!!",
        p1: req.params.param1,
        p2: req.params.param2
    });
})

app.get('/route3', function (req, res) {
    let donnees = jsonfile.readFileSync('models/data.json')
    console.log(donnees);
    res.render('data3', donnees);

})

app.get('/route4', function (req, res) {
    jsonfile.readFile('models/data.json', function (err, data) {
        console.log(data);
        res.render('data3', data);
    })
    console.log("COUCOU");
})

app.get('/route5', function (req, res) {
    bdd.getAll("articles", function (articles) {
        console.log(articles);
        res.render("data4", {
            articles: articles
        });
    })
})

app.get('/route6', function (req, res) {
    res.render("creart");
})

app.post('/add_article', function (req, res) {
    console.log(req.body);
    bdd.createarticles('articles', req.body, function () {
        res.redirect('/route5');
    });
})

app.get('/modif_article/:id', function (req, res) {
    bdd.getOne('articles', req.params.id, function (article) {
        console.log(article);
        res.render("article", {
            article: article
        });

    });

})

app.post('/update_article/:id', function (req, res) {
    console.log(req.body);
    bdd.updateArticle('articles', req.params.id, req.body, function () {
        res.redirect('/route5');
    });
})

app.get('/stocks', function (req, res) {
    bdd.getAll("articles", function (articles) {
        console.log(articles);
        res.render("stock", {
            articles: articles
        });
    })
})

app.use(function (req, res, next) {
    console.log('une requete a été effectué a cette heure : ', Date.now());
    next();
});



app.listen(8082);