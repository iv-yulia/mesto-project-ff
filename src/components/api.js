const BASE_URL = "https://nomoreparties.co/v1/";
const COHORT_ID = "wff-cohort-38";
const TOKEN = "9503a300-d1d2-40fa-93bf-3f548ff8c496";

const config = {
  baseUrl: `${BASE_URL}${COHORT_ID}`,
  headers: {
    authorization: TOKEN,
    "Content-Type": "application/json",
  },
};

const { baseUrl, headers } = config;

const checkResponseStatus = (res) => {
  if(res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const getInitialCards = () => {
  return fetch(`${baseUrl}/cards`, {
    headers,
  }).then(checkResponseStatus);
};

export const getProfileInfo = () => {
  return fetch(`${baseUrl}/users/me`, {
    headers,
  }).then(checkResponseStatus);
};

export const updateProfileInfo = (name, about) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name,
      about
    })
  })
  .then(checkResponseStatus);
}

export const updateProfileAvatar = (avatar) => {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar,
    })
  })
  .then(checkResponseStatus);
}

export const uploadNewCard = (name, link) => {
  return fetch(`${baseUrl}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      link,
    })
  })
  .then(checkResponseStatus)
}

export const removeCard = (cardId) => {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers,
  })
  .then(checkResponseStatus);
}

export const likeCard = (cardId, isLiked) => {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers,
  })
  .then(checkResponseStatus);
}
