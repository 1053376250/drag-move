const Left = require('./lib/core/left');
const Right = require('./lib/core/right')
module.exports = function (options) {

    if (options.benchmark == 'right') {
        return new Right(options);
    }
    return new Left(options);
}