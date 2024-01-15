interface dataObject {
    id: number,
    titleLink: string,
    codeSnippet: string,
    approch: string,
    rating: number,
}

const MakeItUnique = (arr: dataObject[]):dataObject[] => {
    const newArr:dataObject[] = [];
    arr.forEach((item) => {
        if (!newArr.some((newItem) => newItem.id === item.id)) {
            newArr.push(item);
        }
    });
    return newArr;
};

export {MakeItUnique};