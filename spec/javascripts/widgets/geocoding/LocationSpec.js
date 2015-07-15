describe("Geocoding.Location", function () {

    var gencodeSpy;

    beforeEach(function(){
        gencodeSpy = spyOn(Geocoding.geocoder, "geocode").and.callFake(function (query, callback) {
            callback.apply(this, GoogleMapsHelper.responses[query.address])
        });
    });

    describe("#initialize", function () {
        it("requires params location and load", function () {
            var expectFunc = function () {
                new window.Geocoding.Location("an address", function () {
                });
            };

            expect(expectFunc).not.toThrowError();
        });

        describe("param location", function () {
            it("throw exception when location is not a string", function () {
                var expectFunc = function () {
                    new window.Geocoding.Location(["an address"], function () {
                    });
                };

                expect(expectFunc).toThrowError(TypeError, "Parameter location requires a string");
            });
        });

        describe("param load", function () {
            it("throw exception when load is not a function", function () {
                var expectFunc = function () {
                    new window.Geocoding.Location("an address", "");
                };

                expect(expectFunc).toThrowError(TypeError, "Parameter load requires a function");
            });
        });

        describe("location geocode", function () {
            it("fetches geocode from google maps", function () {
                var callback = jasmine.createSpy('callback'),
                    location = new window.Geocoding.Location("510 Victoria, Venice, CA", callback);

                expect(gencodeSpy).toHaveBeenCalledWith({address: "510 Victoria, Venice, CA"}, jasmine.any(Function));

                expect(callback).toHaveBeenCalledWith(location);

                // Must make sure geocode tests of the first object of array.
                expect(location.geocode).toEqual(GoogleMapsHelper.responses["510 Victoria, Venice, CA"][0][0]);
                expect(location.status).toEqual(GoogleMapsHelper.responses["510 Victoria, Venice, CA"][1]);
            });
        });
    });

    describe("#location", function () {
        it("returns origin string", function () {
            var location = new window.Geocoding.Location("an address", function () {
            });

            expect(location.location()).toEqual("an address");
        });
    });

    describe("#computeDistanceBetween", function() {
        it("computes the distance between self and pass in location", function() {
            var callback = jasmine.createSpy('callback'),
                location = new window.Geocoding.Location("510 Victoria, Venice, CA", callback),
                location2 = new window.Geocoding.Location("510 Victoria, Venice, CA", callback);

            spyOn(google.maps.geometry.spherical, "computeDistanceBetween").and.returnValue(1);

            expect(location.computeDistanceBetween(location)).toEqual(1);
            expect(location.computeDistanceBetween(location)).toEqual(1);

            expect(google.maps.geometry.spherical.computeDistanceBetween.calls.count()).toEqual(1);
            expect(google.maps.geometry.spherical.computeDistanceBetween)
                .toHaveBeenCalledWith(location.geocode.geometry.location, location2.geocode.geometry.location)
        });
    });

});
