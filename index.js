const express = require ('express');
const application = express();

const apiInfo = {
    name: "First Express Api",
    version: "1.0.0",
    author: "aldo_mec_acc16",
    contactInfo:{
        email: "aldo.castillo.13@gmail.com",
        wsp: "261-6934658"
    }
}

application.get('/name', (request, response) => {
    const name = {name: apiInfo.name};
    response.send(name);
});

application.get('/version', (request, response) => {
    const version = {version: apiInfo.version};
    response.send(version);
});

application.get('/author', (request, response) => {
    const author = {author: apiInfo.author};
    response.send(author);
});

application.get('/contact', (request, response) => {
    const contact = {contact: apiInfo.contactInfo.email + "<br>" + apiInfo.contactInfo.wsp};
    response.send(contact);
});

application.get('/', (request, response) => {
    response.send('Bienvenido a ' + apiInfo.name + " de " + apiInfo.author + "!");
});

application.get('/info-api', (request, response) => {
    response.send(apiInfo);
});


application.listen('3000', () => {
    console.log('Server listening at port 3000');
});