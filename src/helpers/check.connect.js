'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND = 5000;

//count connect
const countConnect = () => {
    const numConnect = mongoose.connections.length;
    console.log('Number connect', numConnect);
    return numConnect;
}


// check over load
const checkOverLoad = () => {
    setInterval(() => {
        const numConnect = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // Example maximum number of connections based on number of cores
        const maxConnect = numCores * 5;

        console.log(`Active connections: ${numConnect}`);
        
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
        
        if (numConnect > maxConnect) {
            console.log('Connection overload');
        }

    }, _SECOND);

}

module.exports = { countConnect, checkOverLoad };