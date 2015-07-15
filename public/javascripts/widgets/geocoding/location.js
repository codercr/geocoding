(function () {

    var fetchGeocode = function fetchGeocode(address, callback) {
            Geocoding.geocoder.geocode({address: address}, function (results, status) {
                callback(results, status);
            });
        },
        createGeocodeCallback = function createGeocodeCallback(location, load) {
            return function (results, status) {
                location.status = status;

                if (status === "OK") {
                    location.geocode = results[0];
                }

                load(location);
            };
        },
        Location = function Location(location, load) {
            if (!(typeof location === "string")) {
                throw new TypeError("Parameter location requires a string");
            }

            if (!(typeof load === "function")) {
                throw new TypeError("Parameter load requires a function");
            }

            this._location = location;

            this.distanceBetween = {};

            fetchGeocode(this._location, createGeocodeCallback(this, load));

            return this;
        };

    Location.prototype.location = function location() {
        return this._location;
    };

    Location.prototype.computeDistanceBetween = function computeDistanceBetween(location) {
        var key = JSON.stringify(location.geocode.geometry.location);

        if (!this.distanceBetween[key]) {
            this.distanceBetween[key] = google.maps.geometry.spherical
                .computeDistanceBetween(this.geocode.geometry.location, location.geocode.geometry.location);
        }

        return this.distanceBetween[key];
    };

    window.Geocoding.Location = Location;
})();
