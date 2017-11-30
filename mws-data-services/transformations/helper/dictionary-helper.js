import { each, get, filter, find } from 'lodash';

export function dictionaryLookup(dataSource, path) {
    var currentObject = dataSource;
    
    each(_parsePath(path), pathItem => {
        if (pathItem.action === 'find') {
            currentObject = find(currentObject, function (item) {
                return item[pathItem.property] === pathItem.value;
            });
        } else if (pathItem.action === 'get') {
            currentObject = get(currentObject, pathItem.value);
        } else if (pathItem.action === 'filter') {
            currentObject = filter(currentObject, function (item) {
                return item[pathItem.property] === pathItem.value;
            });
        } else if (pathItem.action === 'first') {
            currentObject = currentObject ? currentObject[0] : currentObject;
        } else {
            throw ('Invalid action');
        }
    });
    
    return currentObject;
}

export function dictionaryLookupArray(dataSource, dataMap, dataItems) {
    var returnData = [];

    each(dataItems, dataItemKey => {
        if (dataItemKey === '') {
            returnData.push('');
            return;
        }
        var mapDefinition = dataMap[dataItemKey];
        var path = mapDefinition ? mapDefinition.path : dataItemKey;

        var lookupResult = dictionaryLookup(dataSource, path);

        returnData.push(lookupResult);
    });

    return returnData;
}

function _parsePath(path) {
    var pathItems = [];

    var findPattern = /\[([^\]]+])|\:first/;
    var match = path.match(findPattern);
    while (match) {
        if (match.index > 0) {
            pathItems.push(_getGetPathItem(path.substring(0, match.index)));
            path = path.substring(match.index);
        }

        if (match[0] === ':first') {
            pathItems.push(_getFirstPathItem());
        } else {
            pathItems.push(_getFindPathItem(match[1]));
        }

        path = path.substring(match[0].length);
        match = path.match(findPattern);
    }

    if (path.length > 0) {
        pathItems.push(_getGetPathItem(path));
    }

    return pathItems;
}

function _getGetPathItem(path) {
    return {
        action: 'get',
        value: path.replace(/^\./, "")
    }
}

function _getFindPathItem(path) {
    return {
        action: 'filter',
        property: path.split('=')[0].trim(),
        value: path.split('=')[1].replace(/\]$/, '').trim()
    }
}

function _getFirstPathItem() {
    return {
        action: 'first'
    }
}