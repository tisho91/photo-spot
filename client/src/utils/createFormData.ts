const createFormData = (data: any): FormData => {
    const formData = new FormData();
    for (const key in data) {
        if (!Array.isArray(data[key])) {
            formData.append(key, data[key]);
        } else {
            for (const i in data[key])
                formData.append(key, data[key][i])
        }
    }
    return formData;
}

export default createFormData;
