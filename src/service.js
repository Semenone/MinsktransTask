

export default class MinskServise {

     getResourse = async (url) => {
        const res = await fetch(url);
        const response = await res.text();
        return response;
    };
    
    getStops() {
        return this.getResourse('https://gp-js-test.herokuapp.com/proxy/http://www.minsktrans.by/city/minsk/stops.txt')
            .then((response) => {
                const stopDataRe = /[0-9а-яА-Я](.+);;[0-9][0-9]{6};[0-9][0-9]{6}/gim;
                let stopsRawData = [];
                let stopsData = [];
                let temp = [];
                let tempName = "";
                stopsRawData =  response.match(stopDataRe);
                for (let i = 0; i <= stopsRawData.length;i++){
                    if ((typeof stopsRawData[i]) == 'string'){
                        temp = stopsRawData[i].replace(/;0;0;/, ';').replace(/;;/, ';').split(";");
                        if (temp[2] !== ''){
                            tempName = temp[2];
                        };
                        if (temp[2] === ''){
                                temp[2] = tempName;
                        };
                        stopsData.push ({
                            stopId : temp[0],
                            stopName : temp[2],
                            stopLng : parseInt(temp[3]),
                            stopLat : parseInt(temp[4])
                        });
                    };
                };
                return stopsData
        })
    }

   getRoutes() {
        return this.getResourse('https://gp-js-test.herokuapp.com/proxy/http://www.minsktrans.by/city/minsk/routes.txt')
            .then((response) => {
                const routDataRe = /(.)?(.)?(.)?(.)?;(.*)?;(.*)?;(.*)?;(.+)[0-9]{5}[0-9]?;;/gim;
                let routsRawData = [];
                let routsData = [];
                let temp = [];
                routsRawData =  response.match(routDataRe);
                for (let i = 0; i <= routsRawData.length;i++){
                    if ((typeof routsRawData[i]) == 'string'){
                        temp = routsRawData[i].split(";");
                            if (((typeof temp[14]) == 'string') && (temp[8] === "A>B")){
                                routsData.push ({
                                    routeNum : temp[0],
                                    routeType : temp[8],
                                    routeName : temp[10],
                                    routeId : parseInt(temp[12]),
                                    routeStops : temp[14].split(",")
                                });
                        };
                    };
                };
                return routsData
            });
    }
}