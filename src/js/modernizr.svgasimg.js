/*
 * Part of MZP.CZ Redesign Project
 * @author Lukas Vorlicek <lukas.vorlicek@codeart.cz>
 * @copyright Copyright (c) 2014 Ministry of the Environment of the Czech Republic
 * @licence CC BY-NC-ND 3.0 CZ
 */

/*global Modernizr:false, document:false*/

Modernizr.addTest('svgasimg', function () {
    return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
});