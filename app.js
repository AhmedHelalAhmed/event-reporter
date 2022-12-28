var HELPERS = HELPERS || {};
var EVENT_REPORTER_APP = EVENT_REPORTER_APP || {};

(function (namespace) {
    namespace.executeWait = function (callback, wait) {
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
})(HELPERS);


(function (namespace) {
    let content,
        listenersEnabled = false;
    const listeners = [];

    //Write info to the div. Includes event object information
    const loadInfo = function (message, eventObj) {
        content.insertAdjacentHTML("afterbegin", message + " -- event type: " + eventObj.type + " -- target object: " + eventObj.target.nodeName + "<br>");
    };

    //Adds listeners to the document.
    namespace.addListeners = function () {
        const keyDownHandler = function (e) {
            loadInfo("A key was pressed: " + e.keyCode + " -- " + e.key, e);
            if (e.keyCode === 83 && e.ctrlKey) {
                namespace.toggleEventListeners();
            }
        };
        document.addEventListener("keydown", keyDownHandler);
        listeners.push(keyDownHandler, "keydown");


        const clickHandler = function (e) {
            loadInfo("Mouse button was clicked: ", e);
        };
        document.addEventListener("click", clickHandler);
        listeners.push(clickHandler, "click");

        const mouseMoveHandler = HELPERS.executeWait(function (e) {
            loadInfo("Mouse move recorded at coordinates: " + e.pageX + ", " + e.pageY, e);
        }, 500);

        document.addEventListener("mousemove", mouseMoveHandler);
        listeners.push(mouseMoveHandler, "mousemove");

        //Use this structure to add your own events for testing.
        /*var [variableName] = function(e) {
            loadInfo("Mouse button was clicked: ", e);
        };
        document.addEventListener("[event]", [variableName]);
        listeners.push([variableName], "event");*/

        //Once listeners are added, sets this to true for toggle function
        listenersEnabled = true;
        console.log(mouseMoveHandler);
    };

    //Removes listeners from document so user can examine data
    namespace.removeEventListeners = function () {
        while (listeners.length > 0) {
            document.removeEventListener(listeners.pop(), listeners.pop());
        }
    };

    //Called to initialize. Determines whether to add or remove listeners based on current state.
    namespace.toggleEventListeners = function () {
        if (listenersEnabled) {
            namespace.removeEventListeners();
            console.log("Event listeners removed");
        } else {
            namespace.addListeners();
            console.log("Listeners Added");
        }
    };
    window.addEventListener("load", function (eObj) {
        content = document.querySelector("#content");

        //Logs information for document load event.
        loadInfo("Document was loaded: ", eObj);
        //Sets up listeners
        namespace.toggleEventListeners();
    });
})(EVENT_REPORTER_APP);



