  //required modules
  const request = require('request')
  const fs = require('fs');
 
  //Creating workspace
  request.post('http://localhost:8080/geoserver/rest/workspaces',{
  headers:{
      'Content-Type':"application/json"
  },
  body:JSON.stringify({
      "workspace":{
          "name":"test"
      }
  })
  },function(error,response,body){
  if(error){
      console.log(error)
  };
  console.log(response.statusCode);//201 created ok or 401 has alreay one;
  console.log(body);
  }).auth('admin','geoserver');

  //creating store
  request.post('http://localhost:8080/geoserver/rest/workspaces/test/datastores',{
  headers:{
      'Content-Type':"application/json"
  },
  body:JSON.stringify({
      "dataStore":{
          "name":"buildings",
          "connectionParameters": {
                        "entry": [
                          {"@key":"host","$":"localhost"},
                          {"@key":"port","$":"5432"},
                          {"@key":"database","$":"$$$"},
                          {"@key":"user","$":"admin"},
                          {"@key":"passwd","$":"geoserver"},
                          {"@key":"dbtype","$":"postgis"}
                        ]
                    }
      },
  })
  },function(error,response,body){
  if(error){
              console.log(error)
          };
          console.log(response.statusCode);//201 created ok or 404 has alreay 
          console.log(body);
  }).auth('admin','geoserver');

  //Uploading shapefile in store
  var data= 'D:/assignment.zip'
  const readStream = fs.createReadStream(data);

  var options = {
    'method': 'PUT',
    'url': 'http://localhost:8080/geoserver/rest/workspaces/acme/datastores/roads/file.shp',
    'headers': {
      'Content-type': 'application/zip',
    },
    'body': readStream,
    'auth': {
      'user': 'admin',
      'pass': 'geoserver'
  }
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    console.log('Status:', response.statusCode)
  }); 
 

 
