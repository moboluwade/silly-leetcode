package main

import "
	math
"
func checkPositive(value int32)bool{
    if value>0 {
        return true
    }
    return false
}
func checkNegative(value int32)bool{
    if value<0 {
        return true
    }
    return false
}
func checkZero(value int32)bool{
    if value ==0 {
        return true
    }
    return false
}
func formatTo6dp(value float64){
    
    fmt.Printf("%.6f\n", value)
}
func plusMinus(arr []int32) {
    var positiveCount = 0
    var negativeCount = 0
    var zeroCount = 0
    
    // Write your code here
    var total int = len(arr)
    for i:=0; i<total; i++ {
     if checkPositive(arr[i]){
        positiveCount++;
     }
     if checkNegative(arr[i]){
        negativeCount++;
     }
     if checkZero(arr[i]){
        zeroCount++
     }
    }
    
    formatTo6dp(float64(positiveCount)/float64(total))
    formatTo6dp(float64(negativeCount)/float64(total))
    formatTo6dp(float64(zeroCount)/float64(total))

}
