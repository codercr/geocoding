// Stub out google object
if (typeof window.google === "undefined") {
    window.google = {
        maps: {
            Geocoder: function Geocoder() {
                this.geocode = function () {
                };
                return this;
            },
            geometry: {
                spherical: {
                    computeDistanceBetween: function Geocoder() {
                    }
                }
            }
        }
    };

    var GoogleMapsHelper = {
        origin: "510 Victoria, Venice, CA",
        destinations: [
            "Times Square, Manhattan, NY 10036",
            "13000 S Dakota 244, Keystone, SD 57751",
            "1600 Pennsylvania Ave NW, Washington, DC 20500",
            "Golden Gate Bridge, San Francisco, CA 94129",
            "Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom",
            "Great Wall of China",
            "Hollywood Sign, Los Angeles, CA"
        ],
        distances: {
            "510 Victoria, Venice, CA": 0,
            "Hollywood Sign, Los Angeles, CA": 100,
            "Times Square, Manhattan, NY 10036": 4000,
            "13000 S Dakota 244, Keystone, SD 57751": 3000,
            "1600 Pennsylvania Ave NW, Washington, DC 20500": 3500,
            "Golden Gate Bridge, San Francisco, CA 94129": 600,
            "Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom": 6000,
            "Great Wall of China": 7000
        },
        responses: {
            "510 Victoria, Venice, CA": [
                [{
                    "formatted_address": "510 Victoria Avenue, Venice, CA 90291, USA",
                    "geometry": {
                        "location": {"A": 33.9882332, "F": -118.45908609999998},
                        "location_type": "ROOFTOP",
                        "viewport": {
                            "za": {"A": 33.9868842197085, "j": 33.9895821802915},
                            "ra": {"j": -118.46043508029152, "A": -118.4577371197085}
                        }
                    },
                    "partial_match": true,
                    "place_id": "ChIJp583nJa6woARSHewReSX6MU",
                    "types": ["street_address"]
                }],
                "OK"
            ],
            "Hollywood Sign, Los Angeles, CA": [
                [{
                    "formatted_address": "Hollywood Sign, Los Angeles, CA 90068, USA",
                    "geometry": {
                        "location": {"A": 34.1341151, "F": -118.3215482},
                        "location_type": "APPROXIMATE",
                        "viewport": {
                            "za": {"A": 34.1327661197085, "j": 34.1354640802915},
                            "ra": {"j": -118.32289718029153, "A": -118.32019921970851}
                        }
                    },
                    "place_id": "ChIJfVpQRQq_woARQ5hwJsast6s",
                    "types": ["point_of_interest", "establishment"]
                }],
                "OK"
            ],
            "Times Square, Manhattan, NY 10036": [
                [{
                    "formatted_address": "Theater District, New York, NY, USA",
                    "geometry": {
                        "bounds": {
                            "za": {"A": 40.75373, "j": 40.7641791},
                            "ra": {"j": -73.99088219999999, "A": -73.9790779}
                        },
                        "location": {"A": 40.759011, "F": -73.98447220000003},
                        "location_type": "APPROXIMATE",
                        "viewport": {
                            "za": {"A": 40.75373, "j": 40.7641791},
                            "ra": {"j": -73.99088219999999, "A": -73.9790779}
                        }
                    },
                    "place_id": "ChIJgzD7uFVYwokRXCoEdvGu-aA",
                    "types": ["neighborhood", "political"]
                }],
                "OK"
            ],
            "13000 S Dakota 244, Keystone, SD 57751": [
                [{
                    "formatted_address": "Black Hills National Forest, 13000 South Dakota 244, Keystone, SD 57751, USA",
                    "geometry": {
                        "location": {"A": 43.8765683, "F": -103.45465280000002},
                        "location_type": "ROOFTOP",
                        "viewport": {
                            "za": {"A": 43.8752193197085, "j": 43.8779172802915},
                            "ra": {"j": -103.4560017802915, "A": -103.45330381970848}
                        }
                    },
                    "place_id": "ChIJG-v9jNc1fYcRGfm9xqXjg9U",
                    "types": ["street_address"]
                }],
                "OK"
            ],
            "1600 Pennsylvania Ave NW, Washington, DC 20500": [
                [{
                    "formatted_address": "1600 Pennsylvania Avenue Northwest, Washington, DC 20500, USA",
                    "geometry": {
                        "location": {"A": 38.89767579999999, "F": -77.03648269999997},
                        "location_type": "ROOFTOP",
                        "viewport": {
                            "za": {"A": 38.8963268197085, "j": 38.8990247802915},
                            "ra": {"j": -77.0378316802915, "A": -77.03513371970848}
                        }
                    },
                    "place_id": "ChIJcw5BAI63t4kRj5qZY1MSyAo",
                    "types": ["street_address"]
                }],
                "OK"
            ],
            "Golden Gate Bridge, San Francisco, CA 94129": [
                [{
                    "formatted_address": "Golden Gate Bridge, San Francisco, CA 94129, USA",
                    "geometry": {
                        "location": {"A": 37.807485, "F": -122.47490399999998},
                        "location_type": "APPROXIMATE",
                        "viewport": {
                            "za": {"A": 37.8061360197085, "j": 37.8088339802915},
                            "ra": {"j": -122.47625298029152, "A": -122.4735550197085}
                        }
                    },
                    "place_id": "ChIJi8B4BOyGhYARRIEvOShpy7A",
                    "types": ["bus_station", "transit_station", "point_of_interest", "establishment"]
                }],
                "OK"
            ],
            "Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom": [
                [{
                    "formatted_address": "Stonehenge, Amesbury, Wiltshire SP4 7DE, UK",
                    "geometry": {
                        "location": {"A": 51.1788823, "F": -1.8262154999999893},
                        "location_type": "APPROXIMATE",
                        "viewport": {
                            "za": {"A": 51.1775333197085, "j": 51.18023128029149},
                            "ra": {"j": -1.8275644802914712, "A": -1.8248665197085074}
                        }
                    },
                    "partial_match": true,
                    "place_id": "ChIJEfYKhTvmc0gR3dLTvOJwkZc",
                    "types": ["point_of_interest", "establishment"]
                }],
                "OK"
            ],
            "Great Wall of China": [
                [{
                    "formatted_address": "Great Wall, Gulang, Wuwei, Gansu, China",
                    "geometry": {
                        "location": {"A": 37.48576, "F": 103.45612800000004},
                        "location_type": "APPROXIMATE",
                        "viewport": {
                            "za": {"A": 37.4844110197085, "j": 37.4871089802915},
                            "ra": {"j": 103.45477901970844, "A": 103.45747698029152}
                        }
                    },
                    "partial_match": true,
                    "place_id": "ChIJCT_c9zNhTzYRUUmuJ4U4bPs",
                    "types": ["point_of_interest", "establishment"]
                }],
                "OK"
            ]
        }
    };

    window.GoogleMapsHelper = GoogleMapsHelper;
}
