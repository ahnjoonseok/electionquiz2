//시작변수
const startButton = document.getElementById('start-btn')
startButton.addEventListener('click', Start)
//질문변수
const questionContainer = document.getElementById('question-container')
let nextIndex

//결과변수
const resultContainer = document.getElementById('result-container')

//후보자변수


function Start()
{
    nextIndex = 0
    startButton.removeEventListener('click', initQuestion)
    initQuestion(questions[nextIndex])
}

function selectAnswer(e) {
  const selectedbutton = e.target
  const nextIndex = selectedbutton.dataset.value

  if(nextIndex > 99 && nextIndex < 200){
      const resultIndex = nextIndex - 100
      console.log(resultIndex)
      initResult(results[resultIndex])
      return
  }

  if(nextIndex > 199) {
    const realResultIndex = nextIndex - 200
    initMainResult(realResults[realResultIndex])
    return
  }

  initQuestion(questions[nextIndex])
}


//질문 생성
function initQuestion(questions)
{
    //박스 만들기
    const qBox = document.createElement("div")
    qBox.classList.add('q-box')
    questionContainer.appendChild(qBox)

    //사진 만들기
    const qImg = document.createElement("img")
    qImg.src = questions.image
    qImg.classList.add('q-img')
    qBox.appendChild(qImg)
    
    //질문 만들기
    const qTitle = document.createElement("h1")
    qTitle.classList.add('q-title')
    qTitle.innerText = questions.quesiton
    qBox.appendChild(qTitle)

    let delay = 1500

    //버튼 만들기
    questions.answer.forEach(answer => {

        const qButton = document.createElement("button")

        qButton.innerText = answer.text
        qButton.classList.add('q-btn')

        //버튼에 데이터심기
        qButton.dataset.value = answer.value
        qButton.dataset.category = answer.category
        qBox.appendChild(qButton)

        delay = delay + 500;
        //버튼 트랜지션
        setTimeout(() => {
            qButton.style.opacity = 1;
            qButton.addEventListener('click', selectAnswer )
        }, delay);

    })


    //화면 트랜지션
    setTimeout(() => {
        qBox.style.width = "100vw";        
    }, 100);
    
    //사진 트랜지션
    setTimeout(() => {
        qImg.style.opacity = 1;
    }, 900);

    //질문 트랜지션
    setTimeout(() => {
        qTitle.style.opacity = 1;
    }, 1200);

}




//인물결과값
function initMainResult(results) {

  //++++++++++++++++++++++++++누구일까!
  //배경
  const rBox = document.createElement("div")
  rBox.classList.add('r-box')
  rBox.style.backgroundColor = results.color
  resultContainer.appendChild(rBox)

  //로딩이미지
  const rImg = document.createElement("img")
  rImg.src = './img/man1.png'
  rImg.classList.add('r-img')
  rBox.appendChild(rImg)
  
  //타이틀
  const rReadyTitle = document.createElement("h1")
  rReadyTitle.innerText = "당신의 국회의원은.. 두구두구"
  rReadyTitle.classList.add('rr-title')
  rBox.appendChild(rReadyTitle)

  //박스발생
  setTimeout(() => {
    rBox.style.height = "100vh";       
    setTimeout(() => {
      rImg.style.opacity = 1;
      rReadyTitle.style.opacity = 1;  
      setTimeout(() => {
        rReadyTitle.classList.add('lefttrans')
        rReadyTitle.style.opacity = 0;
        rImg.style.opacity = 0;
      }, 4000);
    }, 300);

    
  }, 100);


  //++++++++++++++++++++++++진짜 결과
  setTimeout(() => {
    rBox.innerHTML = '';
  
    //이미지
    const rImg = document.createElement("img")
    rImg.classList.add('rr-img')
    rImg.src = results.image
    rBox.appendChild(rImg)
    //타이틀
    const rTitle = document.createElement("h1")
    rTitle.classList.add('rr-title')
    rTitle.innerText = results.title
    rBox.appendChild(rTitle)

    //하위설명텍스트
    const rText = document.createElement("p")
    rText.classList.add('rr-p')
    rText.innerText = results.text
    rBox.appendChild(rText)

    //다시하기
    const rButton = document.createElement("button")
    rButton.innerText = "처음부터 다시하기"
    rButton.addEventListener('click', allReset)
    rButton.classList.add('r-button')
    rBox.appendChild(rButton)
  
    setTimeout(() => {
      rTitle.style.opacity = 1;
      rImg.style.opacity = 1;
    }, 500);

    setTimeout(() => {
      rText.style.opacity = 1;
    }, 1000);

    setTimeout(() => {
      rButton.style.opacity = 1;
    }, 2000);

  }, 5500);





}


//꽝 결과값 
function initResult(results) {

  const rBox = document.createElement("div")
  rBox.classList.add('r-box')
  rBox.style.backgroundColor = results.color
  resultContainer.appendChild(rBox)
  
  const rImg = document.createElement("img")
  rImg.classList.add('r-img')
  rImg.src = results.image
  rBox.appendChild(rImg)

  const rTitle = document.createElement("h1")
  rTitle.classList.add('r-title')
  rTitle.innerText = results.title
  rBox.appendChild(rTitle)

  const rParag = document.createElement("p")
  rParag.innerText = " 당신이 선택한 국회의원은 "+ results.survive + "명 입니다.  " + "\n" + results.text
  rParag.classList.add('r-p')
  rBox.appendChild(rParag)

  const rButton = document.createElement("button")
  rButton.innerText = "처음부터 다시하기"
  rButton.addEventListener('click', allReset)
  rBox.appendChild(rButton)


  setTimeout(() => {
    rBox.style.height = "100vh";        
  }, 100);

  setTimeout(() => {
    rImg.style.opacity = 1;
  }, 500);

  setTimeout(() => {
    rTitle.style.opacity = 1;
    rParag.style.opacity = 1;
  }, 1000);
  
}

function allReset() {
  questionContainer.innerHTML = '';
  resultContainer.innerHTML = ''; 

}

const questions = [
    {
      //0
      quesiton: '내 정당 스타일은',
      image: './img/man3.png',
      answer: [
        { text: '진보쪽 정당이 좋다', value : 1},
        { text: '보수쪽 정당이 좋다', value : 100 },
        { text: '섞여있는 곳이 좋다', value : 100 }
      ]
    }
    ,
    {
      //1
      quesiton: '선호하는 성별이 있나?',
      image: './img/man2.png',
      answer: [
        { text: '정치는 여자가 잘하지', value: 2 },
        { text: '정치는 남자가 유리하지', value: 2 },
        { text: '소수를 대변하는 퀴어지!', value: 200 }
      ]
    },
    {
      //2
      quesiton: '게임을 좋아하는 국회의원',
      image: './img/man1.png',
      answer: [
        { text: '필요하다', value: 3 },
        { text: '게임같은 소리하네', value: 3 }
      ]
    },
    {
      //3
      quesiton: '국회의원의 나이는2',
      image: './img/man2.png',
      answer: [
        { text: '젊은 국회의원이 좋다', value: 4 },
        { text: '연륜이 있어야한다.', value: 0 }
      ]
    },
    {
      //4
      quesiton: '여성국회의원은2',
      image: './img/man4.png',
      answer: [
        { text: '많아져야한다', value: 100 },
        { text: '지금이 딱 좋다', value: 200 },
        { text: '더 없어져야한다', value: 201 }
      ]
    }
  ]

   
  
const results = [
  {
    title: "이부분은" +"\n"+ "아직 개발중이랍니다.",
    image: './img/man4.png',
    color: 'gray',
    survive: 0 ,
    text: "당신은 실패했습니다. 당신이 선택한 문항들. 모두 통과한 국회위원은 단 한 명도 없습니다" +"\n"+ "ddd" +"\n"+  "ddd" +"\n"+ "ddd" +"\n"+ "ddd" +"\n"+ "ddd" +"\n"+ "ddd" +"\n"+ "ddd" +"\n"+"ddd"  +"\n" +"ddd"
  },
  {
    title: "당신을 위한" +"\n"+ "국회위원은 없습니다",
    image: './img/man4.png',
    color: 'red',
    survive: 0 ,
    text: "당신은 실패했습니다. 당신이 선택한 문항들. 모두 통과한 국회위원은 단 한 명도 없습니다"
  }
]


const realResults = [

  {
    title: "당신을 위한" +"\n"+ "국회의원은 두명" +"\n"+ "임푸른과 김기홍이야",
    image: './img/man2.png',
    color: 'white',
    survive: 0 ,
    text: "비례대표중에 퀴어 국회위원은 두명이야." +"\n"+  "정의당의 임푸른과 녹색당의 김기홍" +"\n"+  "추가 텍스트"
  },
  {
    title: "당신을 위한" +"\n"+ "국회위원은 허경영입니다",
    image: './img/man1.png',
    color: 'red',
    survive: 0 ,
    text: "당신은 실패했습니다. 당신이 선택한 문항들. 모두 통과한 국회위원은 단 한 명도 없습니다"
  }

]