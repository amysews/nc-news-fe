export const updateVote = (type, id, direction) => {
  return fetch(`${process.env.REACT_APP_API_URL}/${type}/${id}?vote=${direction}`, {
    method: 'PUT',
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
    .then(res => res.json())
}