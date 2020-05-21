const db = require('../models/index');
const Subject = db.Subject;
const Op = db.Sequelize.Op;

exports.create = (req, resp) => {
    // Llegó una petición date - ip.
    if(!req.body.title || !req.body.cohort){
        resp.status(400).send({
            message: 'Content cannot be emply'
        });
        return;
    }

    const subject = {
        title: req.body.title,
        description: req.body.description,
        cohort: req.body.cohort
    }
    
    // Se intenta crear una materia.
    Subject.create(subject)
        .then(data => { // Cuándo se resuelva satisfactoriamente.
            resp.send(data);
        })
        .catch(err => { // Cuándo no se resuelva y tengamos un error.
            // Lanzó un error de tipo xxxxxxx.
            resp.status(500).send({
                message: err.message || 'Something went wrong with the service'
            })
        });
}

exports.findAll = (req, resp) => {
    const title = req.query.title;
    const condition = title ? { title: { [Op.like]: '%${title}%' } } : null;
    Subject.findAll({ where: condition })
        .then(data  => {
            resp.send(data);
        })
        .catch(err => {
            resp.status(500).send({
                message: err.message || 'Something went wrong with the service'
            })
        });
}

