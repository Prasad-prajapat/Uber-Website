const axios = require('axios')

async function getAddressCoordinate(address){

    const apiKey = process.env.GOOGLE_MAPS_API

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

    // console.log("URL:", url);

        const response = await axios.get(url)

        // console.log("GOOGLE RESPONSE:", response.data);

        if (response.data.status !== 'OK') {
            throw new Error("Unable to find location");
        }

        const location = response.data.results[0].geometry.location
            return {
                ltd: location.lat,
                lng: location.lng
            }
} 

async function getDistanceTime(origin, destination){

    if(!origin || !destination){
        throw new Error('Origin and destination are required')
    }

    const apiKey = process.env.GOOGLE_MAPS_API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        
        const response = await axios.get(url)

        if(response.data.status === 'OK'){

            if(response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS'){
                throw new Error('No routes found')
            }

            return response.data.rows[ 0 ].elements[ 0 ]

        } else {

            throw new Error('Unable to fetch distance and line')
        }
        
    } catch (error) {
        console.log(error);
        throw error;
    }

}

async function getAutoCompleteSuggestions(input){
    if(!input){
        throw new Error('Query is required')
    }

    const apiKey = process.env.GOOGLE_MAPS_API
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{
        const response = await axios.get(url)
        
        if(response.data.status === 'OK'){
            return response.data.predictions
        } else {
            throw new Error("Unable to fetch suggestion");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAddressCoordinate,
    getDistanceTime,
    getAutoCompleteSuggestions
}