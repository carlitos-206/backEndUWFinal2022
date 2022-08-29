export default function totalAcres(startDate, endDate, dailyAcres, totalAcres){
  if(totalAcres === null || totalAcres === undefined){
    if(dailyAcres !==null || dailyAcres !==undefined){
      let start = new Date(startDate);
      let end = new Date(endDate)    
      let days = end - start
      if(days === 0){
        return dailyAcres
      }
      let totalAcre_estimate =  Math.round((days * dailyAcres)*100)/100
      return totalAcre_estimate
    }else{
      return 'Not Available'
    }
  }else{
    return totalAcres
  }
}
