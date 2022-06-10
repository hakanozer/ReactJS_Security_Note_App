import CryptoJS from 'crypto-js'

const secretKey = process.env.REACT_APP_SECRET_KEY!
export const encrypt = (plaintText : string) => {
    const ciphertext = CryptoJS.AES.encrypt(plaintText, secretKey)
    return ciphertext.toString()
}

export const decrypt = ( ciphertext: string ) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
    var plaintText = bytes.toString(CryptoJS.enc.Utf8);
    return plaintText
}

export const firstCharUpper = (data:string) : string =>  {
    const st = data.charAt(0).toUpperCase() + data.slice(1);
    return st
}