const MY_API_KEY = "80d1993378fa9e47ffc9c7fec53fe1d2" // here add your API key
const API_URL = "https://api.openweathermap.org/data/2.5/forecast?lat=59.919&lon=10.7509&units=metric&appid=" + MY_API_KEY
// const API_URL = "https://api.openweathermap.org/data/2.5/forecast?lat=" +latitude + "lon=" + longitude + "&units=metric&appid=" + MY_API_KEY


fetch(API_URL)
  .then(response => response.json()) 
  .then(data => displayData(data))
  .catch(error => displayError(error));


  function displayData(data){
    console.log(data)

    const forecast = data.list;
    console.log(forecast);


    for (let item of forecast){
      const date = item.dt_txt;
      const temp = item.main.temp;
      const time = date.substring(11,13);

      console.log("date= " + date, "temp= " +temp, "time= " + time)
    }
  }

  



  function displayError(error){
    console.log(error + ",sorry thats too bad")
  }