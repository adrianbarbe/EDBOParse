const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const University = require('./models').University;
const Abiturient = require('./models').Abiturient;
const AbiturientSubjects = require('./models').AbiturientSubjects;
const Sequelize = require('./models');

module.exports = function (app, io) {
    app.use('/api', router);

    router.get('/parse/:universityId', async function (req, res) {
        if (isNaN(req.param('universityId'))) {
            return res.status(403).send('Invalid university id');
        }

        const child = exec(`node ./parser.js -s ${req.param('universityId')}`); //442756
        child.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
            io.emit('parseConsole', {code: data});
        });
        child.stderr.on('data', function (data) {
            return res.json({error: data});
        });
        child.on('close', function (code) {
            return res.json({message: code});
        });
    });

    router.get('/university', async function (req, res) {
        const universities = await University.findAll({
            order: [
                ['name', 'ASC']
            ],
        });
        return res.json({data: universities});
    });

    router.get('/abiturient', async function (req, res) {
        const name = req.query.name;
        const Op = Sequelize.Sequelize.Op;

        const abiturients = await Abiturient.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            },
            include: [
                { model: University, required: true},
                { model: AbiturientSubjects, required: true},
            ]
        });
        return res.json({data: abiturients});
    });
};