const convertMetersToKm = (meters) => {
    const kilometers =  (meters / 1000).toFixed(1);
    return kilometers;
}

export default convertMetersToKm;