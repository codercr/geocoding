(function () {
    var createSortButtonCallback = function createSortButtonCallback(geocodingView) {
            return function () {
                geocodingView._sortButtonClicked();
            }
        },
        createGeocodeCallback = function createGeocodeCallback(geocodingView) {
            return function (geocoding) {
                geocodingView._geocoding = geocoding;
                geocodingView._renderSorted();
            }
        },
        GeocodingView = function GeocodingView(attachPoint, origin, destinations) {

            if (!(typeof attachPoint === "object" && attachPoint instanceof Element)) {
                throw new TypeError("Parameter attachPoint requires a DOM element");
            }

            if (!(typeof origin === "string")) {
                throw new TypeError("Parameter origin requires a string");
            }

            if (!(typeof destinations === "object" && destinations instanceof Array)) {
                throw new TypeError("Parameter destinations requires an array");
            }

            this._origin = origin;
            this._destinations = destinations;

            // Unsorted Origin Address Node
            this._unsortedOriginNode = attachPoint.querySelector(".unsorted .origin .addresses");

            // Unsorted Destinations Address Node
            this._unsortedDestinationsNode = attachPoint.querySelector(".unsorted .destinations .addresses");

            // Sorted Destinations Address Node
            this._sortedDestinationsNode = attachPoint.querySelector(".sorted .destinations .addresses");

            // sortButton Node
            this._sortButtonNode = attachPoint.querySelector(".sortButton button");

            // Add sortButon click event listener
            this._sortButtonNode.addEventListener("click", createSortButtonCallback(this));

            this._renderUnsorted();

            return this;
        };

    GeocodingView.prototype._renderUnsorted = function _renderUnsorted() {
        this._createAndAppendUnsortedOrigin();
        this._createAndAppendUnsortedDestinations();
    };

    GeocodingView.prototype._createAndAppendUnsortedOrigin = function _createAndAppendUnsortedOrigin() {
        var addressElement = this._createAddressElement(this._origin);
        this._unsortedOriginNode.appendChild(addressElement);
    };

    GeocodingView.prototype._createAndAppendUnsortedDestinations = function _createAndAppendUnsortedDestinations() {
        var destinations = this._destinations,
            addressElement, i;

        for (i = 0; i < destinations.length; i++) {
            addressElement = this._createAddressElement(destinations[i]);
            this._unsortedDestinationsNode.appendChild(addressElement);
        }

    };

    GeocodingView.prototype._sortButtonClicked = function _sortButtonClicked() {
        // Geocoding library
        new Geocoding(this._origin, this._destinations, createGeocodeCallback(this));
    };

    GeocodingView.prototype._renderSorted = function _renderSorted() {
        this._createAndAppendSortedDestinations();
    };

    GeocodingView.prototype._createAndAppendSortedDestinations = function _createAndAppendSortedDestinations() {
        var destinations = this._geocoding.destinationsOrderedByDistance(),
            addressElement, i;

        for (i = 0; i < destinations.length; i++) {
            addressElement = this._createAddressElement(destinations[i]);
            this._sortedDestinationsNode.appendChild(addressElement);
        }

    };

    GeocodingView.prototype._createAddressElement = function _createAddressElement(address) {
        var addressElement = document.createElement("div");

        addressElement.innerHTML = address;

        return addressElement;
    };

    window.GeocodingView = GeocodingView;
})();