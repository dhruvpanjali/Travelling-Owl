function adjustLayout(){

    let reviewCards = document.querySelectorAll(".review-card");

    if(window.innerWidth <= 487){
        reviewCards.forEach(element => {
            element.classList.add("w-100");
        });
    }else{
        reviewCards.forEach(element => {
            element.classList.remove("w-100");
        });
    }
}
// Calls the function when the page loads
adjustLayout();

// Calls the function on window resize
window.addEventListener('resize', adjustLayout);