const extractTitle = (url: string):string =>{
    const urlSplit = url.split('/')
    let problemsId = 4;
    for(let i = 0; i < urlSplit.length; i++){
        if(urlSplit[i] === 'problems'){
            problemsId = i
            break
        }
    }
    let title = urlSplit[problemsId + 1]
    const TitleSplits = title.split('_')
    title = TitleSplits[0] 
    return title
}

export {extractTitle}