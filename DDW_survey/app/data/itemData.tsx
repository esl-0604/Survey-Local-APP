interface ItemListType {
    [index: string] :
    {
        name : string,
        imgUrl: number
    }
}

export const ItemList : ItemListType = {
    "0" : {
        name: "Rolling-Stitch",
        imgUrl: require('../../assets/images/RollingStitch.png')
    }, 
    "1" : {
        name: "TraCloser",
        imgUrl: require('../../assets/images/TraCloser.png')
    }, 
    "2" : {
        name: "Rolling-Channel",
        imgUrl: require('../../assets/images/RollingChannel.png')
    }, 
    "3" : {
        name: "Robopera",
        imgUrl: require('../../assets/images/Robopera.png')
    }, 
    "4" : {
        name: "Endo-Cubot",
        imgUrl: require('../../assets/images/EndoCubot.png')
    }, 
    "5" : {
        name: "Insertrument",
        imgUrl: require('../../assets/images/Insertrument.png')
    }, 
}