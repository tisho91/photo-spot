const register = async (userData: any) => {

    const url = `${ process.env.REACT_APP_BACKEND_URL }/users/signup`
    return await sendAuthRequest(url, userData)
}

const login = async (userData: any) => {
    const url = `${ process.env.REACT_APP_BACKEND_URL }/users/login`
    return await sendAuthRequest(url, userData)
}

const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    const url = `${ process.env.REACT_APP_BACKEND_URL }/users/me`
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + token
            }
        })
        return response;


    } catch (error: any) {
        return error;
    }
}


const sendAuthRequest = async (url: string, userData: any) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        return response;


    } catch (error: any) {
        console.error(error);
        return error;
    }
}
// TODO - fix
const updateUserProfile = async (name:string,image: any) => {
    const token = localStorage.getItem('token');
    const url = `${ process.env.REACT_APP_BACKEND_URL }/users/me`;
    try {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('avatar', image)
        const response = await fetch(url, {
            method: 'PATCH',
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


export { register, login, updateUserProfile, getCurrentUser }
