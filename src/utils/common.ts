export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
// export const handleRequest = async <T = any >(request: any):Promise<T>  => {
//   try {
//     const response = await request
//     return response
//   } catch (error) {
//     throw new Error(error)
//   }
// }
// get excute time from await function
// export const getExcuteTime = async (func: any) => {
//   const start = performance.now()
//   await func
//   const end = performance.now()
//   return end - start
// }
export const millisecondsToSeconds = (milliseconds: number) => {
  return milliseconds / 1000
}
