import ApiManager from "./ApiManager";

export const pelanggan_login = async data => {
    try {
        const result = await ApiManager('/pelanggan', {
            method:'POST',
            headers:{
                'Content-Type': "application/json"
            }
        })
    } catch (error) {
        
    }
}