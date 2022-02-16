const getAllSpots = async () => {
    const token = localStorage.getItem('token');
    const url = `${ process.env.REACT_APP_BACKEND_URL }/spots/`
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + token
            }
        })
        return response;


    } catch (error: any) {
        console.error(error);
        return error;
    }
}

const createNewSpot = async (data: any) => {
    const token = localStorage.getItem('token');
    const url = `${ process.env.REACT_APP_BACKEND_URL }/spots/`
    try {
        const formData = new FormData();
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('address', data.address)
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i])
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'bearer ' + token
            },
            body: formData
        })
        return response;


    } catch (error: any) {
        console.error(error);
        return error;
    }
}

export { getAllSpots, createNewSpot }
