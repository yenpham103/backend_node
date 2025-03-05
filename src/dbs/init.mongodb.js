'use strict'
const mongoose = require('mongoose');

const {db: {host, port, name}} = require('../configs/config.mongodb');

const connectString = `mongodb://${host}:${port}/${name}`;

console.log(connectString);


class Database {
    constructor() {
        this.connect()
    }
    connect(type = 'mongodb') {
        // dev
        if(true) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose.connect(connectString, {
            maxPoolSize: 50  // Nếu quá ==> thì thằng sau sẽ phải xếp hàng chờ ==> Bh có thằng nào free thì thằng chờ tiếp tục
        }).then(() => {
            console.log('Connected to MongoDB successfully');
        }).catch((error) => {
            console.log("Cannot connect to MongoDB", error);
        })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb