# Aire API

### Root

`GET /`

Retrives the latest data for all station and all types of pollution.

#### Optional parameters

`hours`(int): Number of hours you want to query (*default*: 24).

#### Response

Returns a JSON object with the latest data of from all stations for all types of pollution, ordered alphabeticaly by station code name.

#### Example Response

```
{
  [{
    "station": "ACO",
    "data": [{
      "datetime": "2016-05-15T06:00:00",
      "pollutionTypes": { 
        "so2": 23,
        "co": 24,
        "nox": 12,
        "no2": 23,
        "no": 23,
        "o3": 18,
        "pm10": 20,
        "pm2": 23,
        "wsp": 16,
        "wdr": 12,
        "tmp": 28,
        "rh": 11
      }
    }, {
      "datetime": "2016-05-15T05:00:00",
      "pollutionTypes": {
        "so2": 25,
        "co": 20,
        "nox": 15,
        "no2": 20,
        "no": 24,
        "o3": 19,
        "pm10": 22,
        "pm2": 20,
        "wsp": 20,
        "wdr": 11,
        "tmp": 20,
        "rh": 15
      }
    }]
  }, {
    "station": "AJM",
    "data": [{
      "datetime": "2016-05-15T06:00:00",
      "pollutionTypes": {
        "so2": 23,
        "co": 24,
        "nox": 12,
        "no2": 23,
        "no": 23,
        "o3": 18,
        "pm10": 20,
        "pm2": 23,
        "wsp": 16,
        "wdr": 12,
        "tmp": 28,
        "rh": 11
      }
    },{
      "datetime": "2016-05-15T05:00:00",
      "pollutionTypes": {
        "so2": 25,
        "co": 20,
        "nox": 15,
        "no2": 20,
        "no": 24,
        "o3": 19,
        "pm10": 22,
        "pm2": 20,
        "wsp": 20,
        "wdr": 11,
        "tmp": 20,
        "rh": 15
      }
    }]
  }]
}
```

## By pollution type

`GET /pollutionType/:pollutionType`

Retrives the latest data for a given pollution type in all available stations.

#### Required parameters

`pollutionType` (string): Desired pollution type data.

#### Optional parameters

`hours`(int): Number of hours you want to query (*default*: 24).

#### Response

Returns a JSON object with the latest data for the specified pollution type ordered by the most recent to the oldest.

##### Example Response 

`GET /pollutionType/co/?hours=1`

```
{
  "pollutionType": "co",
  "data": [{
    "datetime": "2016-05-15T06:00:00",
    "stations": {
      "ACO": "24",
      "AJM": "21",
      "AJU": "nr",
      "ATI": "nr",
      "BJU": "23",
      "CAM": "nr",
      "CCA": "nr",
      "CES": "nr",
      "CHO": "22"
        "COY": "nr",
      "CUA"": "19",
    }
  }, {
    "datetime": "2016-05-15T05:00:00",
    "stations": {
      "ACO": "22",
      "AJM": "20",
      "AJU": "nr",
      "ATI": "nr",
      "BJU": "24",
      "CAM": "nr",
      "CCA": "nr",
      "CES": "nr",
      "CHO": "21"
        "COY": "nr",
      "CUA"": "25",
    }
  }]
}

```


## By station

```
GET /station/:stationCode
GET /station/:delegacion
```

Retrive latest data from a specific station

#### Required parameters

`stationCode` or `delegacion` (string): The desired data station code.

#### Optional parameters

`hours`(int): Number of hours you want to query (*default*: 24).

#### Response

Returns a JSON object with the latest data of from the specified station ordered by the most recent to the oldest.

##### Example Response

`GET /station/ACO/?hours=2`

```
{
  "station": "CUH",
  "data": [{
    "datetime": "2016-05-15T06:00:00",
    "pollutionTypes": {
      "so2": 23,
      "co": 24,
      "nox": 12,
      "no2": 23,
      "no": 23,
      "o3": 18,
      "pm10": 20,
      "pm2": 23,
      "wsp": 16,
      "wdr": 12,
      "tmp": 28,
      "rh": 11
    }
  }, {
    "datetime": "2016-05-15T05:00:00",
    "pollutionTypes": {
      "so2": 25,
      "co": 20,
      "nox": 15,
      "no2": 20,
      "no": 24,
      "o3": 19,
      "pm10": 22,
      "pm2": 20,
      "wsp": 20,
      "wdr": 11,
      "tmp": 20,
      "rh": 15
    }
  }]
}
```

## By location

`GET /location/:lat/:long` 

Retrives latest data from the closest station to a given geolocation.

#### Required parameters

`lat` (string): Location's latitude.
`long` (string): Location's longitude

#### Optional parameters

`hours`(int): Number of hours you want to query (*default*: 24).

#### Response

Returns a JSON object with the latest data of from the nearest station grom the given location, sort by the most recent to the oldest.

#### Example Response

```
{
  "station": "CUH",
  "data": [{
    "datetime": "2016-05-15T06:00:00",
    "pollutionTypes": {
      "so2": 23,
      "co": 24,
      "nox": 12,
      "no2": 23,
      "no": 23,
      "o3": 18,
      "pm10": 20,
      "pm2": 23,
      "wsp": 16,
      "wdr": 12,
      "tmp": 28,
      "rh": 11
    }
  }, {
    "datetime": "2016-05-15T05:00:00",
    "pollutionTypes": {
      "so2": 25,
      "co": 20,
      "nox": 15,
      "no2": 20,
      "no": 24,
      "o3": 19,
      "pm10": 22,
      "pm2": 20,
      "wsp": 20,
      "wdr": 11,
      "tmp": 20,
      "rh": 15
    }
  }]
}
```
