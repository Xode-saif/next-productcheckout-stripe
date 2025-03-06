export async function isValidPassword(password:string, hashedPassword:string){
    // console.log(await hashPassword(password))
    return await hashPassword(password) === hashedPassword
}

async function hashPassword(password:string){
    const arrayBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password)) //32-byte binary
    return Buffer.from(arrayBuffer).toString("base64")  //buffer to base64 for easy manipulation
}