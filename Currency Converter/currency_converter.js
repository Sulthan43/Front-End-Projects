fetch('https://api.frankfurter.dev/v1/currencies')
.then(res => res.json())
.then(curVal => displayDropDown(curVal))

let c = document.querySelectorAll('.inpt')
let btn = document.getElementById("btn")
function displayDropDown(val){
    let curVal = Object.entries(val)
    for(let i=0;i<curVal.length;i++){
        let option = `<option value="${curVal[i][0]}">${curVal[i][0]}</option>`
        c[0].innerHTML += option
        c[1].innerHTML += option
    }
}

btn.addEventListener('click',() =>{
    let lcur = c[0].value
    let rcur = c[1].value
    let input = document.getElementById("c1").value
    if(lcur == rcur){
        alert("Choose Different Currencies")
    }
    else{
        convert(lcur,rcur,input)
    }
})

function convert(cur1,cur2,input){
    fetch(`https://api.frankfurter.dev/v1/latest?base=${cur1}&symbols=${cur2}`)
    .then((resp) => resp.json())
    .then((data) => {
      const convertedAmount = (input * data.rates[cur2]).toFixed(2)
    document.getElementById("output").value = convertedAmount
    })
}