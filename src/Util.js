import {Dimensions,PixelRatio,Platform} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例
let pixelRatio = PixelRatio.get();      //当前设备的像素密度
const defaultPixel = 2;
//iphone6的像素密度
//px转换成dp
const defaultW = Platform.OS ==='ios'?750:720;
const defaultH = Platform.OS ==='ios'?1334:1280;
const w2 = defaultW / defaultPixel;
const h2 = defaultH / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例
//noinspection JSAnnotator
/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */
export function setSpText(size: number) {
     // size = size/pixelRatio;
   size = Math.round((size * scale)/ fontScale);
    return size;
}


//noinspection JSAnnotator
export function scaleSize(size: number) {

    size = Math.round(size * scale + 0.5);
    return size / defaultPixel;
}

/**
 * 工具类
 */
export const _ = {
    /*
     * 根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
     * 
    */
    get(object, path, defaultValue){
        if((Object.prototype.toString.call(object) !== '[object Object]') && (Object.prototype.toString.call(object) !== '[object Array]')){
        throw new Error('object 必须是对象或者是数组')
        }else{
        let params = [];
        if( typeof path === 'string'){
            params = path.split('.');
        }else if(Object.prototype.toString.call(path) === '[object Array]'){
            params = path;
        }else{
            throw new Error('path 必须是个字符串或者数组')
        }

        while(params.length>0){
            // console.log(params);
            let key = params.shift();
            // console.log(key);
            if(object[key] === undefined){
            return defaultValue;
            }
            object = object[key];
        } 
        return object;
        }
    },
    /**
     * 向下取整，并且保留两位小数
     * @param {*} str 
     * @param {*} num 
     */
    floorFixed(str, num = 2){
        try {
            return (+(str+'').replace(/(\.\d\d)\d*$/,'$1')).toFixed(num)
        } catch (error) {
            throw new Error('floorFiexd 转化出了问题，请检查参数')
        }
    }
}



function outputmoney(number) {
    number = number.toString(10);
    number = number.replace(/\,/g, "");
    if(isNaN(number) || number == "")return "";
    number = Math.round(number * 100) / 100;
    if (number < 0)
        return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
    else
        return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
}
//格式化金额
function outputdollars(number) {
    if (number.length <= 3)
        return (number == '' ? '0' : number);
    else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
}
function outputcents(amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}
compareVersionNumber = (ServerPram,LocalPram) => {
    let v1g = ServerPram.split(".");
    let v2g = LocalPram.split(".");
    let flag = false;
    for (var i=0;i<3;i++) {
        if (parseInt(v1g[i]) > parseInt(v2g[i]))  {
            flag = true;
            return flag;
        }else if (parseInt(v1g[i]) == parseInt(v2g[i])){
        }else{
            return flag;
        }
    }
    return flag;
}
global.FONT = setSpText;
global._ = _;

global.SCALE = scaleSize;

global.WIDTH = deviceWidth;

global.HEIGHT = deviceHeight;

global.outputmoney = outputmoney;
global.outputdollars = outputdollars;
console.log(global);


