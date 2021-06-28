heconst weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const placeName = document.querySelector('#location');
const forecast = document.querySelector('#forecast');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    placeName.textContent = 'Loading ..... ';
    forecast.textContent = '';
    fetch(`/weather?search=${location}`).then((res) => {
        res.json().then(({location, data}) => {
            console.log(location);
                console.log(data);
            placeName.textContent = location;
            forecast.textContent = data;
        })
    })
})
