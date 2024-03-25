document.querySelectorAll('input[name="type"]').forEach(function (radio) {
  radio.addEventListener("change", function () {
    let numType = this.value;
    getNumFact(numType);
  });
});

function getNumFact(numType) {
  let number = document.querySelector(".inputNum").value;
  const xhr = new XMLHttpRequest();
  if (numType == "math") {
    xhr.open(
      "GET",
      `https://numbersapi.p.rapidapi.com/${number}/math?fragment=true&json=true`
    );
  } else if (numType == "trivia") {
    xhr.open(
      "GET",
      `https://numbersapi.p.rapidapi.com/${number}/trivia?fragment=true&notfound=floor&json=true`
    );
  } else {
    xhr.open(
      "GET",
      `https://numbersapi.p.rapidapi.com/${number}/year?fragment=true&json=true`
    );
  }

  xhr.setRequestHeader(
    "X-RapidAPI-Key",
    "b0510519cemshc9026dcc9acfd24p15647ejsn2230e0e2780e"
  );
  xhr.setRequestHeader("X-RapidAPI-Host", "numbersapi.p.rapidapi.com");

  xhr.send();
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
     let data =JSON.parse(this.responseText);
        let mainbox = document.querySelector(".mainbox");
        if(!(data.found)){
            alert('data not found / may you enter wrong thing');
            return;
        }
      let card = `
  <p class="pera" placeholder="data">${data?.text}</p>
      <div class="otherDetails">
        <span class="type">Type : ${data?.type}</span>
        <span class="num">Number is : ${data?.number}</span>
      </div>
  `;
  mainbox.style.display="block";
    mainbox.innerHTML = card;
  console.log(data);
    }
  });
  


}
console.log("script is working");
