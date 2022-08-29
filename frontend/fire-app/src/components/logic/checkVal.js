// this is a function that can be used accross the react app to check the values of undifined and null
// to give a better ux

export default function checkVal(val) {
  if(val === undefined || val === null){
    return 'Not Available'
  }else{
    return val
  }
}