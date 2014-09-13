/*
 * Part of MZP.CZ Redesign Project
 * @author Lukas Vorlicek <lukas.vorlicek@codeart.cz>
 * @copyright Copyright (c) 2014 Ministry of the Environment of the Czech Republic
 * @licence CC BY-NC-ND 3.0 CZ
 */

/*global require:false*/

const PORT =  8088;
const ROOT = 'dist';
const SERVER = process.argv[2] ? process.argv[2] : 'localhost';

var connect = require('connect'),
    serveStatic = require('serve-static'),
    util = require('util');
    
connect().use(serveStatic(ROOT)).listen(PORT, SERVER);

util.puts('> server running at http://' + SERVER + ':' + PORT + ' from ./' + ROOT + '/' );
