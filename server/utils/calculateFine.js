function calculateFine(dueDate, returnDate) {
  const finePerDay = 10;
  //THE duedate AND returnDate MUST BE CONVERTED FROM STRING TO OBJECTS
  const due = new Date(dueDate);
  const returned = new Date(returnDate);

  if (returned <= due) {
    return 0;
  }

  const diffDays = Math.ceil(
    (returned - due) / (24 * 60 * 60 * 1000)
  );

  return diffDays * finePerDay;
}

export default calculateFine;