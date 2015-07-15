describe("GeocodingView", function () {
    var oParser = new DOMParser(),
        domNode, attachPoint, gencodeSpy;

    beforeEach(function () {
        gencodeSpy = spyOn(Geocoding.geocoder, "geocode").and.callFake(function (query, callback) {
            callback.apply(this, GoogleMapsHelper.responses[query.address]);
        });

        domNode = oParser.parseFromString(window.GeocodingViewHelper.html, "text/xml");
        attachPoint = domNode.querySelector("#geocodingContent");
    });

    describe("#initialize", function () {
        it("requires attachPoint, origin, and destinations parameters", function () {
            var expectFunc = function () {
                new GeocodingView(attachPoint, "origins", ["destinations"]);
            };

            expect(expectFunc).not.toThrowError();
        });

        describe("param attachPoint", function () {
            it("throw exception when location is not a string", function () {
                var expectFunc = function () {
                    new GeocodingView("", "origins", ["destinations"]);
                };

                expect(expectFunc).toThrowError(TypeError, "Parameter attachPoint requires a DOM element");
            });
        });

        describe("param origins", function () {
            it("throw exception when origin is not a string", function () {
                var expectFunc = function () {
                    new GeocodingView(attachPoint, ["origins"], ["destinations"]);
                };

                expect(expectFunc).toThrowError(TypeError, "Parameter origin requires a string");
            });
        });

        describe("param destinations", function () {
            it("throw exception when destinations is not an array", function () {
                var expectFunc = function () {
                    new GeocodingView(attachPoint, "origins", "destinations");
                };

                expect(expectFunc).toThrowError(TypeError, "Parameter destinations requires an array");
            });
        });
    });
});