const createFormData = (data: any): FormData => {
    console.log(data)
    const formData = new FormData();
    for (const key in data) {
        if (data[key] instanceof FileList) {
            for (const i in data[key]) {
                console.log(key, data[key][i])
                formData.append(key, data[key][i])
            }
        } else {
            formData.append(key, data[key]);
        }
    }
    console.log(formData)
    return formData;
}

export default createFormData;
