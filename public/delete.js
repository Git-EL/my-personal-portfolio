const buttons = document.querySelectorAll('ul#job>li>button')
console.log(buttons)
buttons.forEach((einButton) => {
  einButton.addEventListener('click', (event) => {
    event.preventDefault()

    const delete_id = event.target.parentNode.id
    console.log(delete_id)

    fetch('/jobs/' + delete_id, {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: delete_id })}).then((ergebnis) => {
      ergebnis.json().then(
        (objekt) => {
          console.log(objekt)
          event.target.parentNode.innerText = objekt.result
        }
      )
    }).catch((fehler) => {
      console.error(fehler)
    })
  })
})
