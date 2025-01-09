const APIURL = 'https://api.github.com/users/'

const mainContent = document.getElementById('main-content')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser (username) {
  try {
    const { data } = await axios(APIURL + username)
    createUserCard(data)
    getRepos(username)
  } catch (err) {
    if (err.response.status === 404) {
      createErrorCard('No profile with this username')
    }
  }
}

async function getRepos (username) {
  try {
    const { data } = await axios(APIURL + username + '/repos?sort=created')
    addReposToCard(data)
  } catch (error) {
    createErrorCard('Problem fetching repos')
  }
}

function createUserCard (user) {
  const userID = user.name || user.login
  const userBio = user.bio ? `<p>${user.bio}</p>` : ''
  const cardHTML = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${userID}</h2>
                <p>${userBio}</p>
                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `
  mainContent.innerHTML = cardHTML
}

function createErrorCard (message) {
  const cardHTML = `
        <div class="card">
            <h1>${message}</h1>
        </div>
    `
  mainContent.innerHTML = cardHTML
}

function addReposToCard (repos) {
  const reposElement = document.getElementById('repos')
  repos.slice(0, 10).forEach(repo => {
    const repoElement = document.createElement('a')
    repoElement.classList.add('repo')
    repoElement.href = repo.html_url
    repoElement.target = '_blank'
    repoElement.innerText = repo.name
    reposElement.appendChild(repoElement)
  })
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const username = search.value

  if (username) {
    getUser(username)

    search.value = ''
  }
})
