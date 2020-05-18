var form = document.createElement("form");
form.action = "/Home/RequestWeatherData";
form.method = "post";

var r = fetch(form.action, {
    method: "POST",
    credentials: "same-origin",
    body: new FormData(form)
})
    .then(r => r.json())
    .then(j => {
        if (j.length > 0) {
            console.log(j);

        } else {
            console.log("Error when requesting weather data.");
        }

    });

/*function GetWeatherData(e, form) {
    if (e !== null) {
        e.preventDefault();
    }

    var r = fetch(form.action + "?json=true", {
        method: "POST",
        credentials: "same-origin",
        body: new FormData(form)
    })
        .then(r => r.json())
        .then(j => {
            if (j.result) {
                console.log(result);

            } else {
                console.log("Error when requesting weather data.")
            }

        });

    return false;
}*/
 