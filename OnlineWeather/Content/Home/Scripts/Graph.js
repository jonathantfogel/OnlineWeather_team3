var form = document.getElementById("graph-filter-form");
/*form.action = "/Home/RequestWeatherData";
form.method = "post";*/
var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'],
        datasets: [{
            label: 'Temperature',
            data: [12, 19, 3, 5, 2, 3, 5],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)']
        }/*, {
            label: 'Wind speed',
            data: [3, 5, 1, 7, 3, 4],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)']
        }*/]
    }
});

/*document.addEventListener("DOMContentLoaded", function () {
    

});*/

document.getElementById("submitFormbtn").addEventListener("click", async function (e) {
    e.preventDefault();

    wd = await getWeatherData(form);

    updateGraph(myChart, wd[0].Second.map(item => item.Timestamp), wd[0].Second.map(item => item.Data), wd[0].First);
    for (let i = 1; i < wd.length; i++) {
        addLineToGraph(myChart, [], wd[i].Second.map(item => item.Data), wd[i].First);
    }
});

function updateGraph(chart, labels, data, type) {
    chart.data.labels = [];
    chart.data.datasets = [];
    addLineToGraph(chart, labels, data, type);
    /*chart.data.labels = labels;
    chart.data.datasets = [{
        label: type,
        data: data,
        //backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)']
    }];
    chart.update();*/
}
function addLineToGraph(chart, labels, data, type) {
    Array.prototype.push.apply(chart.data.labels, labels);
    chart.data.datasets.push({
        label: type,
        data: data,
        //backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)']
    });
    chart.update();
}

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