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

    describe("#renderUnsorted", function () {
        it("renders unsorted content", function () {
            var unsortedOrigin = attachPoint.querySelector(".unsorted .origin .addresses"),
                unsortedDestinations = attachPoint.querySelector(".unsorted .destinations .addresses");

            expect(unsortedOrigin.childNodes.length).toEqual(0);
            expect(unsortedDestinations.childNodes.length).toEqual(0);

            new GeocodingView(attachPoint, GoogleMapsHelper.origin, GoogleMapsHelper.destinations);

            expect(unsortedOrigin.childNodes.length).toEqual(1);
            expect(unsortedOrigin.childNodes[0].innerHTML).toEqual("510 Victoria, Venice, CA");
            expect(unsortedDestinations.childNodes.length).toEqual(7);
            expect(unsortedDestinations.childNodes[0].innerHTML).toEqual("Times Square, Manhattan, NY 10036");
            expect(unsortedDestinations.childNodes[1].innerHTML).toEqual("13000 S Dakota 244, Keystone, SD 57751");
            expect(unsortedDestinations.childNodes[2].innerHTML).toEqual("1600 Pennsylvania Ave NW, Washington, DC 20500");
            expect(unsortedDestinations.childNodes[3].innerHTML).toEqual("Golden Gate Bridge, San Francisco, CA 94129");
            expect(unsortedDestinations.childNodes[4].innerHTML).toEqual("Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom");
            expect(unsortedDestinations.childNodes[5].innerHTML).toEqual("Great Wall of China");
            expect(unsortedDestinations.childNodes[6].innerHTML).toEqual("Hollywood Sign, Los Angeles, CA");
        });
    });

    describe("#renderSorted", function () {
        it("renders sorted content", function () {
            var sortedDestinations = attachPoint.querySelector(".sorted .destinations .addresses"),
                geocodingView;

            spyOn(Geocoding.Location.prototype, "computeDistanceBetween").and.callFake(function (location) {
                return GoogleMapsHelper.distances[location.location()];
            });

            expect(sortedDestinations.childNodes.length).toEqual(0);

            geocodingView = new GeocodingView(attachPoint, GoogleMapsHelper.origin, GoogleMapsHelper.destinations);
            geocodingView._sortButtonClicked();

            expect(sortedDestinations.childNodes.length).toEqual(7);
            expect(sortedDestinations.childNodes[0].innerHTML).toEqual("Hollywood Sign, Los Angeles, CA");
            expect(sortedDestinations.childNodes[1].innerHTML).toEqual("Golden Gate Bridge, San Francisco, CA 94129");
            expect(sortedDestinations.childNodes[2].innerHTML).toEqual("13000 S Dakota 244, Keystone, SD 57751");
            expect(sortedDestinations.childNodes[3].innerHTML).toEqual("1600 Pennsylvania Ave NW, Washington, DC 20500");
            expect(sortedDestinations.childNodes[4].innerHTML).toEqual("Times Square, Manhattan, NY 10036");
            expect(sortedDestinations.childNodes[5].innerHTML).toEqual("Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom");
            expect(sortedDestinations.childNodes[6].innerHTML).toEqual("Great Wall of China");

        });
    });
});