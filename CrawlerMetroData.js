const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const metro = function () {
    request({
        url: "https://web.metro.taipei/c/selectstation2010.asp",
        method: "GET"
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }
        //console.log(body)
        const $ = cheerio.load(body); // 載入 body
        //console.log($)
        let map = $('map area')
        //console.log(map.eq(1)[0].attribs)
        let station_info = {
            data: []
        }
        for (var i = 0; i < map.length - 4; i++) {
            //console.log(map.eq(i)[0].attribs)
            let station = {
                name: null,
                id: null,
                position: null,
                color: null,
            }
            let init = map.eq(i)[0].attribs

            //Metro name and id 
            let title = init.title.split(' ')
            if (title.length === 1) {
                var temp = title[0].slice(0, 3)
                var temp1 = title[0].slice(3, 5)
                title = [temp, temp1]
            }
            station.name = title[title.length - 1]
            station.id = title.slice(0, title.length - 1)
            //console.log(station.id)

            //Metro position
            if (init.shape === 'rect') {
                var coords = init.coords.split(',');
                station.position = [(parseInt(coords[0]) + parseInt(coords[2])) / 2, (parseInt(coords[1]) + parseInt(coords[3])) / 2]
            }
            else {
                var coords = init.coords.split(',');
                var coordx = [], coordy = []

                for (let i = 0; i < coords.length; i += 2) {
                    coordx.push(parseInt(coords[i]))
                    coordy.push(parseInt(coords[i + 1]))
                }
                var min = [Math.min(...coordx), Math.min(...coordy)],
                    max = [Math.max(...coordx), Math.max(...coordy)]
                station.position = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2]
            }
            //console.log(station.position)

            let color = [];
            for (let i = 0; i < station.id.length; i++) {
                for (let j = 0; j < station.id[i].length; j++) {
                    if (station.id[i][j].charCodeAt(0) >= 48 && station.id[i][j].charCodeAt(0) <= 57) {
                        color.push(station.id[i].slice(0, j));
                        j = station.id[i].length;
                    }
                }
            }

            station.color = color
            //console.log(station.color)
            station_info.data.push(station)
        }

        fs.writeFileSync('MetroStation.js', 'export default ' + JSON.stringify(station_info), 'utf8');

    });
};


metro();