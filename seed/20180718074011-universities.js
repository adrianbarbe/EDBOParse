'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Universities',
            [
                {
                    id: 1,
                    name: 'НАЦІОНАЛЬНИЙ МЕДИЧНИЙ УНІВЕРСИТЕТ ІМЕНІ О.О. БОГОМОЛЬЦЯ',
                    externalId: 437191,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 2,
                    name: 'ВІННИЦЬКИЙ НАЦІОНАЛЬНИЙ МЕДИЧНИЙ УНІВЕРСИТЕТ ІМ. М. І. ПИРОГОВА',
                    externalId: 444233,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 3,
                    name: 'ДНІПРОПЕТРОВСЬКА МЕДИЧНА АКАДЕМІЯ МІНІСТЕРСТВА ОХОРОНИ ЗДОРОВ\'Я УКРАЇНИ',
                    externalId: 448722,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 4,
                    name: 'ІВАНО-ФРАНКІВСЬКИЙ НАЦІОНАЛЬНИЙ МЕДИЧНИЙ УНІВЕРСИТЕТ',
                    externalId: 466697,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 5,
                    name: 'ТЕРНОПIЛЬСЬКИЙ ДЕРЖАВНИЙ МЕДИЧНИЙ УНІВЕРСИТЕТ IМЕНI I.Я. ГОРБАЧЕВСЬКОГО',
                    externalId: 437806,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 6,
                    name: 'БУКОВИНСЬКИЙ ДЕРЖАВНИЙ МЕДИЧНИЙ УНІВЕРСИТЕТ',
                    externalId: 442756,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 7,
                    name: 'ЛЬВІВСЬКИЙ НАЦІОНАЛЬНИЙ МЕДИЧНИЙ УНІВЕРСИТЕТ ІМЕНІ ДАНИЛА ГАЛИЦЬКОГО',
                    externalId: 441134,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 8,
                    name: 'ОДЕСЬКИЙ НАЦІОНАЛЬНИЙ МЕДИЧНИЙ УНІВЕРСИТЕТ',
                    externalId: 451004,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 9,
                    name: 'ХАРКІВСЬКИЙ НАЦІОНАЛЬНИЙ МЕДИЧНИЙ УНІВЕРСИТЕТ',
                    externalId: 463710,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
            , {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('University', null, {});
    }
};