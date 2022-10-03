var x = document.getElementById("logo");

x.addEventListener("click", firstFunction);
x.addEventListener("mouseover", secondFunction);
x.addEventListener("mouseout", thirdFunction);

function firstFunction() {
    document.getElementById("whatMouseIsDoing").innerHTML = "Clicked!";
}
function secondFunction() {
    document.getElementById("whatMouseIsDoing").innerHTML = "You found the easter egg!";
}
function thirdFunction() {
    document.getElementById("whatMouseIsDoing").innerHTML = "";
}