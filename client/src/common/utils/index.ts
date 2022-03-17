import { TokenData } from '../interfaces';

export const createFormData = (data: any): FormData => {
    const formData = new FormData();
    for (const key in data) {
        if (data[key] instanceof FileList) {
            for (const i in data[key]) {
                formData.append(key, data[key][i])
            }
        } else if (key === 'coordinates') {
            for (const i in data[key]) {
                formData.append(`${ key }[${ i }]`, data[key][i])
            }
        } else {
            formData.append(key, data[key]);
        }
    }
    return formData;
}

export const getTokenData = (): TokenData => {
    let tokenExpirationDate = localStorage.getItem('tokenExpirationDate');
    let token = localStorage.getItem('token');
    if (tokenExpirationDate) {
        const tokenExpiration = new Date(tokenExpirationDate);
        if (tokenExpiration < new Date()) {
            token = null;
            tokenExpirationDate = null;
        }
    }
    return {
        token,
        tokenExpirationDate
    }
}

export const createFileReader = (fileToRead: Blob): void => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
    };
    fileReader.readAsDataURL(fileToRead)
}

// TODO add Event Name interface or Enum
export const attachEvent = (eventName: string, cb: EventListenerOrEventListenerObject) => document.addEventListener(eventName, cb)

export * from './validationSchemas'
