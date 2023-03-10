const postData = async (url, data) => { // async позволяет дождаться результата запроса
    const res = await fetch(url, { // ждем окончания завпроса, который в await
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    
    return await res.json()
}

async function getResource(url) { // async позволяет дождаться результата запроса
    let res = await fetch(url)

    if (!res.ok) {
        throw new Error(`couldn't fetch ${url}, status: ${res.status}`) // конструирование выкидывания ошибки
    }
    
    return await res.json()
}

export {postData}
export {getResource}