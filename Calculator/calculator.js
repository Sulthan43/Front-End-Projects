        let values=0
        const display = document.getElementById("input")
        function appendValues(enterValue){
                display.value += enterValue
                display.innerHTML=display.value
        }
        function clrScrn(){
                display.value=''
                display.innerHTML=display.value
        }
        function calculation(){
            try{
                display.value = eval(display.value)
            }
            catch(error){
                display.value = 'Error'
            }
        }