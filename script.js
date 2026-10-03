let dashboardData = [];

let chart;


// Load CSV
fetch("data/data.csv")

    .then(response => response.text())

    .then(csv => {

        dashboardData = parseCSV(csv);

        setupYearDropdown();

        showDashboard(
            dashboardData[dashboardData.length - 1]
        );

        createChart();
    })

    .catch(error => {

        console.error(
            "Error loading data:",
            error
        );

    });


// Convert CSV into JavaScript objects
function parseCSV(csv) {

    const rows =
        csv.trim().split("\n");

    const headers =
        rows[0].split(",");

    return rows.slice(1).map(row => {

        const values =
            row.split(",");

        const item = {};

        headers.forEach(
            (header, index) => {

                item[header.trim()] =
                    values[index].trim();

            }
        );

        return item;

    });

}


// Create year dropdown
function setupYearDropdown() {

    const select =
        document.getElementById("yearSelect");

    dashboardData.forEach(item => {

        const option =
            document.createElement("option");

        option.value =
            item.year;

        option.textContent =
            item.year;

        select.appendChild(option);

    });


    select.value =
        dashboardData[
            dashboardData.length - 1
        ].year;


    select.addEventListener(
        "change",
        function () {

            const selected =
                dashboardData.find(
                    item =>
                        item.year === this.value
                );

            showDashboard(selected);

        }
    );

}


// Update cards
function showDashboard(data) {

    document.getElementById(
        "population"
    ).textContent =
        Number(data.population)
        .toLocaleString();


    document.getElementById(
        "births"
    ).textContent =
        Number(data.births)
        .toLocaleString();


    document.getElementById(
        "deaths"
    ).textContent =
        Number(data.deaths)
        .toLocaleString();


    document.getElementById(
        "tfr"
    ).textContent =
        data.tfr;


    document.getElementById(
        "sexRatio"
    ).textContent =
        data.sex_ratio;
}


// Create chart
function createChart() {

    const labels =
        dashboardData.map(
            item => item.year
        );


    const births =
        dashboardData.map(
            item => Number(item.births)
        );


    const deaths =
        dashboardData.map(
            item => Number(item.deaths)
        );


    const ctx =
        document.getElementById(
            "vitalChart"
        );


    chart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [

                {
                    label: "Live Births",
                    data: births
                },

                {
                    label: "Deaths",
                    data: deaths
                }

            ]
        },

        options: {

            responsive: true,

            scales: {

                y: {
                    beginAtZero: true
                }

            }

        }

    });

}