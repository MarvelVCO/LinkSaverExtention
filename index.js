$('#input-btn').on('click', saveInput)
$('#clear-btn').on('click', clearLeads)
$('#tab-btn').on('click', addCurrentTab)
$('#all-tabs-btn').on('click', addAllTabs)
inputEl = $('#input-el')
ulEl = $('#ul-el')

myLeads = JSON.parse(localStorage.getItem('myLeads')) || []
renderLeads()

function saveInput() {
    myLeads.push(inputEl.val())
    renderLeads()
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    inputEl.val('')
}

function removeLead(i) {
    myLeads.splice(i,    1)
    renderLeads()
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
}

function clearLeads() {
    areYouSure()
    setTimeout(resetClearBtn, 5000)
}

function resetClearBtn() {
    $('#clear-btn').text("CLEAR LINKS")
    $('#clear-btn').css("color", "#5f9341")
    $('#clear-btn').off('click').on('click', function() {
        clearLeads()
    })
}

function areYouSure() {
    $('#clear-btn').text("CONFIRM")
    $('#clear-btn').css("color", "red")
    $('#clear-btn').off('click').on('click', function() {
        myLeads = []
        renderLeads()
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        resetClearBtn()
    })
}

function addCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        renderLeads()
    });
}

function addAllTabs() {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        tabs.forEach(t => myLeads.push(t.url))
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        renderLeads()
    });
}

function renderLeads() {
    ulEl.empty()
    for (let i = 0; i < myLeads.length; i++) {
        ulEl.append($('<li></li>')
            .append($(`<a href="${myLeads[i]}">${myLeads[i]}</a>`)
            .add($('<button class="remove-btn">X</button>').on('click', function() {
                removeLead(i)
            }
        ))))
    }
}
