function isEmpty(val: any) {
  if (
    val === '' ||
    val === null ||
    val === undefined ||
    (val !== null && typeof val === 'object' && !Object.keys(val).length)
  ) {
    return true; // 비었음
  }
}

export { isEmpty };
