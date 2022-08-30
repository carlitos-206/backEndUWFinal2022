export default function readTheDate(stringDate){
  let date = new Date(stringDate)
  return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}