const URL = process.env.REACT_APP_API_URL;

export const updateVote = (type, id, direction) => {
  return fetch(`${URL}/${type}/${id}?vote=${direction}`, {
    method: 'PUT',
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
    .then(res => {
      return res.json()
    })
}

export const getArticles = (type, page = 0, limit = 10, sort = null) => {
  return fetch(`${URL}/${type}?page=${page}&limit=${limit}&sort=${sort}`)
    .then(res => res.json())
}

export const getArticle = (articleId) => {
  return fetch(`${URL}/articles/${articleId}`)
    .then(res => res.json())
}

export const getTopics = () => {
  return fetch(`${URL}/topics`)
    .then(res => res.json())
}

export const getUser = (username) => {
  return fetch(`${URL}/users/${username}`)
    .then(res => res.json())
}

export const getUsers = () => {
  return fetch(`${URL}/users`)
    .then(res => res.json())
}

export const getComments = (articleId, sort = null) => {
  const url = `${URL}/articles/${articleId}/comments?sort=${sort}`;
  return fetch(url)
    .then(res => res.json())
    .then(r => {
      console.log(url, r)
      return r
    })
}

export const postComment = (articleId, comment) => {
  const data = { "comment": comment }
  return fetch(`${URL}/articles/${articleId}/comments`, { 
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
    .then(res => res.json())
}

export const deleteComment = (commentId) => {
  return fetch(`${URL}/comments/${commentId}`, {
    method: 'DELETE'
  })
}