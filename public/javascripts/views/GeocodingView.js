(function () {
    var GeocodingView = function GeocodingView(attachPoint, origin, destinations) {

        if (!(typeof attachPoint === "object" && attachPoint instanceof Element)) {
            throw new TypeError("Parameter attachPoint requires a DOM element");
        }

        if (!(typeof origin === "string")) {
            throw new TypeError("Parameter origin requires a string");
        }

        if (!(typeof destinations === "object" && destinations instanceof Array)) {
            throw new TypeError("Parameter destinations requires an array");
        }

        return this;
    };

    window.GeocodingView = GeocodingView;
})();