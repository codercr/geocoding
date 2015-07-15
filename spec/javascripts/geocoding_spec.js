describe("Geocoding", function () {

    var gencodeSpy;

    beforeEach(function(){
        gencodeSpy = spyOn(Geocoding.geocoder, "geocode").and.callFake(function (query, callback) {
            callback.apply(this, GoogleMapsHelper.responses[query.address])
        });
    });

    describe(".geocoder", function () {
        it("returns an instance of google.maps.Geocoder", function() {
            expect(typeof Geocoding.geocoder).toEqual("object");
            expect(Geocoding.geocoder instanceof google.maps.Geocoder).toBeTruthy()
        });
    });

    describe("#initialize", function () {
        it("requires params origin string and destinations array", function () {
            var expectFunc = function () {
                new Geocoding("origin", ["destinations"]);
            };

            expect(expectFunc).not.toThrowError();
        });

        describe("param origins", function () {
            it("throw exception when origin is not a string", function () {
                var expectFunc = function () {
                    new Geocoding(["origins"], ["destinations"]);
                };

                expect(expectFunc).toThrowError(TypeError, "Parameter origin requires a string");
            });
        });

        describe("param destinations", function () {
            it("throw exception when destinations is not an array", function () {
                var expectFunc = function () {
                    new Geocoding("origins", "destinations");
                };

                expect(expectFunc).toThrowError(TypeError, "Parameter destinations requires an array");
            });
        });

        describe("origin and destination loading", function() {
            it("loads location instances", function() {
                var geocoding = new Geocoding("origin", ["destinations"]);
                expect(gencodeSpy.calls.count()).toEqual(2);
                expect(geocoding._origin instanceof Geocoding.Location).toBeTruthy();
                expect(geocoding._destinations[0] instanceof Geocoding.Location).toBeTruthy();
                expect(geocoding._status).toEqual("loaded");
            });
        });
    });

    describe("#origin", function () {
        it("returns origin string", function () {
            var geocoding = new Geocoding("origin", ["destinations"]);

            expect(geocoding.origin()).toEqual("origin");
        });
    });

    describe("#destinations", function () {
        it("returns destinations array", function () {
            var geocoding = new Geocoding("origins", ["destinations"]);

            expect(geocoding.destinations()).toEqual(["destinations"]);
        });
    });



    describe("#destinationsOrderedByDistance", function () {
        it("returns destinations ordered by distance", function () {
            var geocoding = new Geocoding(GoogleMapsHelper.origin, GoogleMapsHelper.destinations);

            spyOn(Geocoding.Location.prototype, "computeDistanceBetween").and.callFake(function (location) {
                return GoogleMapsHelper.distances[location.location()];
            });

            expect(geocoding.destinationsOrderedByDistance()).toEqual([
                "Hollywood Sign, Los Angeles, CA",
                "Golden Gate Bridge, San Francisco, CA 94129",
                "13000 S Dakota 244, Keystone, SD 57751",
                "1600 Pennsylvania Ave NW, Washington, DC 20500",
                "Times Square, Manhattan, NY 10036",
                "Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom",
                "Great Wall of China"
            ]);
        });
    });

});
