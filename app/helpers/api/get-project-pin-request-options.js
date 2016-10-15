'use strict';

/**
 * recommendation from historypin devs to use this call to quickly retrieve a list of all pins for
 * a project. the object returned from the call has the following format:
 *
 * {
 *   limit: {number},
 *   count: {number},
 *   items: [
 *     [
 *       {number.<pinid>},
 *       {number.<lat>}
 *       {number.<lon>}
 *     ]
 *     ...
 *   ]
 * }
 *
 * @link http://v76-beta-1.historypin-hrd.appspot.com/resources/docs/api/site/items/map/index.html
 *
 * @param {Object} batch_job
 * @returns {{}}
 */
function getProjectPinRequestOptions( batch_job ) {
  var request_options = {};

  batch_job.pins.page += 1;

  request_options.api_endpoint = 'get-map';
  request_options.project = batch_job.project;

  request_options.qs = {
    project: batch_job.project,
    search: 'pin:pin',
    page: batch_job.pins.page,
    limit: batch_job.pins.limit
  };

  return request_options;
}

module.exports = getProjectPinRequestOptions;
