document.addEventListener("DOMContentLoaded", ()=>{
    const taxSwitch = document.getElementById("flexSwitchCheckDefault");
    taxSwitch.addEventListener("click", function() {
        console.log("click");
        let beforeTaxElements = document.querySelectorAll('#beforeTax');
        let afterTaxElements = document.querySelectorAll('#afterTax');
        console.log(beforeTaxElements);

        for(beforeTaxEl of beforeTaxElements){
            if(beforeTaxEl.style.display != "none"){
                beforeTaxEl.style.display = "none";
            }else{
                beforeTaxEl.style.display = "";
            }
        }
        for(afterTaxEl of afterTaxElements){
            if(afterTaxEl.style.display == "none"){
                afterTaxEl.style.display = "";
            }else{
                afterTaxEl.style.display = "none";
            }
        }
    });
});