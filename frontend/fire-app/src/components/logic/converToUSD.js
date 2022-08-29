export default function convertToUSD(num){
  if(num !== undefined || num !== null || num !==0) {
    let dollar = (num).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    return dollar
  }else{
    return 'Not Available'
  }
}