var jsonObj = [
    {
      "question": "Find the sum of 111 + 222 + 333",
      "options": [
        {
          "iscorrect": false,
          "option": "A. 700"
        },
        {
          "iscorrect": true,
          "option": "B. 666"
        },
        {
          "iscorrect": false,
          "option": "C. 10"
        },
        {
          "iscorrect": false,
          "option": "D.100"
        }
      ],
      "percentage": 69.9
    },
    {
      "question": "Subtract 457 from 832",
      "options": [
        {
          "iscorrect": true,
          "option": "A. 375"
        },
        {
          "iscorrect": false,
          "option": "B. 57"
        },
        {
          "iscorrect": false,
          "option": "C. 376"
        }
      ],
      "percentage": 80.9
    },
    {
      "question": "50 times 5 is equal to",
      "options": [
        {
          "iscorrect": false,
          "option": "A. 2500"
        },
        {
          "iscorrect": false,
          "option": "B. 505"
        },
        {
          "iscorrect": false,
          "option": "C. 500"
        },
        {
          "iscorrect": true,
          "option": "D. None of these"
        }
      ],
      "percentage": 80.9
    },
    {
      "question": "Simplify: 26 + 32 - 12",
      "options": [
        {
          "iscorrect": false,
          "option": "A. 0"
        },
        {
          "iscorrect": true,
          "option": "B. 46"
        },
        {
          "iscorrect": false,
          "option": "C. 56"
        },
        {
          "iscorrect": false,
          "option": "D. None of these"
        }
      ],
      "percentage": 90.9
    },
    {
      "question": "Find the product of 72 X 3",
      "options": [
        {
          "iscorrect": true,
          "option": "A. 216"
        },
        {
          "iscorrect": false,
          "option": "B. 7230"
        },
        {
          "iscorrect": false,
          "option": "C. 106"
        },
        {
          "iscorrect": false,
          "option": "D. 372"
        }
      ],
      "percentage": 70.9
    }
  ];
  var ansFlag;
  var nextQues = 0;
  var correctAns = '';
  var correctCount = 0;
  var totalQues = 0;
  var jsonData;
  
  function getFromJSON(){
	var xhttp;
	if (window.XMLHttpRequest) {
		// code for modern browsers
		xhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			jsonData = JSON.parse(this.responseText); 

			console.log(jsonData);
		}
	};
	xhttp.open("GET", "jsonData.json", true);
	xhttp.send();
  }

  function getJsonData(index){
	  
	getFromJSON();
	
    totalQues = jsonObj.length;
    document.querySelector("#correctCount").innerHTML = correctCount;
    document.querySelector("#totalCount").innerHTML = totalQues;

    if(typeof(jsonObj[index]) == 'undefined'){
        document.querySelector(".nextBtn").setAttribute("disabled","disabled");
    }
    if(typeof(jsonObj[index]) != 'undefined'){
        document.querySelector(".subBtn").setAttribute("disabled","disabled");
        document.querySelector("#dispQues").innerHTML = 'Question '+ (index+1) + ': ' + jsonObj[index].question;
        document.querySelector("#dispOpt").innerHTML = '';
        document.querySelector("#dispRes").innerHTML = '';

        for(var i=0;i<jsonObj[index].options.length;i++){            
            if(jsonObj[index].options[i].iscorrect == true){
                correctAns = jsonObj[index].options[i].option;                
            }
            document.querySelector("#dispOpt").innerHTML += "<div class='options'><input type='radio' name='ansOption' class='ansOption' onclick='getAns("+jsonObj[index].options[i].iscorrect+")'><div class='optVal'>&nbsp;&nbsp;"+jsonObj[index].options[i].option+"</div></div>";     
        }
    }        
  }
  
  function getAns(value){
    document.querySelector(".subBtn").removeAttribute("disabled");
    ansFlag = value;
  }

  function submitAns(){
    if(ansFlag == true){
        correctCount++;
        document.querySelector("#dispRes").innerHTML  = "<h4 class='correctAns'>Correct<h4>";        
        document.querySelector("#correctCount").innerHTML = correctCount;
        document.querySelector("#totalCount").innerHTML = totalQues;
    }
    else{
        document.querySelector("#dispRes").innerHTML  = "<h4 class='wrongAns'>Wrong<h4><h4 class='dispAns'>Correct Answer is "+ correctAns;     
    }    
  }

  function nextQuestion(){    
    nextQues++;    
    getJsonData(nextQues);
    
    if((nextQues+1) == totalQues){        
      document.querySelector(".nextBtn").setAttribute("disabled","disabled");    
    }       
  }

  function endQuiz(){
    document.querySelector("#correctCount").innerHTML = correctCount;
    document.querySelector("#totalCount").innerHTML = totalQues;    
  }