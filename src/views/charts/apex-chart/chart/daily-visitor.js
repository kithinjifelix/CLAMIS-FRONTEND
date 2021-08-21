const chartData = {
    type: 'area',
    height: 320,
    options: {
        chart: {
            id: 'daily-visitor'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 2,
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        colors: ['#4099ff'],
        xaxis: {
            type: 'datetime',
            min: new Date('01 Mar 2012').getTime(),
            tickAmount: 6,
            labels: {
                offsetY: 5,
            }
        },
        grid: {
            borderColor: '#cccccc42',
            padding: {
                left: 0,
                right: 0,
                bottom: 0
            }
        },
        yaxis: {
            show: true,
            labels: {
                show: true,
                align: 'left',
                offsetX: -18,
                maxWidth: 40,
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                // shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.0,
                stops: [0, 100]
            }
        },

    },
    series: [{
        name: 'visitor',
        data: [
            [1327359600000, 30],
            [1327446000000, 31],
            [1327532400000, 31],
            [1327618800000, 31],
            [1327878000000, 31],
            [1327964400000, 30],
            [1328050800000, 31],
            [1328137200000, 31],
            [1328223600000, 31],
            [1328482800000, 31],
            [1328569200000, 32],
            [1328655600000, 32],
            [1328742000000, 32],
            [1328828400000, 32],
            [1329087600000, 32],
            [1329174000000, 32],
            [1329260400000, 32],
            [1329346800000, 32],
            [1329433200000, 32],
            [1329778800000, 32],
            [1329865200000, 32],
            [1329951600000, 32],
            [1330038000000, 33],
            [1330297200000, 33],
            [1330383600000, 33],
            [1330470000000, 32],
            [1330556400000, 33],
            [1330642800000, 33],
            [1330902000000, 33],
            [1330988400000, 31],
            [1331074800000, 32],
            [1331161200000, 33],
            [1331247600000, 33],
            [1331506800000, 33],
            [1331593200000, 34],
            [1331679600000, 33],
            [1331766000000, 34],
            [1331852400000, 33],
            [1332111600000, 34],
            [1332198000000, 33],
            [1332284400000, 33],
            [1332370800000, 33],
            [1332457200000, 33],
            [1332712800000, 34],
            [1332799200000, 34],
            [1332885600000, 34],
            [1332972000000, 34],
            [1333058400000, 34],
            [1333317600000, 34],
            [1333404000000, 34],
            [1333490400000, 33],
            [1333576800000, 33],
            [1333922400000, 33],
            [1334008800000, 32],
            [1334095200000, 33],
            [1334181600000, 33],
            [1334268000000, 33],
            [1334527200000, 32],
            [1334613600000, 33],
            [1334700000000, 33],
            [1334786400000, 32],
            [1334872800000, 33],
            [1335132000000, 32],
            [1335218400000, 32],
            [1335304800000, 33],
            [1335391200000, 33],
            [1335477600000, 33],
            [1335736800000, 33],
            [1335823200000, 33],
            [1335909600000, 33],
            [1335996000000, 33],
            [1336082400000, 32],
            [1336341600000, 32],
            [1336428000000, 32],
            [1336514400000, 32],
            [1336600800000, 31],
            [1336687200000, 32],
            [1336946400000, 32],
            [1337032800000, 32],
            [1337119200000, 32],
            [1337205600000, 32],
            [1337292000000, 31],
            [1337551200000, 32],
            [1337637600000, 32],
            [1337724000000, 32],
            [1337810400000, 31],
            [1337896800000, 31],
            [1338242400000, 32],
            [1338328800000, 31],
            [1338415200000, 31],
            [1338501600000, 29],
            [1338760800000, 30],
            [1338847200000, 30],
            [1338933600000, 31],
            [1339020000000, 31],
            [1339106400000, 31],
            [1339365600000, 31],
            [1339452000000, 31],
            [1339538400000, 31],
            [1339624800000, 31],
            [1339711200000, 32],
            [1339970400000, 32],
            [1340056800000, 32],
            [1340143200000, 31],
            [1340229600000, 31],
            [1340316000000, 31],
            [1340575200000, 30],
            [1340661600000, 31],
            [1340748000000, 31],
            [1340834400000, 31],
            [1340920800000, 32],
            [1341180000000, 32],
            [1341266400000, 32],
            [1341439200000, 32],
            [1341525600000, 31],
            [1341784800000, 30],
            [1341871200000, 30],
            [1341957600000, 30],
            [1342044000000, 30],
            [1342130400000, 30],
            [1342389600000, 30],
            [1342476000000, 30],
            [1342562400000, 31],
            [1342648800000, 31],
            [1342735200000, 31],
            [1342994400000, 30],
            [1343080800000, 30],
            [1343167200000, 30],
            [1343253600000, 30],
            [1343340000000, 31],
            [1343599200000, 31],
            [1343685600000, 30],
            [1343772000000, 30],
            [1343858400000, 30],
            [1343944800000, 32],
            [1344204000000, 32],
            [1344290400000, 32],
            [1344376800000, 32],
            [1344463200000, 32],
            [1344549600000, 32],
            [1344808800000, 32],
            [1344895200000, 32],
            [1344981600000, 32],
            [1345068000000, 33],
            [1345154400000, 33],
            [1345413600000, 33],
            [1345500000000, 33],
            [1345586400000, 33],
            [1345672800000, 33],
            [1345759200000, 32],
            [1346018400000, 32],
            [1346104800000, 32],
            [1346191200000, 31],
            [1346277600000, 31],
            [1346364000000, 31],
            [1346709600000, 31],
            [1346796000000, 32],
            [1346882400000, 32],
            [1346968800000, 32],
            [1347228000000, 32],
            [1347314400000, 32],
            [1347400800000, 32],
            [1347487200000, 32],
            [1347573600000, 33],
            [1347832800000, 33],
            [1347919200000, 32],
            [1348005600000, 33],
            [1348092000000, 34],
            [1348178400000, 33],
            [1348437600000, 33],
            [1348524000000, 32],
            [1348610400000, 32],
            [1348696800000, 32],
            [1348783200000, 32],
            [1349042400000, 32],
            [1349128800000, 32],
            [1349215200000, 32],
            [1349301600000, 32],
            [1349388000000, 32],
            [1349647200000, 32],
            [1349733600000, 31],
            [1349820000000, 31],
            [1349906400000, 31],
            [1349992800000, 31],
            [1350252000000, 32],
            [1350338400000, 33],
            [1350424800000, 33],
            [1350511200000, 33],
            [1350597600000, 33],
            [1350856800000, 33],
            [1350943200000, 33],
            [1351029600000, 33],
            [1351116000000, 33],
            [1351202400000, 34],
            [1351638000000, 34],
            [1351724400000, 34],
            [1351810800000, 34],
            [1352070000000, 34],
            [1352156400000, 34],
            [1352242800000, 33],
            [1352329200000, 32],
            [1352415600000, 32],
            [1352674800000, 32],
            [1352761200000, 32],
            [1352847600000, 32],
            [1352934000000, 32],
            [1353020400000, 32],
            [1353279600000, 32],
            [1353366000000, 32],
            [1353452400000, 32],
            [1353625200000, 33],
            [1353884400000, 33],
            [1353970800000, 33],
            [1354057200000, 33],
            [1354143600000, 34],
            [1354230000000, 34],
            [1354489200000, 34],
            [1354575600000, 35],
            [1354662000000, 35],
            [1354748400000, 35],
            [1354834800000, 35],
            [1355094000000, 35],
            [1355180400000, 35],
            [1355266800000, 35],
            [1355353200000, 35],
            [1355439600000, 37],
            [1355698800000, 37],
            [1355785200000, 37],
            [1355871600000, 38],
            [1355958000000, 37],
            [1356044400000, 37],
            [1356303600000, 37],
            [1356476400000, 37],
            [1356562800000, 37],
            [1356649200000, 36],
            [1356908400000, 37],
            [1357081200000, 38],
            [1357167600000, 37],
            [1357254000000, 38],
            [1357513200000, 37],
            [1357599600000, 38],
            [1357686000000, 38],
            [1357772400000, 38],
            [1357858800000, 38],
            [1358118000000, 38],
            [1358204400000, 38],
            [1358290800000, 37],
            [1358377200000, 37],
            [1358463600000, 37],
            [1358809200000, 37],
            [1358895600000, 38],
            [1358982000000, 38],
            [1359068400000, 38],
            [1359327600000, 38],
            [1359414000000, 38],
            [1359500400000, 37],
            [1359586800000, 37],
            [1359673200000, 38],
            [1359932400000, 38],
            [1360018800000, 38],
            [1360105200000, 38],
            [1360191600000, 38],
            [1360278000000, 39],
            [1360537200000, 38],
            [1360623600000, 38],
            [1360710000000, 38],
            [1360796400000, 38],
            [1360882800000, 38],
            [1361228400000, 38],
            [1361314800000, 38],
            [1361401200000, 38],
            [1361487600000, 38],
            [1361746800000, 38],
            [1361833200000, 38],
            [1361919600000, 39],
        ]
    }, ]
}
export default chartData;