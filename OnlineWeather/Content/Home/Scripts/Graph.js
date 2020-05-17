var ctx = document.getElementById('myChart').getContext('2d');

let result = parseData();

console.log(result);

async function parseData() {
    let file = new XMLHttpRequest();
    file.open("GET", "/Content/WeatherData/smhi-" + "t" + ".csv", false);
    return await Papa.parse(file, {
        delimiter: ";",
        header: true
    });
}

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'],
        datasets: [{
            label: 'Temperature',
            data: [12, 19, 3, 5, 2, 3, 5],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'
            ],
            borderColor: ['rgba(255, 99, 132, 1)'
            ]
        }/*, {
            label: 'Wind speed',
            data: [3, 5, 1, 7, 3, 4],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)']
        }*/]
    }
});

/*
    background colour
    rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
    border colour
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
*/
/*data: [{ x: 1, y: 12}, { x: 2, y: 19}, {x: 3, y: 3}, { x: 4, y: 5}, { x: 5, y: 2}, {x: 5, y: 3}],*/