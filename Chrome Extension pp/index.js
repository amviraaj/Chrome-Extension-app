
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delbtn = document.getElementById("delete-btn")
const tabbtn = document.getElementById("tab-btn")


let leadsfromstorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsfromstorage){
    myLeads = leadsfromstorage
    renderLeads(myLeads)
    
}


tabbtn.addEventListener("click",function(){
    chrome.tabs.query({active:true ,currentWindow : true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads" ,JSON.stringify (myLeads) )
        renderLeads(myLeads)  
    })
})


delbtn.addEventListener("dblclick",function (){
   localStorage.clear()
   myLeads=[]
   renderLeads(myLeads) 
})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderLeads(myLeads)
})


function renderLeads(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}

