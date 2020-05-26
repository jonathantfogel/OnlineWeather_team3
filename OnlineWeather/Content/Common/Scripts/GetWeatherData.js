
async function getWeatherData(form) {
    var r = await fetch(form.action, {
        method: "POST",
        credentials: "same-origin",
        body: new FormData(form)
    });
    return await r.json();
      /*  .then(r => r.json())
        .then(j => {
            if (j.length > 0) {
                console.log(j);
                return j;

            } else {
                console.log("Error when requesting weather data.");
            }

        });
        return null;*/
}

/*function GetWeatherData(e, form) {
    if (e !== null) {
        method: "POST",
        credentials: "same-origin",
        body: new FormData(form)        e.preventDefault();
    }

    var r = fetch(form.action + "?json=true", {

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
 