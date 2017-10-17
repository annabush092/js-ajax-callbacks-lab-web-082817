$(document).ready(function (){
  //add event listener to form
  $('#searchRepositories').on('click', searchRepositories)

  function getToken() {
    return 'a33301427079b6ef8dfc86710cb0bc4083420ae6'
  }

  function displayCommits(json) {
    html = "<ul>"
    for(let i=0; i<json.length; i++) {
      html += `<li> SHA: ${json[i].sha} </br>`
      if(json[i].author) {
        html += `Author Name: ${json[i].author.login} </br>
        <img src= ${json[i].author.avatar_url}>
        </li>`
      }
    }
    html += "</ul>"
    $('#details').append(html)
  }

  function showCommits(ev) {
    const repo = ev.target.dataset.url
    fetch(`https://api.github.com/repos/${repo}/commits`, {
      headers: {
        Authorization: `token ${getToken()}`
      }
    })
    .then(res => res.json())
    .then(json => displayCommits(json))
  }

  function showResults(json) {
    console.log(json)
    $('#results').append('<ul>')
    let html = ''
    for(let i=0; i<5; i++) {
      html = `<li>
      Repo name: ${json.items[i].name} </br>
      Description: ${json.items[i].description} </br>
      Url: ${json.items[i].html_url} <br>
      Owner name: ${json.items[i].owner.login} </br>
      <img src=${json.items[i].owner.avatar_url}> </br>
      Owner profile page: ${json.items[i].owner.url} </br>
      <a href='#' data-url=${json.items[i].full_name}>Show Commits</a>
      </li>`
      $('#results').append(html)
      $('li:last a').on('click', showCommits)
    }
    $('#results').append('</ul>')
  }

  function searchRepositories() {
    const terms = ($('#searchTerms').val())
    $('#searchTerms').val('')

    fetch(`https://api.github.com/search/repositories?q=${terms}`, {
      headers: {
        Authorization: `token ${getToken()}`
      }
    })
    .then(res => res.json())
    .then(json => showResults(json))
  }

});
