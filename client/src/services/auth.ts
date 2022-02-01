const register = async (userData: any) => {

    const url = `${ process.env.REACT_APP_BACKEND_URL }/users/signup`
    return await sendAuthRequest(url, userData)
}

const login = async (userData: any) => {
    const url = `${ process.env.REACT_APP_BACKEND_URL }/users/login`
    return await sendAuthRequest(url, userData)
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
const uploadAvatar = async (image: any) => {
    const url = `${ process.env.REACT_APP_BACKEND_URL }/users/uploadAvatar`;
    try {
        const formData = new FormData();
        formData.append('avatar', image)
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        })
        return response;


    } catch (error: any) {
        console.error(error);
        return error;
    }
}


export { register, login, uploadAvatar }
