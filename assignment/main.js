//popup elements
var container= document.getElementById('popup')
var content= document.getElementById('popup-content')
var content_element= document.getElementById('popup-content')

function DresdenClicked(){
  document.getElementById("tablebutton").style.visibility="visible"

  myview.animate({
    center:[1534524.14132207, 6637369.92473581],
    duration:2000,
    zoom:11
  })}

//Creating view
myview= new ol.View({
  center: [2228815,8632237],
  zoom:3

})

var osm= new ol.layer.Tile({
  source: new ol.source.OSM()
})

// WMS layer
// var format = 'image/png';
// var layers = new ol.layer.Image({
//     source: new ol.source.ImageWMS({
//       ratio: 1,
//       url: 'http://localhost:8080/geoserver/acme/wms',
//       params: {'FORMAT': format,
//                'VERSION': '1.1.1',  
//             "STYLES": '',
//             "LAYERS": 'acme:gis_osm_barriers_07_1',
//             "exceptions": 'application/vnd.ogc.se_inimage',
//       }
//     })
//   });


// Creating WFS layer
const vectorSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function (extent) {
      return (
        'http://localhost:8080/geoserver/acme/ows?service=WFS&' +
        'version=1.0.0&request=GetFeature&typename=acme:gis_osm_barriers_07_1&' +
        'outputFormat=application/json&srsname=EPSG:3857&' +
        'bbox=' +
        extent.join(',') +
        ',EPSG:3857'
      );
    },
  });
  
  const layers = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 255, 1.0)',
        width: 2,
      }),
    }),
  });

  layerArray= [osm,layers]

  var map= new ol.Map({
    target: 'map',
    view: myview,
    layers: layerArray
  })
  
  //on map click functionality
  var select = new ol.interaction.Select({
    hitTolerance: 5,
    multi: true,
    condition: ol.events.condition.singleClick
  });
 map.addInteraction(select);

 map.on('singleclick', function(evt){
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, one) 
    {
   return feature;
      })
     //var url= feature.getSource().getFeatures()
     console.log(feature.getProperties())
     var coord = feature.getGeometry().getCoordinates()[0][0]
     var content= '<h6>'+ 'Name: <br>' +feature.getProperties().name + '</h6>'
     content+= '<h6>'+ 'Code <br>'+ feature.getProperties().code +'</h6>'
     content+= '<h6>'+ 'fclass <br>'+ feature.getProperties().fclass +'</h6>'
     content+= '<h6>'+ 'osm id <br>'+ feature.getProperties().osm_id +'</h6>'
     content_element.innerHTML=content
 
     overlaydet.setPosition(coord)
 })

 var overlaydet= new ol.Overlay({
    element:container,
    offset:[0,-10]
  })

  map.addOverlay(overlaydet)
 