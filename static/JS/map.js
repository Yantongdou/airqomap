require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Compass",
	"esri/widgets/ScaleBar",
	"esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/core/watchUtils",
    "esri/widgets/BasemapToggle"
],
    (esriConfig, Map, MapView, FeatureLayer, Compass, ScaleBar, Legend, LayerList, watchUtils, BasemapToggle)=> {

    esriConfig.apiKey = AccessToken;

    const map = new Map({
        basemap: "arcgis-navigation"
    });
    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [lon,lat],
        zoom: 15,
        constraints: {
            snapToZoom: false
        }
    });

    const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "arcgis-imagery"
    });
    view.ui.add(basemapToggle,"bottom-left");


    const scalebar = new ScaleBar({
        view:view
		});
    view.ui.add(scalebar,"bottom-left");

    const airqo_renderer = {
        type: "class-breaks",
        field: "Pll_rs_",
        legendOptions: {
            title: "Air Pollution",
            showLegend: false,
        },
        defaultSymbol: {
            type: "simple-fill",
            color: "rgba(50,50,50,0.2)",
            outline: {
                width: 0.5,
                color: "rgba(50,50,50,0.2)"
            }
        },
        defaultLabel: "no data",
        visualVariables: [{
            type: "color",
            field: "Pll_rs_",
            legendOptions: {
                title: " ",
            },
            stops: [
                {value: 0, color: "rgba(50,50,50,0.2)"},
                {value: 0.1, color: "rgba(0,255,85,0.6)", label: "Low"},
                {value: 0.2, color: "rgba(55,255,0,0.6)"},
                {value: 0.3, color: "rgba(136,255,0,0.6)"},
                {value: 0.4, color: "rgba(217,255,0,0.6)"},
                {value: 0.5, color: "rgba(255,230,0,0.6)", label: "Average"},
                {value: 0.6, color: "rgba(255,153,0,0.6)"},
                {value: 0.7, color: "rgba(255,81,0,0.6)"},
                {value: 0.8, color: "rgba(255,51,0,0.6)"},
                {value: 0.9, color: "rgba(255,38,0,0.6)"},
                {value: 1, color: "rgba(255,0,0,0.6)", label: "High"},
            ]
        }],
    };
    const airqo_layer = new FeatureLayer({
        url:"https://services1.arcgis.com/sQOueNHZBxRJjRN3/arcgis/rest/services/relative_pollution/FeatureServer/0",
        renderer: airqo_renderer,
    });

    const MA_0_renderer = {
        type: "class-breaks",
        field: "m__MA_0",
        legendOptions: {
            title: "Relative Market Access for Furniture",
            showLegend: false,
        },
        defaultSymbol: {
            type: "simple-fill",
            color: "rgba(50,50,50,0.2)",
            outline: {
                width: 0.5,
                color: "rgba(50,50,50,0.2)"
            }
        },
        defaultLabel: "no data",
        visualVariables: [{
            type: "color",
            field: "m__MA_0",
            legendOptions: {
                title: " ",
            },
            stops: [
                {value: 0, color: "rgba(50,50,50,0.2)"},
                {value: 0.1, color: "rgba(241,249,255,0.8)", label: "Low"},
                {value: 0.2, color: "rgba(210,241,255,0.8)"},
                {value: 0.3, color: "rgba(167,223,245,0.8)"},
                {value: 0.4, color: "rgba(152,217,243,0.8)"},
                {value: 0.5, color: "rgba(126,190,229,0.8)", label: "Average"},
                {value: 0.6, color: "rgba(104,180,219,0.8)"},
                {value: 0.7, color: "rgba(72,154,205,0.8)"},
                {value: 0.8, color: "rgba(46,146,186,0.8)"},
                {value: 0.9, color: "rgba(20,106,171,0.8)"},
                {value: 1, color: "rgba(0,77,128,0.8)", label: "High"},
            ]
        }],
    };

    const MA_1_renderer = {
        type: "class-breaks",
        field: "m__MA_1",
        legendOptions: {
            title: "Relative Market Access for Welding",
            showLegend: false,
        },
        defaultSymbol: {
            type: "simple-fill",
            color: "rgba(50,50,50,0.2)",
            outline: {
                width: 0.5,
                color: "rgba(50,50,50,0.2)"
            }
        },
        defaultLabel: "no data",
        visualVariables: [{
            type: "color",
            field: "m__MA_1",
            legendOptions: {
                title: " ",
            },
            stops: [
                {value: 0, color: "rgba(50,50,50,0.2)"},
                {value: 0.1, color: "rgba(241,249,255,0.8)", label: "Low"},
                {value: 0.2, color: "rgba(210,241,255,0.8)"},
                {value: 0.3, color: "rgba(167,223,245,0.8)"},
                {value: 0.4, color: "rgba(152,217,243,0.8)"},
                {value: 0.5, color: "rgba(126,190,229,0.8)", label: "Average"},
                {value: 0.6, color: "rgba(104,180,219,0.8)"},
                {value: 0.7, color: "rgba(72,154,205,0.8)"},
                {value: 0.8, color: "rgba(46,146,186,0.8)"},
                {value: 0.9, color: "rgba(20,106,171,0.8)"},
                {value: 1, color: "rgba(0,77,128,0.8)", label: "High"},
            ]
        }],
    };

    const MA_2_renderer = {
        type: "class-breaks",
        field: "m__MA_2",
        legendOptions: {
            title: "Relative Market Access for Maize",
            showLegend: false,
        },
        defaultSymbol: {
            type: "simple-fill",
            color: "rgba(50,50,50,0.2)",
            outline: {
                width: 0.5,
                color: "rgba(50,50,50,0.2)"
            }
        },
        defaultLabel: "no data",
        visualVariables: [{
            type: "color",
            field: "m__MA_2",
            legendOptions: {
                title: " ",
            },
            stops: [
                {value: 0, color: "rgba(50,50,50,0.2)"},
                {value: 0.1, color: "rgba(241,249,255,0.8)", label: "Low"},
                {value: 0.2, color: "rgba(210,241,255,0.8)"},
                {value: 0.3, color: "rgba(167,223,245,0.8)"},
                {value: 0.4, color: "rgba(152,217,243,0.8)"},
                {value: 0.5, color: "rgba(126,190,229,0.8)", label: "Average"},
                {value: 0.6, color: "rgba(104,180,219,0.8)"},
                {value: 0.7, color: "rgba(72,154,205,0.8)"},
                {value: 0.8, color: "rgba(46,146,186,0.8)"},
                {value: 0.9, color: "rgba(20,106,171,0.8)"},
                {value: 1, color: "rgba(0,77,128,0.8)", label: "High"},
            ]
        }],
    };

    const MA_0 = new FeatureLayer({
        visible: true,
        url:"https://services1.arcgis.com/sQOueNHZBxRJjRN3/arcgis/rest/services/relative_market_access_for_furniture/FeatureServer/0",
        renderer: MA_0_renderer,
    });
    const MA_1 = new FeatureLayer({
        visible: true,
        url:"https://services1.arcgis.com/sQOueNHZBxRJjRN3/arcgis/rest/services/relative_market_access_for_welding/FeatureServer/0",
        renderer: MA_1_renderer,
    });
    const MA_2 = new FeatureLayer({
        visible: true,
        url:"https://services1.arcgis.com/sQOueNHZBxRJjRN3/arcgis/rest/services/relative_market_access_for_maize/FeatureServer/0",
        renderer: MA_2_renderer,
    });

    const selected_firm = {
        type: "simple-marker",
        color: "#0062f5",
        outline: {
            color: "rgba(63,122,255,0.5)",
            width: 5
        }
    };

    const FirmRenderer = {
        type: "unique-value",
        legendOptions: {
            title: "Firms",
        },
        field: "login_id",
        uniqueValueInfos: [
            {
                value: firm_id, // code for interstates/freeways
                symbol: selected_firm,
                label: "Your Firm"
            }
        ]
    };

    const firm = new FeatureLayer({
        url:"https://services1.arcgis.com/sQOueNHZBxRJjRN3/arcgis/rest/services/firm/FeatureServer/0",
        renderer: FirmRenderer,
    });
    map.add(firm);

    if(show_pll){
        map.add(airqo_layer, 0);
    }
    if(show_MA_0){
        map.add(MA_0, 0);
    }
    if(show_MA_1){
        map.add(MA_1, 0);
    }
    if(show_MA_2){
        map.add(MA_2, 0);
    }
    const legend = new Legend({
        visible: true,
        view: view,
        layerInfos: [
            {
                layer: airqo_layer,
                title: ""
            },
            {
                layer: MA_0,
                title: ""
            },
            {
                layer: MA_1,
                title: ""
            },
            {
                layer: MA_2,
                title: ""
            },
            {
                layer: firm,
                title: ""
            }
        ]
    });
    view.ui.add(legend, "top-right");

    const compass = new Compass({
        visible: true,
        view:view
    });
    view.ui.add(compass,"top-left");

    const layerList = new LayerList({
          view: view
        });
    view.ui.add(layerList, "bottom-right");

        function fadeVisibilityOn(layer) {
          let animating = true;
          let opacity = 0;
          // fade layer's opacity from 0 to
          // whichever value the user has configured
          const finalOpacity = layer.opacity;
          layer.opacity = opacity;

          view.whenLayerView(layer).then((layerView) => {

            function incrementOpacityByFrame() {
              if((opacity >= finalOpacity) && animating){
                animating = false;
                return;
              }

              layer.opacity = 1;

              requestAnimationFrame(incrementOpacityByFrame);
            }

            // Wait for tiles to finish loading before beginning the fade
            watchUtils.whenFalseOnce(layerView, "updating", function(updating){
              requestAnimationFrame(incrementOpacityByFrame);
            });

          });
        }

        view.when().then(() => {
          // When the user toggles a layer on, transition
          // the layer's visibility using opacity
          layerList.operationalItems.forEach((item) => {
            item.watch("visible", (visible) => {
              if(visible){
                fadeVisibilityOn(item.layer);
              }
            });
          });
        });
});