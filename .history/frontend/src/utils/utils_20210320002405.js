import axios from 'axios'

export const getImageUrl = (obj) => {
    return `${axios.defaults.baseURL}uploads/${obj.imageUrl ? obj.imageUrl.split('\\')[1] : null}`
}

export const titleCase = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
}

export const getUser = async () => {
    const user = await axios.get(axios.defaults.baseURL + "api/users/user", {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })

    return user
}