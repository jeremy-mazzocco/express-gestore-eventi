const fs = require("fs");
const path = require("path");

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function index(req, res) {

    res.format({

        text: () => {
            res.type("text")
                .send("text reply");
        },


        html: () => {

            // title
            let headContent = fs.readFileSync(path.resolve(__dirname, "../views/header.html"), "utf-8");
            let htmlContent = fs.readFileSync(path.resolve(__dirname, "../views/index.html"), "utf-8");

            htmlContent = htmlContent.replace("@header", headContent);
            
            const titleBlog = "Benvenuto nel mio blog!!"
            htmlContent = htmlContent.replace("{{ titleBlog }}", titleBlog);

            res.type("html").send(htmlContent);
        },


        json: () => {
            res.type("json").send({
                message: "JSON reply",
            });
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        },
    })
}


module.exports = {
    index
}