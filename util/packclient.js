const path = require('path');
const rimraf = require('rimraf');
const fs = require('fs');
const ncp = require('ncp').ncp;

console.log('Starting packclient...');

const client_indexpage = path.join(__dirname, '../client/index.pack.html');
const client_favicon = path.join(__dirname, '../client/favicon.png');
const client_dist = path.join(__dirname, '../client/dist');
const server_public = path.join(__dirname, '../public/');

console.log(`Client Index Page: ${client_indexpage}`);
console.log(`Server Public: ${server_public}`);
console.log(`Client Dist: ${client_dist}`);

console.log('Cleaning server public...');
rimraf.sync(server_public);

console.log('Making server public...');
fs.mkdirSync(server_public);

console.log('Copying index.html');
fs.copyFileSync(client_indexpage, path.join(server_public, "index.html"));

console.log('Copying favicon.png');
fs.copyFileSync(client_favicon, path.join(server_public, 'favicon.png'));

console.log('Copying Client dist');
ncp(client_dist, path.join(server_public, 'dist'), () => {
    console.log('done');

    process.exit();
})