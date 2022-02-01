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

export { getAllSpots }
