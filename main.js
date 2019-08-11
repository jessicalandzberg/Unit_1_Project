let originalURL = 'https://docs.google.com/spreadsheets/d/1_G4ra90EOmoebu9gExY0wd9hK9eeN8caip_1wc7E8AA/edit#gid=0'

let id =  '1_G4ra90EOmoebu9gExY0wd9hK9eeN8caip_1wc7E8AA'
let source = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`

// fetch call and run create cards function
fetch(source)
  .then( res => res.json())
  .then( data => {
     let projects = data.feed.entry.map( d => {
       return {
          title: d.gsx$title.$t,
          image: d.gsx$image.$t,
          link: d.gsx$link.$t,
       }
     })
     createCards(projects)
})

// create new card object because google doc objects have a lot of unnecessary info
class Card {
  constructor(obj) {
    this.title = obj.title
    this.image = obj.image
    this.link = obj.link
  }

// function that assembles each card
render() {
    const col = document.createElement('div')
    col.classList.add("colwrapper",'col-sm-12','col-lg-4','col-md-6');

    const card = document.createElement('div')
    card.classList.add('card');

    const linkToProject = document.createElement("a")
    linkToProject.setAttribute("href", this.link);
    linkToProject.innerText = this.title

    const cardTitle = document.createElement('div')
    cardTitle.classList.add('card-title');

    const cardImage = document.createElement('div')
    cardImage.classList.add('card-image');

    const image  = document.createElement('img')
    image.setAttribute('src', this.image)
    image.setAttribute("id", "card-image");


    cardImage.appendChild(image)
    cardTitle.appendChild(linkToProject)
    card.appendChild(cardTitle)
    card.appendChild(cardImage)

    col.appendChild(card)

    return col
  }
}

// function that creates cards by looping through each object in projects
function createCards(projects){
  const projectDiv = document.querySelector('#projectsSection')
  projects.forEach( obj => {
    let card = new Card(obj)
    console.log('this is card', card)
    projectDiv.appendChild(card.render())
  })

}
