interface ItemListType {
    [index: string] :
    {
        name : string,
        imgUrl: number
    }
}

export const ItemList : ItemListType = {
    "0" : {
        name: "Cubot",
        imgUrl: require('../../assets/images/EndoCubot.png')
    }, 
    "1" : {
        name: "Rolling Stitch",
        imgUrl: require('../../assets/images/RollingStitch.png')
    }, 
    "2" : {
        name: "TraCloser",
        imgUrl: require('../../assets/images/TraCloser.png')
    }, 
    "3" : {
        name: "Rolling Channel",
        imgUrl: require('../../assets/images/RollingChannel.png')
    }, 
    "4" : {
        name: "Insertrument",
        imgUrl: require('../../assets/images/Insertrument.png')
    }, 
    "5" : {
        name: "Robopera",
        imgUrl: require('../../assets/images/Robopera.png')
    }, 
}