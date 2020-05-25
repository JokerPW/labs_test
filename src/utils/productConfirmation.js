const axios = require('axios').default

const confirmation = async function (url) {
    try {
        const response = await axios.get(url)
        console.log(response.data)
        if (response.status != 200)
            return null
        
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = confirmation;