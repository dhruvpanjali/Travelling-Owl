function adjustLayout(){
    let formDiv = document.querySelector(".user-form-container");

    if(window.innerWidth <= 768){
        formDiv.classList.add("col-8", "offset-2");
        formDiv.classList.remove("col-6", "offset-3");
    }else{
        formDiv.classList.remove("col-8", "offset-2");
        formDiv.classList.add("col-6", "offset-3");
    }
}

// Calls the function when the page loads
adjustLayout();

// Calls the function on window resize
window.addEventListener('resize', adjustLayout);