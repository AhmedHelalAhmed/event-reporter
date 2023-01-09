var HELPERS = (function (namespace) {
    const executeWait = function (callback, wait) {
        let timeout,
            callNow = true;

        return function () {
            const thisVal = this,
                args = arguments;

            const later = function () {
                callNow = true;
            };
            if (callNow) {
                callNow = false;
                callback.apply(thisVal, args);
                timeout = setTimeout(later, wait);
            }
        };
    };
    // properties and public methods
    namespace.executeWait = executeWait;
    return namespace
})(HELPERS || {});
