interface ItemListType {
    [index: string] :
    {
        name : string,
        imgUrl: number
    }
}

export const ItemList : ItemListType = {
    "0" : {
        name: "Robopera",
        imgUrl: require('../../assets/images/Robopera.png')
    }, 
    "1" : {
        name: "Endo Cubot",
        imgUrl: require('../../assets/images/EndoCubot.png')
    }, 
    "2" : {
        name: "Rolling Stitch",
        imgUrl: require('../../assets/images/RollingStitch.png')
    }, 
    "3" : {
        name: "Rolling Channel",
        imgUrl: require('../../assets/images/RollingChannel.png')
    }, 
}