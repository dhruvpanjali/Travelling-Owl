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
    let categ5 = document.querySelector(".card-5");
    let categ6 = document.querySelector(".card-6");
    let taxSwitchScontainer = document.querySelector("#tax-switch-container");
    if(window.innerWidth <= 768){
        categoryDiv.classList.add("justify-content-evenly");
        categ5.classList.add("d-none");
        categ6.classList.add("d-none");

        taxSwitchScontainer.classList.remove("ms-3");
        
    }else{
        categoryDiv.classList.remove("justify-content-evenly");
        categ5.classList.remove("d-none");
        categ6.classList.remove("d-none");

        taxSwitchScontainer.classList.add("ms-3");
    }
}

// Calls the function when the page loads
adjustLayout();

// Calls the function on window resize
window.addEventListener('resize', adjustLayout);

