
function fetchData() {
    fetch("data.json")
        .then(r => r.json())
        .then(visualizeData);
}

function visualizeData(data) {
    // Problem 1 - Histogram of Authorized Cap
    plot_auth_cap_data(data.auth_cap_data)

    // Problem 2 - Histogram of company registration by year
    plot_com_reg_by_year(data.com_reg_by_year)

    // Problem 3 - Top registrations by "Principal Business Activity"
    plot_principle_business_activity(data.principle_business_activity)

    // Problem 4 - Group bar chart by aggregating registrations count over
    plot_aggregating_registrations_count(data.aggregating_registrations_count)
}

fetchData();

function plot_auth_cap_data(auth_cap_data) {
    const auth_cap = [];
    for (let amount in auth_cap_data) {
        auth_cap.push([amount, auth_cap_data[amount]]);
    }

    Highcharts.chart("auth_cap_data", {
        chart: {
            type: "column"
        },
        title: {
            text: "Histogram of Authorized Cap"
        },
        xAxis: {
            categories:["< 1 Lac",
                        "1 Lac - 10 Lac",
                        "10 Lac - 1 Cr",
                        "1 Cr - 10 Cr",
                        "10 Cr - 100 Cr",
                        "> 100 Cr"],
            type: "category"
        },
        yAxis: {
            min: 0,
            title: {
                text: "No. of Companies"
            }
        },
        series: [
            {
                name: "Authorized Cap",
                data: auth_cap
            }
        ]
    });
}

function plot_com_reg_by_year(com_reg_by_year) {
    const com_reg = [];
    for (let year = 2000; year <= 2018; year++) {
        com_reg.push([year, com_reg_by_year[year]]);
    }

    Highcharts.chart("com_reg_by_year", {
        chart: {
            type: "column"
        },
        title: {
            text: "Histogram of company registration by year"
        },
        xAxis: {
            type: "year"
        },
        yAxis: {
            min: 0,
            title: {
                text: "No. of Companies"
            }
        },
        series: [
            {
                name: "Year",
                data: com_reg
            }
        ]
    });
}

function plot_principle_business_activity(principle_business_activity) {
    const principle_business = [];
    for (let x = 0; x < 10; x++) {
        principle_business.push([principle_business_activity[x][0], principle_business_activity[x][1]]);
    }
    Highcharts.chart("principle_business_activity", {
        chart: {
            type: "column"
        },
        title: {
            text: "Top registrations by Principal Business Activity for the year 2015"
        },
        xAxis: {
            categories :  [ "Construction",
                            "Community, personal & Social Services",
                            "Agriculture and Allied Activities",
                            "Manufacturing (Machinery & Equipments)", 
                            "Real Estate and Renting",
                            "Manufacturing (Metals & Chemicals, and products thereof)",
                            "Transport, storage and Communications",
                            "Manufacturing (Food stuffs)",
                            "Finance",
                            "Manufacturing (Textiles)"],
            type: "2015"
        },
        yAxis: {
            min: 0,
            title: {
                text: "No. of Companies"
            }
        },
        series: [
            {
                name: "top-10 registrations",
                data: principle_business
            }
        ]
    });

}

function plot_aggregating_registrations_count(aggregating_registrations_count) {
    let data_2011 = []
    let data_2012 = []
    let data_2013 = []
    let data_2014 = []
    let data_2015 = []
    let data_2016 = []
    let data_2017 = []
    let data_2018 = []
    arc_list = [
        'Agriculture and Allied Activities',
        'Manufacturing (Machinery & Equipments)',
        'Community, personal & Social Services',
        'Trading',
        'Construction',
    ]
    for (let arc in arc_list) {
        data_2011.push(aggregating_registrations_count['2011'][arc_list[arc]])
        data_2012.push(aggregating_registrations_count['2012'][arc_list[arc]])
        data_2013.push(aggregating_registrations_count['2013'][arc_list[arc]])
        data_2014.push(aggregating_registrations_count['2014'][arc_list[arc]])
        data_2015.push(aggregating_registrations_count['2015'][arc_list[arc]])
        data_2016.push(aggregating_registrations_count['2016'][arc_list[arc]])
        data_2017.push(aggregating_registrations_count['2017'][arc_list[arc]])
        data_2018.push(aggregating_registrations_count['2018'][arc_list[arc]])
    }

    Highcharts.chart('aggregating_registrations_count', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Aggregate Registrations Count'
        },
        xAxis: {
            categories: [
                'Agriculture and Allied Activties',
                'Manufacturing (Machinery & Equipments)',
                'Community, personal & Social Services',
                'Trading',
                'Construction',
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Registrations'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: "2011",
            data: data_2011

        }, {
            name: '2012',
            data: data_2012

        }, {
            name: '2013',
            data: data_2013

        }, {
            name: '2014',
            data: data_2014

        }, {
            name: '2015',
            data: data_2015

        }, {
            name: '2016',
            data: data_2016

        }, {
            name: '2017',
            data: data_2017

        }, {
            name: '2018',
            data: data_2018

        }]
    });
}