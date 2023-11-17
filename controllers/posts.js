
const postsJSON = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const { kebabCase } = require("lodash");


function index(req, res) {
    res.format({
        html: () => {
            const html = ["<h1>Posts</h1>"];
            html.push("<ul>");

            postsJSON.forEach(post => {
                html.push(
                    `<li>
                        <h3>${post.title}</h3>
                        <img src="/imgs/posts/${post.image}" alt="" style="width: 150px; height: 150px">
                        <p>${post.content}</p>
                    </li>`
                );

                // tags
                html.push("<span>");
                post.tags.forEach(tag => {
                    html.push(`${tag}<br>`);
                });
                html.push("</span>");
            });

            html.push("</ul>");
            res.send(html.join(""));
        },
        json: () => {
            res.type("json").send({
                totalElements: postsJSON.length,
                list: postsJSON
            });
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        },
    });
}

function show(req, res) {

    const post = doesPostExist(req, res);

    res.json(post);
}

function create(req, res) {

    res.format({

        html: () => {

            const html = ["<h1>Creazione nuovo post</h1>"];

            res.send(html.join(""));
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        },
    })

}

function store(req, res) {

        // console.log(req.body, req.file);

        let idList = postsJSON.map((post) => post.id);
        idList.sort((a, b) => b - a);

        const newPost = {
            ...req.body,
            id: idList[0] + 1,
            slug: kebabCase(req.body.title),
            updatedAt: new Date().toISOString(),
            image: req.file,
        };

        postsJSON.push(newPost);

        fs.writeFileSync(path.resolve(__dirname, "..", "db", "db.json"), JSON.stringify(postsJSON, null, 2));


        if (req.accepts("html")) {

            res.redirect(`/posts/${newPost.id}`);

        } else {

            res.json(newPost);
        }
    }

function destroy(req, res) {

    const post = doesPostExist(req, res);

    const postIndex = postsJSON.findIndex((_post) => _post.id == post.id);

    postsJSON.splice(postIndex, 1);

    if (post.image) {
        if (typeof post.image === "string") {
            const filePath = path.resolve(
                __dirname,
                "..",
                "public",
                "imgs",
                "posts",
                post.image
            );

            fs.unlinkSync(filePath);
        } else {
            const filePath = path.resolve(__dirname, "..", post.image.path);

            fs.unlinkSync(filePath);
        }
    }




    res.send("Post eliminato");
}

function download(req, res) {

    const post = doesPostExist(req, res);
    const encodedSlug = encodeURIComponent(post.slug);

    if (post.image) {

        const imagePath = path.join(__dirname, '..', 'public', 'imgs', 'posts', post.image);

        res.download(imagePath, `${encodedSlug}`, (err) => {

            if (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    } else {

        res.status(404).send(`Immagine non trovata`);
    }
}



// other functions
function doesPostExist(req, res) {
    const postID = req.params.id;
    const post = postsJSON.find((post) => post.id == postID);

    if (!post) {
        res.status(404).send(`Post non trovato`);
        return;
    }

    return post;
}


module.exports = {
    index,
    show,
    create,
    store,
    destroy,
    download
}