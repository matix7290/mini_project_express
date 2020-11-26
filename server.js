//zmienne, stałe

var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000
var path = require("path")
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var ids = 3
tab = [
    { id: 1, login: "AAA", pass: "PASS1", wiek: 15, uczen: "checked", plec: "K" },
    { id: 2, login: "admin", pass: "admin", wiek: 18, uczen: "checked", plec: "M" },
]

function check(user, password) {
    for (i = 0; i < tab.length; i++) {
        if (user == tab[i].login) {
            if (password == tab[i].pass) {
                return true
            } else {
                return false
            }
        }
    }
    return false
}

function tabelka() {
    tabela = `<tr><th>Users</th></tr>`
    for (i = 0; i < tab.length; i++) {
        if (tab[i].uczen == "checked") {
            checkbox = `<input type="checkbox" checked onclick="return false;">`
        } else {
            checkbox = `<input type="checkbox" accept="no" onclick="return false;">`
        }
        tabela += `<tr>
                    <td>id: ${tab[i].id}</td>
                    <td>user: ${tab[i].login} - ${tab[i].pass}</td>
                    <td>uczeń: ${checkbox}</td>
                    <td>wiek: ${tab[i].wiek}</td>
                    <td>płeć: ${tab[i].plec}</td>
                </tr>`
    }
}

function gender() {
    woman = `<tr><th>Woman</th></tr>`
    men = `<tr><th>Men</th></tr>`
    for (i = 0; i < tab.length; i++) {
        if (tab[i].plec == "M") {
            men += `<tr>
                        <td>id: ${tab[i].id}</td>
                        <td>płeć: ${tab[i].plec}</td>
                    </tr>`
        } else if (tab[i].plec == "K") {
            woman += `<tr>
                        <td>id: ${tab[i].id}</td>
                        <td>płeć: ${tab[i].plec}</td>
                    </tr>`
        }
    }
}

function sort_id() {
    tab.sort(function (a, b) {
        return parseFloat(a.id) - parseFloat(b.id)
    })
    tabelka()
}

function sort_up() {
    tab.sort(function (a, b) {
        return parseFloat(a.wiek) - parseFloat(b.wiek)
    })
    tabelka()
}

function sort_down() {
    tab.sort(function (a, b) {
        return parseFloat(b.wiek) - parseFloat(a.wiek)
    })
    tabelka()
}

function free(user) {
    for (i = 0; i < tab.length; i++) {
        if (user == tab[i].login) {
            return false
        }
    }
    return true
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/style", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/css/style.css"))
})

app.get("/", function (req, res) {
    if (req.cookies.logged == "yes") {
        res.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>register</title>
                        <link rel="stylesheet" href="/style">
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
                    </head>
                    <body>
                        <div class="menu">
                            <a href="/" style="margin-left: 5%;">main</a>
                            <a href="/admin">admin</a>
                            <a href="/log_out" style="float: right; margin-right: 5%;">logout</a>
                        </div>
                        <h1>main page</h1>
                    </body>
                    </html>`)
    } else {
        res.sendFile(path.join(__dirname + "/static/index.html"))
        res.clearCookie("logged")
    }
})

app.get("/admin", function (req, res) {
    if (req.cookies.logged == "yes") {
        res.sendFile(path.join(__dirname + "/static/admin_log.html"))
    } else {
        res.sendFile(path.join(__dirname + "/static/admin_not.html"))
    }
})

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"))
})

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"))
})

app.post("/register", function (req, res) {
    if (free(req.body.username)) {
        tab.push({ id: ids, login: req.body.username, pass: req.body.password, wiek: req.body.age, uczen: req.body.student, plec: req.body.sex })
        ids++
        res.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>register</title>
                        <link rel="stylesheet" href="/style">
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
                    </head>
                    <body>
                        <div class="menu">
                            <a href="/" style="margin-left: 5%;">main</a>
                            <a href="/register">register</a>
                            <a href="/admin">admin</a>
                            <a href="/login" style="float: right; margin-right: 5%;">login</a>
                        </div>
                        <h1>Uzytkownik ${req.body.username} pomyślnie zarejestrowany</h1>
                    </body>
                    </html>`)
    } else {
        res.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>register</title>
                        <link rel="stylesheet" href="/style">
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
                        <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
                    </head>
                    <body>
                        <div class="menu">
                            <a href="/" style="margin-left: 5%;">main</a>
                            <a href="/register">register</a>
                            <a href="/admin">admin</a>
                            <a href="/login" style="float: right; margin-right: 5%;">login</a>
                        </div>
                    
                        <h1>rejestracja</h1>
                    
                        <div class="form">
                            <form action="/register" method="post">
                                <label for="username">Nazwa użytkownika:</label>
                                <input type="text" id="username" name="username" onchange="this.submit()" autocomplete="off" required>
                                <label for="password">Hasło:</label>
                                <input type="password" id="password" name="password" onchange="this.submit()" autocomplete="off" required>
                                <label for="age">Wiek:</label>
                                <select name="age" id="age" onchange="this.submit()" required>
                                    <option value="">wybierz</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                </select>
                                <li><label for="student">Uczeń: 
                                    <input type="checkbox" id="student" name="student" value="checked" onchange="this.submit()">
                                </label></li>
                                <li><label for="sex">Płeć: 
                                    <input type="radio" class="sex" name="sex" value="M" onchange="this.submit()" required>M
                                    <input type="radio" class="sex" name="sex" value="K" onchange="this.submit()" required>K
                                </label></li>
                                <label for="username" style="color: red;">Nazwa uzytkownika zajęta</label>
                                <div id="lower">
                                    <button>Register</button>
                                </div>
                            </form>
                        </div>
                    </body>
                    </html>`)
    }
})

app.post("/login", function (req, res) {
    if (check(req.body.username, req.body.password)) {
        res.cookie("logged", "yes").redirect("/admin")
    } else {
        res.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>register</title>
                        <link rel="stylesheet" href="/style">
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
                        <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
                    </head>
                    <body>
                        <div class="menu">
                            <a href="/" style="margin-left: 5%;">main</a>
                            <a href="/register">register</a>
                            <a href="/admin">admin</a>
                            <a href="/login" style="float: right; margin-right: 5%;">login</a>
                        </div>
                    
                        <h1>logowanie</h1>
                    
                        <div class="form">
                            <form action="/login" method="post">
                                <label for="username">Nazwa użytkownika:</label>
                                <input type="text" id="username" name="username" style="outline: 5px solid #f8e5e5" autocomplete="off" onchange="this.submit()" required>
                                <label for="password">Hasło:</label>
                                <input type="password" id="password" name="password" style="outline: 5px solid #f8e5e5" autocomplete="off" onchange="this.submit()" required>
                                <label for="username" style="color: red;">Zła nazwa uzytkownika lub hasło</label>
                                <div id="lower">
                                    <button>Login</button>
                                </div>
                            </form>
                        </div>
                    </body>
                    </html>`)
    }
})

app.get("/log_out", function (req, res) {
    res.cookie("logged", "no").redirect("/")
})

app.get("/admin/sort/", function (req, res) {
    if (req.cookies.logged == "yes") {
        sort_id()
        res.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>register</title>
                        <link rel="stylesheet" href="/style">
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
                    </head>
                    <body>
                        <div class="menu">
                            <a href="/" style="margin-left: 5%;">main</a>
                            <a href="/admin">admin</a>
                            <a href="/log_out" style="float: right; margin-right: 5%;">logout</a>
                        </div>
                        <div class="menu2">
                            <a href="/admin/sort" style="margin-left: 5%;">sort</a>
                            <a href="/admin/gender">gender</a>
                            <a href="/admin/show">show</a>
                        </div>
                        <h1 style="margin-top: 100px">show</h1>
                        <form action="/admin/sort" method="post" onchange="this.submit()">
                            <input type="radio" class="sort" name="sort" value="up"> Sortuj rosnąco
                            <input type="radio" class="sort" name="sort" value="down"> Sortuj malejąco
                        </form>
                        <br><br>
                        <table>
                            ${tabela}
                        </table>
                    </body>
                    </html>`)
    } else {
        res.sendFile(path.join(__dirname + "/static/admin_not.html"))
    }
})

app.post("/admin/sort", function (req, res) {
    if (req.body.sort == "up") {
        sort_up()
        res.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>register</title>
                        <link rel="stylesheet" href="/style">
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
                    </head>
                    <body>
                        <div class="menu">
                            <a href="/" style="margin-left: 5%;">main</a>
                            <a href="/admin">admin</a>
                            <a href="/log_out" style="float: right; margin-right: 5%;">logout</a>
                        </div>
                        <div class="menu2">
                            <a href="/admin/sort" style="margin-left: 5%;">sort</a>
                            <a href="/admin/gender">gender</a>
                            <a href="/admin/show">show</a>
                        </div>
                        <h1 style="margin-top: 100px">show</h1>
                        <form action="/admin/sort" method="post" onchange="this.submit()">
                            <input type="radio" class="sort" name="sort" value="up" checked> Sortuj rosnąco
                            <input type="radio" class="sort" name="sort" value="down"> Sortuj malejąco
                        </form>
                        <br><br>
                        <table>
                            ${tabela}
                        </table>
                    </body>
                    </html>`)
    } else {
        sort_down()
        res.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>register</title>
                        <link rel="stylesheet" href="/style">
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
                    </head>
                    <body>
                        <div class="menu">
                            <a href="/" style="margin-left: 5%;">main</a>
                            <a href="/admin">admin</a>
                            <a href="/log_out" style="float: right; margin-right: 5%;">logout</a>
                        </div>
                        <div class="menu2">
                            <a href="/admin/sort" style="margin-left: 5%;">sort</a>
                            <a href="/admin/gender">gender</a>
                            <a href="/admin/show">show</a>
                        </div>
                        <h1 style="margin-top: 100px">show</h1>
                        <form action="/admin/sort" method="post" onchange="this.submit()">
                            <input type="radio" class="sort" name="sort" value="up"> Sortuj rosnąco
                            <input type="radio" class="sort" name="sort" value="down" checked> Sortuj malejąco
                        </form>
                        <br><br>
                        <table>
                            ${tabela}
                        </table>
                    </body>
                    </html>`)
    }
})

app.get("/admin/gender", function (req, res) {
    if (req.cookies.logged == "yes") {
        gender()
        res.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>register</title>
                        <link rel="stylesheet" href="/style">
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
                    </head>
                    <body>
                        <div class="menu">
                            <a href="/" style="margin-left: 5%;">main</a>
                            <a href="/admin">admin</a>
                            <a href="/log_out" style="float: right; margin-right: 5%;">logout</a>
                        </div>
                        <div class="menu2">
                            <a href="/admin/sort" style="margin-left: 5%;">sort</a>
                            <a href="/admin/gender">gender</a>
                            <a href="/admin/show">show</a>
                        </div>
                        <h1 style="margin-top: 100px">show</h1>
                        <table>
                            ${woman}
                        <td style="border: none"></td>
                            ${men}
                        </table>
                    </body>
                    </html>`)
    } else {
        res.sendFile(path.join(__dirname + "/static/admin_not.html"))
    }
})

app.get("/admin/show", function (req, res) {
    if (req.cookies.logged == "yes") {
        sort_id()
        res.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>register</title>
                        <link rel="stylesheet" href="/style">
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
                    </head>
                    <body>
                        <div class="menu">
                            <a href="/" style="margin-left: 5%;">main</a>
                            <a href="/admin">admin</a>
                            <a href="/log_out" style="float: right; margin-right: 5%;">logout</a>
                        </div>
                        <div class="menu2">
                            <a href="/admin/sort" style="margin-left: 5%;">sort</a>
                            <a href="/admin/gender">gender</a>
                            <a href="/admin/show">show</a>
                        </div>
                        <h1 style="margin-top: 100px">show</h1>
                        <table>
                            ${tabela}
                        </table>
                    </body>
                    </html>`)
    } else {
        res.sendFile(path.join(__dirname + "/static/admin_not.html"))
    }
})

//nasłuch na określonym porcie

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})