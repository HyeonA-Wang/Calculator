let resultDiv = document.getElementById('result');
let type = "initial";
let interim = 0;
let arr = [];

function checkFirstInput(inputElement){
    console.log(type)
    let inputValue = inputElement.value
    let inputType = checkType(inputValue);
    
    if(type=="initial"){
        firstInput(inputType, inputValue);
    }
    else{
        notFirstInput(inputType, inputValue);
    }
}

// 첫 입력일 경우
function firstInput(inputType, inputValue){
    if(inputType=="number"){
        checkPush(inputType);
        changeType(inputType);

        interimCalculation(inputValue);
    }else{
        clearResult();
    }
}

// 첫 입력이 아닐경우
function notFirstInput(inputType, inputValue){

    if(inputValue=="delete"){
        interimCalculation2();
        return;
    }

    checkPush(inputType);
    changeType(inputType);

    if(inputValue=="equal"){
        calculationArray();
        cleanArray();
    }
    else{
        if(inputType=="number"){
            interimCalculation(inputValue);
            
        }else if(inputType=="sign"){
            saveInterimSign(inputValue);
        }
    }   
}

// 현재 입력받고 있는 타입 변경
function changeType(inputType){
    // console.log("현재 타입 : " + type);
    type = inputType;
    // console.log("변경된 타입 : " + type);
}


// 숫자인지 부호인지 판독
function checkType(checkValue){
    if(!isNaN(checkValue)){
        return "number";
    }
    else{
        return "sign";
    }
}

// Array 푸시 할건지 체크
function checkPush(inputType){
    if(type=="initial"){}
    else if(type != inputType){
        pushArray();
    }
}

// 입력받은 수 계산
function interimCalculation(inputNumber){
    interim = interim*10 + Number(inputNumber);
    printResult(interim);
    console.log("interim(숫자) : " + interim)
}

// 입력받은 부호 저장
function saveInterimSign(inputSign){
    interim = inputSign;
    //console.log("interim(부호) : " + interim);
}

// Array에 저장
function pushArray(){
    arr.push(interim);
    console.log("누적된 배열 : " + arr);
    calculationArray();
    clearInterim();
}

// 중간계산값 정리(초기화)
function clearInterim(){
    interim = 0;
}

// 배열 값 계산
function calculationArray(){
    result = arr[0];
    if(arr.length <= 2){
        console.log("배열 길이가 2이하일때 result :" + result);
        printResult(result);
    }
    for(i=2; i<arr.length; i+=2){
        //console.log("반복문 들어옴");
        printResult(result);
        result = calculationAtSign(result, arr[i-1], arr[i]);
    }
    printResult(result)
}

//부호별 계산기
function calculationAtSign(num1, sign, num2){
    if(sign=="plus")
        return num1+num2;
    else if(sign=="subtract")
        return num1-num2;
    else if(sign=="multiply")
        return num1*num2;
    else if(sign=="divide")
        return num1/num2;

}

// 뒤에서부터 한자리씩 제거
function interimCalculation2(){
    interim = Math.floor(interim/10);
    console.log("del한 결과 : " + interim);
    printResult(interim);
}

// 결과화면 출력
function printResult(result){
    resultDiv.innerText = result;
}

function clearResult(){
    resultDiv.innerText = "";
}

// 초기상태로 ㄱㄱ
function cleanArray(){
    type = "initial";
    interim = 0;
    arr = [];
}