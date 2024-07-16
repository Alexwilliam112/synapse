'use strict'
const { Op } = require('sequelize');
const { Eventlogs } = require('../models')

class MainController {

    static async read(req, res, next) {
        try {
            let { startDate, endDate } = req.query

            if (!startDate) {
                startDate = new Date('1000-01-01')
            }

            if (!endDate) {
                endDate = new Date('3000-01-01')
            }
            console.log(startDate);

            const data = await Eventlogs.findAll({
                where: {
                    timestamp: {
                        [Op.between]: [new Date(startDate), new Date(endDate)]
                    }
                }
            })
            res.status(200).json({
                data: data
            })

        } catch (err) {
            next(err)
        }
    }
}
module.exports = MainController