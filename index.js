const countLabel = document.getElementById("countLabel")
const increaseBtn =  document.getElementById("increaseBtn")
const decreaseBtn=  document.getElementById("decreaseBtn")
const reset =  document.getElementById("resetBtn")
let count = 0;

increaseBtn.onclick = function(){

    count++;
    countLabel.textContent = count;
}
decreaseBtn.onclick = function()
{
    count = count - 1
    countLabel.textContent = count
}

resetBtn.onclick = function()
{
    count = 0
    countLabel.textContent = count
}