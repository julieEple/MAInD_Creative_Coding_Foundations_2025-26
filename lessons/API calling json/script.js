
fetch('/Users/juliehehe/Desktop/Creative Coding/MAInD_Creative_Coding_Foundations_2025-26/lessons/API calling json(peopleData.json') // get the data from an external source
  .then(response => response.json()) // parse/convert the data in JavaScript format
  .then(data => console.log(data)) // dispay the data in the console
  .catch(error => console.error('Error:', error)); // display an error if the data cannot be loaded

  