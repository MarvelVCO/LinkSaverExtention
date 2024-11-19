$('#input-btn').on('click', saveInput)
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
    myLeads.splice(i, 1)
    renderLeads()
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
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
