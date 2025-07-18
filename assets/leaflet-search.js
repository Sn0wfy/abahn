/*!
 * Leaflet.Control.Search 2.9.7 - MIT License
 * https://github.com/stefanocudini/leaflet-search
 */
L.Control.Search = L.Control.extend({
    options: {
        layer: null,
        propertyName: 'name',
        marker: false,
        autoType: true,
        minLength: 1,
        textErr: 'Nicht gefunden',
        textPlaceholder: 'Suchen...',
    },

    initialize: function(options) {
        L.Control.prototype.initialize.call(this, options);
        this._layer = options.layer;
    },

    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-search-control');
        var input = L.DomUtil.create('input', '', container);
        input.type = 'text';
        input.placeholder = this.options.textPlaceholder;

        L.DomEvent.on(input, 'keyup', L.Util.bind(function(e) {
            var val = e.target.value;
            if (val.length >= this.options.minLength) this._search(val);
        }, this));

        this._map = map;
        return container;
    },

    _search: function(text) {
        var layer = this._layer;
        var found = false;
        layer.eachLayer(function(marker) {
            var prop = marker.feature.properties[this.options.propertyName];
            if (prop && prop.toLowerCase() === text.toLowerCase()) {
                this._map.setView(marker.getLatLng(), 15);
                marker.openPopup();
                found = true;
            }
        }, this);

        if (!found && this.options.textErr) {
            alert(this.options.textErr);
        }
    }
});

if (typeof module !== 'undefined') {
    module.exports = L.Control.Search;
}
