(function () {
    var sortCompare = function sortCompare(a,b) {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            // a must be equal to b
            return 0;
        },
        // Create Geocoding.Location instance
        createLocation = function createLocation(geocoding, location) {
            // Set to loading since we are only calling this if we create a callback.
            geocoding._status = "loading";
            geocoding._loading_counter += 1;

            return new Geocoding.Location(location, createLocationCallback(geocoding));
        },
        // Create callback for Geocoding.Location instance
        createLocationCallback = function createLocationCallback(geocoding) {
            return function () {
                // Attempt to set status to loaded when counter gets to 0.
                geocoding._loading_counter -= 1;

                if (geocoding._loading_counter === 0 && geocoding._status === "loading") {
                    geocoding._status = "loaded";
                }
            }
        },
        // Geocoding class
        Geocoding = function Geocoding(origin, destinations) {
            if (!(typeof origin === "string")) {
                throw new TypeError("Parameter origin requires a string");
            }

            if (!(typeof destinations === "object" && destinations instanceof Array)) {
                throw new TypeError("Parameter destinations requires an array");
            }

            // Set status to loading
            this._status = "loading";

            // Initialize loading counter to keep track of the number of locations fetched.
            this._loading_counter = 0;

            // Set origin location
            this._origin = createLocation(this, origin);

            this._destinations = [];

            // Set destination locations
            for (var i = 0; i < destinations.length; i++) {
                this._destinations[i] = createLocation(this, destinations[i]);
            }

            return this;
        };

    Geocoding.geocoder = new window.google.maps.Geocoder();

    Geocoding.prototype.origin = function origin() {
        return this._origin.location();
    };

    Geocoding.prototype.destinations = function destinations() {
        var results = [];

        for (var i = 0; i < this._destinations.length; i++) {
            results[i] = this._destinations[i].location();
        }

        return results;
    };

    Geocoding.prototype.destinationsOrderedByDistance = function destinationsOrderedByDistance() {
        var map = {},
            result = [],
            i;

        // Map locations to distances
        // We should consider sorting distances as we generate them.
        for (i = 0; i < this._destinations.length; i++) {
            result[i] = this._origin.computeDistanceBetween(this._destinations[i]);
            map[result[i]] = this._destinations[i].location();
        }

        // Sort distances
        result = result.sort(sortCompare);

        // Replace distance with location through map
        for (i = 0; i < result.length; i++) {
            result[i] = map[result[i]];
        }

        return result;
    };

    window.Geocoding = Geocoding;
})();
