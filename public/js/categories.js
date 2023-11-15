document.addEventListener("DOMContentLoaded", ()=>{
    const taxSwitch = document.getElementById("flexSwitchCheckDefault");
    taxSwitch.addEventListener("click", function() {
        console.log("click");
        let beforeTaxElements = document.querySelectorAll('#beforeTax');
        let afterTaxElements = document.querySelectorAll('#afterTax');
        console.log(beforeTaxElements);

        beforeTaxElements.forEach(element => {
            element.classList.toggle("d-none");
        });
    
        afterTaxElements.forEach(element => {
            element.classList.toggle("d-none");
        });
    });

});

function adjustLayout(){
    let categoryDiv = document.querySelector(".catg-div");
    let taxSwitchScontainer = document.querySelector("#tax-switch-container");
    if(window.innerWidth <= 768){
        categoryDiv.classList.add("justify-content-evenly");
        taxSwitchScontainer.classList.remove("ms-3");
    }else{
        categoryDiv.classList.remove("justify-content-evenly");
        taxSwitchScontainer.classList.add("ms-3");
    }
}

// Calls the function when the page loads
adjustLayout();

// Calls the function on window resize
window.addEventListener('resize', adjustLayout);

