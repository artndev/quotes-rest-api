const i18n = require("i18n");
const express = require("express");
const rootPath = require("app-root-path");
const quoteRouters = require("./routers/Quotes.js");
const mainRouters = require("./routers/Main.js")


const app = express();
i18n.configure({
    locales: ['ru', 'en', 'es', 'fr', 'zh', 'ja'],
    directory: rootPath + "/src/locales"
})
app.use(express.json());
app.use(i18n.init)
app.use("/quotes", quoteRouters)
app.use("/", mainRouters)

const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
    if (err) {
        return console.error(err);
    }

    console.log(`Server is on the port - ${PORT}!`);
});
