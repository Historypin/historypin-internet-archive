'use strict';

/**
 * @link http://v76-beta-1.historypin-hrd.appspot.com/resources/docs/api/site/items/details/index.html
 *
 * @param {string} project
 * @param {number} id
 *
 * @returns {{}}
 */
function getPinDetailRequestOptions( project, id ) {
  var request_options = {};

  request_options.api_endpoint = 'get-pin';
  request_options.project = project;

  request_options.qs = {
    id: id,
    project: project
  };

  return request_options;
}

module.exports = getPinDetailRequestOptions;
