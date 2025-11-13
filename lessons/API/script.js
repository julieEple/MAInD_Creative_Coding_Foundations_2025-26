
fetch('/.API/peopleData.json') // get the data from an external source
  .then(response => response.json()) // parse/convert the data in JavaScript format
  .then(data => console.log(data)) // dispay the data in the console
  .catch(error => console.error('Error:', error)); // display an error if the data cannot be loaded

  function displayData(data){
    const CONTAINER = document.getElementById("container")
    
    let output = ""
    
    for (let person of data){
      console.log("hi")
      CONTAINER.innerHTML = output
  }
}