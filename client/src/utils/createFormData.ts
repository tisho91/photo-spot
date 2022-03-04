const createFormData = (data: any): FormData => {
    const formData = new FormData();
    for (const key in data) {
        if (data[key] instanceof FileList) {
            for (const i in data[key]) {
                formData.append(key, data[key][i])
            }
        } else if (data[key] instanceof Object) {
            for (const i in data[key]) {
                formData.append(`${ key }[${ i }]`, data[key][i])
            }
        } else {
            formData.append(key, data[key]);
        }
    }
    return formData;
}

export default createFormData;
