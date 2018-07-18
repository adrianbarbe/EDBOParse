const phantom = require('phantom');
const cheerio = require('cheerio');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const Abiturient = require('./models').Abiturient;
const AbiturientSubjects = require('./models').AbiturientSubjects;
const University = require('./models').University;

// You need to pass -s or -speciality argument in order to parse data (Eg. -s 442756 or -speciality 442756)
let specialityParam = 0;
if (argv.s === undefined && argv.speciality === undefined) {
    console.error("Please, provide -s or -speciality paramater");
    return;
}

if (argv.s !== undefined) {
    specialityParam = argv.s;
}

if (argv.speciality !== undefined) {
    specialityParam = argv.speciality;
}

if (isNaN(specialityParam)) {
    console.error("Please provide a valid integer in -s or -speciality paramater");
}

console.log("Speciality param: ", specialityParam);

(async function () {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function (requestData) { /*console.info('Requesting', requestData.url); */
    });
    const status = await page.open(`http://vstup.edbo.gov.ua/offer/${specialityParam}/`);

    const allApplications = await getCountAll();
    const allApplicationsCeil = Math.ceil(allApplications / 100) * 100;
    console.log("Count all applications: ", allApplications, "Count all applications ceiled: ", allApplicationsCeil);
    let counter = 0;
    for (let i = 0; i <= (allApplicationsCeil); i = i + 100) {
        counter++;
        console.log("Page counter: ", counter);
        console.log("Items counter: ", i);
        const buttonExists = await checkButonExists();
        if (buttonExists > 0) {
            await sleep(2000);
            await clickButton();
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function checkButonExists() {
        return await page.evaluate(function () {
            return $("#button-load-extra-requests").length;
        });
    }

    async function clickButton() {
        console.log("=click button");
        return await page.evaluate(function () {
            $("#button-load-extra-requests").click();
        });
    }

    async function getCountAll() {
        return await page.evaluate(function () {
            return parseInt($("#offer-requests-count").text());
        });
    }

    console.log("Page load status: ", status);
    const content = await page.property('content');

    let $ = cheerio.load(content);

    const abiturientsData = [];

    $('#offer-requests-body').find('.offer-request').each((i, element) => {
        let name = $(element).children('.offer-request-fio').children('span').text();
        let status = $(element).children('.offer-request-status').children('span').text();
        let priority = parseFloat($(element).children('.offer-request-pr').children('span').text());
        let points = parseFloat($(element).children('.offer-request-kb').children('span').first().text());

        let subjectsEl = $(element).children('.offer-subjects');

        const subjectsData = [];
        subjectsEl.find('div').not('.olimp').not('.coeff').each((j, el) => {
            let points = parseFloat($(el).find('.ball').text());
            subjectsData.push({
                name: $(el).find('.subject-name').text(),
                points: !isNaN(points) ? points : null,
            });
        });

        let olimp = 0;
        let olimpEl = $(subjectsEl).find('.olimp');
        if (olimpEl.length > 0) {
            olimp = parseFloat(olimpEl.find('.ball').text());
        }

        let coefficient = 1.0;
        let coefficientEl = $(subjectsEl).find('.coeff');
        if (coefficientEl.length > 0) {
            coefficient = parseFloat(coefficientEl.find('.ball').text());
        }

        abiturientsData.push({
            name,
            status,
            priority,
            points,
            olimp,
            coefficient,
            subjects: subjectsData,
        });
    });

    console.log("Abiturients saved: ", abiturientsData.length);

    try {
        console.log("Removing old items...");
        await Abiturient.destroy({
            where: {
                uidSpeciality: specialityParam,
            },
        });
    }
    catch (err) {
        console.log("err drop DB", err);
    }

    try {
        let i = 0;

        const university = await University.findOne({
            where: {"externalId": specialityParam}
        });

        for (let ab of abiturientsData) {
            i++;
            if (i % 50 === 0) {
                console.log(`Saving item ${i} from ${abiturientsData.length}`);
            }

            const dbResponse = await Abiturient.create({
                name: ab.name,
                status: ab.status,
                priority: !isNaN(ab.priority) ? ab.priority : null,
                points: !isNaN(ab.points) ? ab.points : null,
                olimp: !isNaN(ab.olimp) ? ab.olimp : null,
                coefficient: !isNaN(ab.coefficient) ? ab.coefficient : null,
                uidSpeciality: specialityParam,
                UniversityId: university.id,
                AbiturientSubjects: ab.subjects
            }, {
                include: [AbiturientSubjects]
            });
        }
    }
    catch (err) {
        console.log("err DB", err);
    }

    const fileName = `abiturients_${specialityParam}.json`;
    fs.writeFile(`data/${fileName}`, JSON.stringify(abiturientsData, null, 4), function (err) {
        if (err) {
            return console.log("Error occurred while saving file: ", err);
        }
        console.log(`The file ${fileName} was successfully saved!`);
    });

    await instance.exit();
}());