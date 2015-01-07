module.exports = function(context) {

    return function(selection) {
        var layers;

        if (!(/a\.tiles\.mapbox.com/).test(L.mapbox.config.HTTP_URL)) {
            layers = [{
                title: 'Mapbox',
                layer: L.mapbox.tileLayer('mapbox.osm-bright')
            }, {
                title: 'Mapbox Outdoors',
                layer: L.mapbox.tileLayer('mapbox.mapbox-outdoors')
            }, {
                title: 'Satellite',
                layer: L.mapbox.tileLayer('mapbox.satellite-full')
            }];

        } else {
            layers = [{
                title: 'Mapbox',
                layer: L.mapbox.tileLayer('tmcw.map-7s15q36b')
            }, {
                title: 'Satellite',
                layer: L.mapbox.tileLayer('tmcw.map-j5fsp01s')
            }, {
                title: 'OSM',
                layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            }];
        }
        L.control.layers({},{
            'Cities': L.mapbox.tileLayer('atlregional.7gvw8kt9'),
            'LCI Areas': L.mapbox.tileLayer('atlregional.g4jnstt9'),
            // 'NHS': L.mapbox.tileLayer('atlregional.b5ac8dd2'),
            // 'Truck Routes': L.mapbox.tileLayer('atlregional.baa80cee'),
            'Priority Networks (NHS - Green; Trucks - Red; Concept 3 - Blue)': L.mapbox.tileLayer('atlregional.2b595b3d')
        }).addTo(context.map);
        // layers.push({
        //     title: 'Cities',
        //     layer: L.mapbox.tileLayer('atlregional.7gvw8kt9')
        // });
        // layers.push({
        //     title: 'LCI Areas',
        //     layer: L.mapbox.tileLayer('atlregional.g4jnstt9')
        // });
        var layerSwap = function(d) {
            var clicked = this instanceof d3.selection ? this.node() : this;
            layerButtons.classed('active', function() {
                return clicked === this;
            });
            layers.forEach(swap);
            function swap(l) {
                var datum = d instanceof d3.selection ? d.datum() : d;
                if (l.layer == datum.layer) context.map.addLayer(datum.layer);
                else if (context.map.hasLayer(l.layer)) context.map.removeLayer(l.layer);
            }
        };

        var layerButtons = selection.append('div')
            .attr('class', 'layer-switch')
            .selectAll('button')
            .data(layers)
            .enter()
            .append('button')
            .attr('class', 'pad0x')
            .on('click', layerSwap)
            .text(function(d) { return d.title; });

        layerButtons.filter(function(d, i) { return i === 0; }).call(layerSwap);

    };
};

