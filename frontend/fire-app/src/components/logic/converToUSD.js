import checkVal from "./checkVal"

export default async function convertToUSD(num){
  let money = await checkVal(num)
  if(money !== undefined || money !== null || money === 'Not Available') {
    let dollar = (num).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    return dollar
  }else{
    return 'Not Available'
  }
}