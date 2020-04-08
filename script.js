
$(document).ready(function(){

  //Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create','UA-53828044-1','auto');
    ga('require', 'displayfeatures');
    ga('send','pageview');

  // SNS LINK
  function sharefb(url) {
    window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
  };

  function sharetwit(url, text) {
    window.open('http://twitter.com/intent/tweet?text=' + text + '&url=' + url);
  };

  $('#facebook').on("click", function() {
    sharefb('http://mabu.newscloud.sbs.co.kr/202002corona2/');
  });

  $('#twitter').on("click", function() {
    sharetwit('http://mabu.newscloud.sbs.co.kr/202002corona2/', 'SBS마부작침: ');
  });
});




Kakao.init('3304e8a619f256f70fd0c71f5cc846a7');
function sendLink() {
  Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '신종 코로나 바이러스 타임라인, 한눈에 보기',
        description: '마부작침은 한국의 신종 코로나 감염 상황과 감염자 동선을 날짜별로 알기 쉽게 정리했습니다.',
        imageUrl: 'https://img.sbs.co.kr/newimg/news/20200205/201399454.jpg',
        link: {
          mobileWebUrl: 'http://mabu.newscloud.sbs.co.kr/202002corona2/index.html',
          webUrl: 'http://mabu.newscloud.sbs.co.kr/202002corona2/index.html'
        }
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'http://mabu.newscloud.sbs.co.kr/202002corona2/index.html',
            webUrl: 'http://mabu.newscloud.sbs.co.kr/202002corona2/index.html'
          }
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: 'http://mabu.newscloud.sbs.co.kr/202002corona2/index.html',
            webUrl: 'http://mabu.newscloud.sbs.co.kr/202002corona2/index.html'
          }
        }
      ]
  });
}

//시작변수
const startButton = document.getElementById('start-btn')
startButton.addEventListener('click', Start)
//질문변수
const questionContainer = document.getElementById('question-container')
let nextIndex
let lastqImg

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
    lastqImg = questions.afterimage
    qImg.classList.add('q-img')
    qBox.appendChild(qImg)

    //질문 만들기
    const qTitle = document.createElement("h1")
    qTitle.classList.add('q-title')
    qTitle.innerText = questions.quesiton
    qBox.appendChild(qTitle)

    let delay = 100

    //버튼 만들기
    questions.answer.forEach(answer => {

        const qButton = document.createElement("button")

        qButton.innerText = answer.text
        qButton.classList.add('q-btn')

        //버튼에 데이터심기
        qButton.dataset.value = answer.value
        qButton.dataset.category = answer.category
        qBox.appendChild(qButton)

        delay = delay + 100;
        //버튼 트랜지션
        setTimeout(() => {
            qButton.style.opacity = 1;
            qButton.addEventListener('click', selectAnswer )
        }, delay);

    })

    const footdiv = document.createElement("div")
    footdiv.classList.add('footdiv')
    qBox.appendChild(footdiv)


    //화면 트랜지션
    setTimeout(() => {
        qBox.style.width = "100vw";
    }, 100);

    //사진 트랜지션
    setTimeout(() => {
        qImg.style.opacity = 1;
    }, 100);

    //질문 트랜지션
    setTimeout(() => {
        qTitle.style.opacity = 1;
    }, 100);

}




//인물결과값
function initMainResult(results) {

  //++++++++++++++++++++++++++누구일까!
  //배경
  const rBox = document.createElement("div")
  rBox.classList.add('r-box')

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
      }, 100);
    }, 100);


  }, 100);


  //++++++++++++++++++++++++진짜 결과
  setTimeout(() => {
    rBox.innerHTML = '';
    rBox.style.backgroundColor = results.color
    
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
    rText.innerHTML = results.text
    rBox.appendChild(rText)

    //다시하기
    const rButton = document.createElement("button")
    rButton.innerText = "처음부터 다시하기"
    rButton.addEventListener('click', allReset)
    rButton.classList.add('r-button')
    rBox.appendChild(rButton)

    const footdiv = document.createElement("div")
    footdiv.classList.add('footdiv')
    rBox.appendChild(footdiv)

    setTimeout(() => {
      rTitle.style.opacity = 1;
      rImg.style.opacity = 1;
    }, 100);

    setTimeout(() => {
      rText.style.opacity = 1;
    }, 100);

    setTimeout(() => {
      rButton.style.opacity = 1;
    }, 100);

  }, 100);





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
  rTitle.innerHTML = results.title
  rBox.appendChild(rTitle)

  const rParag = document.createElement("p")
  rParag.innerHTML = results.text
  rParag.classList.add('r-p')
  rBox.appendChild(rParag)

  const rButton = document.createElement("button")
  rButton.innerText = "처음부터 다시하기"
  rButton.addEventListener('click', allReset)
  rBox.appendChild(rButton)

  const footdiv = document.createElement("div")
  footdiv.classList.add('footdiv')
  rBox.appendChild(footdiv)

  setTimeout(() => {
    rBox.style.height = "100vh";
  }, 100);

  setTimeout(() => {
    rImg.style.opacity = 1;
  }, 100);

  setTimeout(() => {
    rTitle.style.opacity = 1;
    rParag.style.opacity = 1;
  }, 100);

}

function allReset() {
  questionContainer.innerHTML = '';
  resultContainer.innerHTML = '';

}

const questions = [
    {
      //0
      quesiton: '너는 진보니 보수니',
      image: './img/questions/02.jpg',
      answer: [
        { text: '난 보수나 우파', value : 1},
        { text: '난 둘 다!', value : 2 },
        { text: '난 진보나 좌파', value : 3 }
      ]
    },
    {
      //1 - 보수 1차 질문
      quesiton: '지금 이 시점에 가장 중요한 이슈는?',
      image: './img/questions/03.jpg',
      answer: [
        { text: '무엇보다 중요한건 시장경제 회복!', value: 4 },
        { text: '자유민주주의가 최우선', value: 5 },
        { text: '기초소득을 국민에게 지원해야해', value: 100 },
        { text: '아닌데? 다른 이슈가 중요해', value: 6 }
      ]
    },
    {
      //2 - 짬뽕 1차 질문
      quesiton: '정당이면 후보자 두 자릿수는 돼야지',
      image: './img/questions/04.jpg',
      answer: [
        { text: '그건 그래', value: 7 },
        { text: '난 소수파가 좋아', value: 101 }
      ]
    },
    {
      //3 진보 1차 질문
      quesiton: '지금 이 시점에 가장 중요한 이슈는?',
      image: './img/questions/03.jpg',
      answer: [
        { text: '여성이 안전한 나라', value: 8 },
        { text: '환경이 미래다', value: 9 },
        { text: '노동! 복지! 우오오오!', value: 102 },
        { text: '국회개혁이 우선이야!', value: 10 }
      ]
    },
    {
      //4     2차 질문
      quesiton: '경제 정책 어떤걸 손봐야할까?',
      image: './img/questions/06.jpg',
      answer: [
        { text: '최저임금 재조정이 필요해', value: 11},
        { text: '비정규직을 정규직으로 전환해야 해', value: 12 }
      ]
    },
    {
      //5
      quesiton: '박근혜 전 대통령 탄핵 어떻게 생각해?',
      image: './img/questions/07.jpg',
      answer: [
        { text: '어쨌거나 탄핵당할 만했지', value: 103 },
        { text: '응 무효', value: 13 }
      ]
    },
    {
      //6
      quesiton: '그러면 뭐가 가장 중요해?',
      image: './img/questions/08.jpg',
      answer: [
        { text: '안보 강화가 최우선이지', value: 104 },
        { text: '차별금지법을 없애야 해', value: 105 },
        { text: '정책 같은 건 중요치 않아!', value: 106 }
      ]
    },
    {
      //7 허경영 저격질문
      quesiton: '코로나 긴급지원금 1억원씩 줘야 해!',
      image: './img/questions/09.jpg',
      answer: [
        { text: '100만원 갖고도 시끄러운데 가능할까?', value: 14 },
        { text: '이렇게 힘든데 1억원씩은 줘야지', value: 200 }
      ]
    },
    {
      //8
      quesiton: '그러려면 정당 후보가 두 자릿수는 돼야지!',
      image: './img/questions/04.jpg',
      answer: [
        { text: '맞아! 그래야 추진력이 생기지', value: 15 },
        { text: '난 소수정당이 좋아', value: 107 }
      ]
    },
    {
      //9
      quesiton: '에너지 정책은 어떻게 하지?',
      image: './img/questions/11.jpg',
      answer: [
        { text: '원자력 OUT! 탈원전 가즈아', value: 16 },
        { text: '우선 석탄부터 재생에너지로 바꾸자', value: 17 }
      ]
    },
    {
      //10    3차 질문
      quesiton: '청와대에도 있어봐야 국정을 알지',
      image: './img/questions/12.jpg',
      answer: [
        { text: '맞아! 그건 그렇겠네', value: 108 },
        { text: '청와대는 잘 몰라도 방송경험 있잖아', value: 109 },
        { text: '청와대, 방송경험 없어도 능력만 있으면 돼!', value: 18 }
      ]
    },
    {
      //11 //////////////////////////////////////////////////////////////////////////여기부터 다시
      quesiton: '이런 건 누가 더 잘 할까?',
      image: './img/questions/21.jpg',
      answer: [
        { text: '연륜있는 70대 이상이 잘하지', value: 19 },
        { text: '경제는 4050이 잘 알잖아', value: 20 },
        { text: '알바 경험 많은 2030이지', value: 110 }
      ]
    },
    {
      //12
      quesiton: '힘 있는 정당 소속이면 좋겠지?',
      image: './img/questions/14.jpg',
      answer: [
        { text: '작은 정당도 괜찮아', value: 111 },
        { text: '응, 그래야 실현 가능성이 있지', value: 112 }
      ]
    },
    {
      //13
      quesiton: '국회 경험이 있어야 할까?',
      image: './img/questions/20.jpg',
      answer: [
        { text: '4선 의원 정도는 돼야지!', value: 201 },
        { text: '당 대변인쯤은 기본이야!', value: 202 }
      ]
    },
    {
      //14
      quesiton: '코로나 시국에 필요한 대책은 뭐지?',
      image: './img/questions/16.jpg',
      answer: [
        { text: '질병관리본부를 질병통제청으로 확대 개편', value: 21 },
        { text: '다 죽겠대, 자영업자부터 살려야 해!', value: 22 }
      ]
    },
    {
      //15
      quesiton: '아무래도 전과는 없어야겠지?',
      image: './img/questions/17.jpg',
      answer: [
        { text: '각자 사연이 있어. 모든 전과가 문제는 아냐', value: 203 },
        { text: '법 잘 지켰던 사람들이 법도 잘 만들지 않을까?', value: 23 }
      ]
    },
    {
      //16
      quesiton: '탈핵하려면 어떤 사람이 잘 할것 같아?',
      image: './img/questions/18.jpg',
      answer: [
        { text: '퀴어가 정치다', value: 204 },
        { text: '마더 가이아! 여성이 정치를 잘하지', value: 205 },
        { text: '정치는 남자가 잘하지', value: 113 }
      ]
    },
    {
      //17
      quesiton: '이런 의원도 한 번 보고 싶다!',
      image: './img/questions/19.jpg',
      answer: [
        { text: '게임에 관심있는 국회의원', value: 206 },
        { text: 'LGBT 국회의원', value: 207 },
        { text: '이민자 출신 국회의원', value: 208 },
        { text: '아직 없어도 돼', value: 24 }
      ]
    },
    {
      //18
      quesiton: '아무래도 전과는 없어야겠지?',
      image: './img/questions/17.jpg',
      answer: [
        { text: '법 잘 지킨 사람이 법도 잘 만들겠지', value: 25 },
        { text: '전과에도 사연이 있어. 모두 문제는 아냐', value: 209 }
      ]
    },
    {
      //19
      quesiton: '어떤 사람이 좋을까?',
      image: './img/questions/20.jpg',
      answer: [
        { text: '아무나 할 수 없잖아, 공직 경험이 필요해', value: 210 },
        { text: '애국선열의 뜻을 잊지 말고 계승해야 해', value: 211 }
      ]
    },
    {
      //20
      quesiton: '어떤 사람이 좋을까?',
      image: './img/questions/20.jpg',
      answer: [
        { text: '언론 경험이 있거나 홍보전문가라면 좋겠어', value: 212 },
        { text: '뭔가 주도하고 지휘했던 경험이 필요해', value: 213 },
        { text: '좌절을 이겨낸 경험이 중요하지', value: 214 },
      ]
    },
    {
      //21
      quesiton: '이런 건 누가 더 잘 할까?',
      image: './img/questions/21.jpg',
      answer: [
        { text: '2030이 미래야', value: 215 },
        { text: '적어도 40대 이상! 연륜이 있어야지', value: 26 }
      ]
    },
    {
      //22
      quesiton: '자영업자 부양책, 누가 잘 할까?',
      image: './img/questions/21.jpg',
      answer: [
        { text: '알바 경험 많은 20대가 필요해', value: 114 },
        { text: '경험도 있고 사회생활 좀 해본 30~50대', value: 217 },
        { text: '연륜이 있어야지! 60대 이상', value: 216 }
      ]
    },
    {
      //23
      quesiton: '어떤 사람이 더 잘 할까?',
      image: './img/questions/21.jpg',
      answer: [
        { text: '성감수성 더 민감한 2030이 좋아', value: 27 },
        { text: '4060 아재도 노력하면 가능해', value: 218 },
        { text: '연륜의 끝판왕 70대 이상', value: 115 }
      ]
    },
    {
      //24
      quesiton: '경험과 패기 누가 더 잘 해낼까?',
      image: './img/questions/21.jpg',
      answer: [
        { text: '그래도 젊은 감성 2030이 좋아', value: 28 },
        { text: '경험있는 4060이 필요해', value: 29 },
        { text: '연륜의 끝판왕 70대 이상', value: 116 }
      ]
    },
    {
      //25
      quesiton: '경험과 패기 누가 더 잘 해낼까?',
      image: './img/questions/21.jpg',
      answer: [
        { text: '패기넘치는 2030이 잘할거야', value: 117 },
        { text: '경험있는 4060이 필요해', value: 219 },
        { text: '연륜의 끝판왕 70대 이상', value: 118 }
      ]
    },
    {
      //26
      quesiton: '어떤 사람이 좋을까?',
      image: './img/questions/20.jpg',
      answer: [
        { text: '뉴페이스가 필요해', value: 220 },
        { text: '의정 경험이 있는 게 좋겠어', value: 221 }
      ]
    },
    {
      //27
      quesiton: '누가 더 잘 할까?',
      image: './img/questions/20.jpg',
      answer: [
        { text: '이런 건 여성이지', value: 222 },
        { text: '퀴어도 잘 알거야', value: 119 },
        { text: '남성의 시선도 필요해', value: 223 }
      ]
    },
    {
      //28
      quesiton: '어떤 후보자 뽑고 싶어?',
      image: './img/questions/20.jpg',
      answer: [
        { text: '세상을 향해 소리내는 여성 후보자', value: 224 },
        { text: '세상을 향해 소리내는 남성 후보자', value: 120 },
        { text: '세상을 향해 소리내는 퀴어 후보자', value: 121 }
      ]
    },
    {
      //29
      quesiton: '어떤 경험이 국회 활동에 도움될까?',
      image: './img/questions/23.jpg',
      answer: [
        { text: '정당 활동이 중요하지', value: 225 },
        { text: '시민의 발 대중교통 종사자', value: 226 },
        { text: '학생들을 가르치는 전문 강사', value: 227 }
      ]
    }
  ]


//빠른결과
const results = [
  {
    //100번 남북통일당 대한민국당 엔딩
    title: "넌 누구냐?",
    image: './img/results/results-03.png',
    color: '#7d7d8d',
    survive: 0 ,
    text: "당신의 이상형은 한미옥, 장김주일, 신영숙, 김현승 후보예요. 누군지아시나요? <strong>남북통일당</strong>과 <strong>대한민국당</strong> 후보들이네요.<br><br> 당신은 보수 성향, 기초소득 지원이 최우선인 후보를 이상형으로 선택했어요."
  },
  {
    //101번 중도 잡당 모음집
    title: "넌 누구냐?",
    image: './img/results/results-03.png',
    color: '#7d7d8d',
    survive: 0 ,
    text: "당신의 이상형은 19대 국회의원을 지낸 자영업당 최원식 후보 등 25명입니다. <strong>가자환경당, 국민새정당, 깨어있는시민연대당, 우리당, 자영업당, 충청의미래당, 통일민주당, 한국복지당, 홍익당</strong> 후보들이에요.<br><br> 당신은 진보도 보수도 아닌 성향, 비례후보 10명 미만인 후보를 이상형으로 선택했어요."
  },
  {
    //102번 민중당, 미래당, 노동당, 미래민주당, 가자평화인권당 엔딩
    title: "노동ㆍ복지가 미래다",
    image: './img/results/results-05.png',
    color: '#7d7d8d',
    survive: 0 ,
    text: "당신의 이상형은 19대 국회의원을 지낸 민중당 이상규 후보 등 총 18명입니다. <strong>민중당, 미래당, 노동당, 미래민주당, 가자!평화인권당</strong> 후보들입니다.<br><br> 당신은 진보 성향, 노동과 복지가 가장 중요하다고 생각하는 후보를 이상형으로 선택했어요."
  },
  {
    //103번 탄핵정당 엔딩
    title: "당신의 이상형은" +"\n"+ "존재하지 않습니다",
    image: './img/results/results-01.png',
    color: '#7d7d8d',
    survive: 0 ,
    text: "당신은 보수 성향, 자유민주주의가 최우선이고 박근혜 전 대통령 탄핵은 정당했다는 후보를 이상형으로 선택했어요."
  },
  {
    //104번 보수 잡당 엔딩 (새벽당 자유당 코리아당)
    title: "넌 누구냐?",
    image: './img/results/results-04.png',
    color: '#7d7d8d',
    survive: 0 ,
    text: "당신의 이상형은 전 MBC 공정방송노조위원장 이순임 후보 등 14명이에요. <strong>새벽당, 자유당, 코리아당</strong> 소속 후보들이네요.<br><br> 당신은 보수 성향, 다른 이슈 중에서 안보 강화가 최우선인 후보를 이상형으로 선택했어요."
  },
  {
    //105번 엄마부대 엔딩
    title: "나름 네임드",
    image: './img/results/results-11.png',
    color: '#7d7d8d',
    survive: 0 ,
    text: "당신의 이상형은 참여정부 법무부 장관과 국가정보원장을 지낸 김승규, 엄마부대 대표 주옥순 후보 등 20명이에요. 김문수 전 경기도지사와 전광훈 목사가 창당한 <strong>기독자유통일당</strong> 후보들이군요.<br><br> 당신은 보수 성향, 다른 이슈 중에서 차별금지법 철폐가 최우선인 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/19-54ec5fa70ad249a3b5eebb37482c2811'>기독자유통일당 정책보기</a>"
  },
  {
    //106번 새누리당 엔딩
    title: "2020 새누리당",
    image: './img/results/results-10.png',
    color: '#7d7d8d',
    survive: 0 ,
    text: "당신의 이상형은 <strong>새누리당</strong> 사무총장인 성영애 후보예요. 2017년 자유한국당으로 바뀐 새누리당과는 다른 당이에요.<br><br> 당신은 보수 성향, 정책을 제출하지 않은 당의 후보를 이상형으로 선택했어요."
  },
  {
    //107번 여성의당 엔딩
    title: "우리는" +"\n"+ "페미니스트",
    image: './img/results/results-08.png',
    color: '#9366CC',
    survive: 0 ,
    text: "당신의 이상형은 이지원, 이경옥, 박보람, 김주희 후보입니다. 모두 <strong>여성의당</strong> 소속이네요!<br><br> 당신은 진보 성향, 여성의 안전이 가장 중요하고 소수 정당 소속 후보를 이상형으로 선택했어요.<br><br><a href = ''>여성의당 정책보기</a>"
  },
  {
    //108번 열린민주당 엔딩1
    title: "문의 남자",
    image: './img/results/results-07.png',
    color: '#658FCB',
    survive: 0 ,
    text: "당신의 이상형은 청와대 공직기강비서관을 지낸 최강욱, 대변인이었던 김의겸 후보예요. <strong>열린민주당</strong> 후보군요.<br><br> 당신은 진보 성향, 국회 개혁이 가장 중요하고 청와대에서 일해본 경험이 있는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/12-1557779c7f624ba7bf605645a23c169d'>열린민주당 정책보기</a>"
  },
  {
    //109번 열린민주당 엔딩2
    title: "방송인 다음은 정치인",
    image: './img/results/results-06.png',
    color: '#658FCB',
    survive: 0 ,
    text: "당신의 이상형은 알쓸신잡에 나왔던 김진애, 방송 패널을 여러 번 했던 주진형 후보예요. <strong>열린민주당</strong> 후보군요.<br><br> 당신은 진보 성향, 국회 개혁이 가장 중요하고 방송에 다수 출연한 경험이 있는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/12-1557779c7f624ba7bf605645a23c169d'>열린민주당 정책보기</a>"
  },
  {
    //110번 미래한국당 엔딩1
    title: "모험가",
    image: './img/results/results-12.png',
    color: '#F4809E',
    survive: 0 ,
    text: "당신의 이상형은 탈북 인권운동가 지성호, 체육계 미투 1호 김은희, 장애 피아니스트 김예지 등 <strong>미래한국당</strong> 후보 5명입니다.<br><br> 당신은 보수 성향, 시장경제의 회복이 가장 중요하고 최저임금 재조정을 우선 추진하며 20대 30대인 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/4-68de39a6e59c4cad82a76eaee080c04f'>미래한국당 정책보기</a>"
  },
  {
    //111번 한국경제당 엔딩1
    title: "겐세이",
    image: './img/results/results-13.png',
    color: '#7d7d8d',
    survive: 0 ,
    text: "당신의 이상형은 '사퇴하세요'로 유명한 이은재, 최다 전과(18)인 최종호 후보 등 6명이에요. <strong>한국경제당</strong> 후보들이네요.<br><br> 당신은 보수 성향, 시장경제의 회복이 가장 중요하고 비정규직의 정규직화를 우선 추진하며 중소정당 소속 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/9-a9e596a28af4433d827ce1fed402f09b'>한국경제당 정책보기</a>"
  },
  {
    //112번 
    title: "당신의 이상형은" +"\n"+ "존재하지 않습니다.",
    image: './img/results/results-02.png',
    color: '#7d7d8d',
    survive: 0 ,
    text: "당신은 보수 성향, 시장경제의 회복이 가장 중요하고 비정규직의 정규직화를 우선 추진하며 주요정당 소속 후보를 이상형으로 선택했어요."
  },
  {
    //113 녹색당 엔딩1
    title: "당신의 이상형은" +"\n"+ "존재하지 않습니다.",
    image: './img/results/results-01.png',
    color: '#91D57C',
    survive: 0 ,
    text: "이상형은 존재하지 않지만 <strong>녹색당</strong>과 가장 가깝네요.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 탈핵을 우선 추진하는 남성 후보를 이상형으로 선택했어요."
  },
  {
    //114 민생당 엔딩1
    title: "당신의 이상형은" +"\n"+ "존재하지 않습니다.",
    image: './img/results/results-01.png',
    color: '#3CBF82',
    survive: 0 ,
    text: "이상형은 존재하지 않지만 <strong>민생당</strong>과 가장 가깝네요.<br><br> 당신은 진보도 보수도 아닌 성향, 비례후보 10명 이상이고 코로나 긴급지원금 1억 원씩 주는 건 불가능하며 코로나 시국에 자영업자부터 지원해야 한다는 20대 후보를 이상형으로 선택했어요."
  },
  {
    //115 더불어시민당 엔딩1
    title: "당신의 이상형은" +"\n"+ "존재하지 않습니다.",
    image: './img/results/results-01.png',
    color: '#328BC9',
    survive: 0 ,
    text: "이상형은 존재하지 않지만 <strong>더불어시민당</strong>과 가장 가깝네요.<br><br> 당신은 진보 성향, 여성의 안전이 가장 중요하고 후보자 10명 이상의 정당에 속한 전과 없는 70대 이상 후보를 이상형으로 선택했어요."
  },
  {
    //116 정의당 엔딩1
    title: "당신의 이상형은" +"\n"+ "존재하지 않습니다.",
    image: './img/results/results-01.png',
    color: '#FFE57F',
    survive: 0 ,
    text: "이상형은 존재하지 않지만 <strong>정의당</strong>과 가장 가깝네요.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 재생에너지를 우선 추진하는 70대 이상의 후보를 이상형으로 선택했어요."
  },
  {
    //117 열린민주당 엔딩3
    title: "당신의 이상형은" +"\n"+ "존재하지 않습니다.",
    image: './img/results/results-01.png',
    color: '#658FCB',
    survive: 0 ,
    text: "이상형은 존재하지 않지만 <strong>열린민주당</strong>과 가장 가깝네요.<br><br> 당신은 진보 성향, 국회 개혁이 가장 중요하고 청와대 경력과 방송 경력이 없고 전과가 없는 2030세대 후보를 이상형으로 선택했어요."
  },
  {
    //118 열린민주당 엔딩4
    title: "당신의 이상형은" +"\n"+ "존재하지 않습니다.",
    image: './img/results/results-01.png',
    color: '#658FCB',
    survive: 0 ,
    text: "이상형은 존재하지 않지만 <strong>열린민주당</strong>과 가장 가깝네요.<br><br> 당신은 진보 성향, 국회 개혁이 가장 중요하고 청와대 경력과 방송 경력이 없고 전과가 없는 70대 이상의 후보를 이상형으로 선택했어요."
  },
  {
    //119 더불어시민당 엔딩2
    title: "당신의 이상형은" +"\n"+ "존재하지 않습니다.",
    image: './img/results/results-01.png',
    color: '#328BC9',
    survive: 0 ,
    text: "이상형은 존재하지 않지만 <strong>더불어시민당</strong>과 가장 가깝네요.<br><br> 당신은 진보 성향, 여성의 안전이 가장 중요하고 후보자 10명 이상의 정당에 속한 전과 없는 20대, 30대 퀴어 후보를 이상형으로 선택했어요."
  },
  {
    //120 정의당 엔딩2
    title: "당신의 이상형은" +"\n"+ "존재하지 않습니다.",
    image: './img/results/results-01.png',
    color: '#FFE57F',
    survive: 0 ,
    text: "이상형은 존재하지 않지만 <strong>정의당</strong>과 가장 가깝네요.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 재생에너지를 우선 추진하는 젊은 2030세대의 남성 후보를 이상형으로 선택했어요."
  },
  {
    //121 정의당 엔딩3
    title: "당신의 이상형은" +"\n"+ "존재하지 않습니다.",
    image: './img/results/results-01.png',
    color: '#FFE57F',
    survive: 0 ,
    text: "이상형은 존재하지 않지만 <strong>정의당</strong>과 가장 가깝네요.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 재생에너지를 우선 추진하는 젊은 2030세대의 퀴어 후보를 이상형으로 선택했어요."
  }
]





// 진짜 결과
const realResults = [

  {
    //200 국가혁명배당금당 엔딩
    title: "내 눈을 바라봐" +"\n"+ "허본좌",
    image: './img/results/results-09.png',
    color: 'white',
    survive: 0 ,
    text: "당신의 이상형은 허경영 후보 등 22명이에요. 모두 <strong>국가혁명배당금당</strong> 소속이네요.<br><br> 당신은 진보도 보수도 아닌 성향, 비례후보 10명 이상이고 코로나 긴급지원금 1억 원씩 주는 게 가능하다는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/16-df5b6fe0381c41b1aab457755e6faf12'>국가혁명배당금당 정책보기</a>"
  },
  {
    //201 우리공화당/친박신당 엔딩1
    title: "올드보이",
    image: './img/results/results-14.png',
    color: 'white',
    survive: 0 ,
    text: "당신의 이상형은 현역 최다인 8선의 <strong>우리공화당</strong> 서청원 후보, 4선인 <strong>친박신당</strong> 홍문종 후보예요. 다선 의원을 좋아하시네요!<br><br> 당신은 보수 성향, 자유민주주의가 최우선이고 박근혜 전 대통령 탄핵은 무효이며 4선 의원 이상인 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/7-480bae30533740bb83db11dbe593d0b1'>우리공화당 정책보기</a><br><a href = 'https://www.notion.so/sbsdata/11-442192000dfc4a68a491555b617c8352'>친박신당 정책보기</a>"
  },
  {
    //202 우리공화당/친박신당 엔딩2
    title: "친박연대의 후예",
    image: './img/results/results-16.png',
    color: 'white',
    survive: 0 ,
    text: "당신의 이상형은 인지연, 장정은 후보예요. <strong>우리공화당</strong>과 <strong>친박신당</strong> 후보들이네요.<br><br> 당신은 보수 성향, 자유민주주의가 최우선이고 박근혜 전 대통령 탄핵은 무효이며 정당 대변인 경험이 있는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/7-480bae30533740bb83db11dbe593d0b1'>우리공화당 정책보기</a><br><a href = 'https://www.notion.so/sbsdata/11-442192000dfc4a68a491555b617c8352'>친박신당 정책보기</a>"
  },
  {
    //203 더불어시민당 엔딩1
    title: "지구는 달의 위성",
    image: './img/results/results-20.png',
    color: '#328BC9',
    survive: 0 ,
    text: "당신의 이상형은 DJ 3남 김홍걸을 비롯해 전 여성정책연구원장 권인숙, 민주당 영입 1호 최혜영 등 8명이랍니다 모두 <strong>더불어시민당</strong> 후보네요:)<br><br> 당신은 진보 성향, 여성의 안전이 가장 중요하고 후보자 10명 이상의 정당에 속한 전과가 있는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/5-2f0321f246824b4fb5c57006b2113234'>더불어시민당 정책보기</a>"
  },
  {
    //204 녹색당 엔딩
    title: "GREEN IN RAINBOW",
    image: './img/results/results-21.png',
    color: '#91D57C',
    survive: 0 ,
    text: "당신의 이상형은 퀴어인권활동가인 김기홍 후보입니다. <strong>녹색당</strong> 소속이네요.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 탈핵을 우선 추진하는 퀴어 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/22-b6796bff769146b8b2d6ef3c980f6c3e'>녹색당 정책보기</a>"
  },
  {
    //205
    title: "만물의 어머니" +"\n"+ "가이아",
    image: './img/results/results-22.png',
    color: '#91D57C',
    survive: 0 ,
    text: "당신의 이상형은 제주도지사 후보자였던 고은영 후보 등 4명이에요. 모두 <strong>녹색당</strong> 소속이네요.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 탈핵을 우선 추진하는 여성 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/22-b6796bff769146b8b2d6ef3c980f6c3e'>녹색당 정책보기</a>"
  },
  {
    //206
    title: "대★리☆다★이☆아",
    image: './img/results/results-23.png',
    color: '#FFE57F',
    survive: 0 ,
    text: "당신의 이상형은 류호정 후보네요. 리그 오브 레전드 랭크 대리 논란이 있었지만 '롤잘알' 후보는 1명뿐. <strong>정의당</strong> 소속입니다.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 재생에너지를 우선 추진하는 '롤잘알' 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/6-a406405c3a4b4ab287b8cbc24836a689'>정의당 정책보기</a>"
  },
  {
    //207
    title: "행동하는 트랜스젠더",
    image: './img/results/results-24.png',
    color: '#FFE57F',
    survive: 0 ,
    text: "당신의 이상형은 정치하는 트랜스젠더, 행동하는 성소수자인권연대 트랜스젠더퀴어 인권팀장인 임푸른 후보예요. <strong>정의당</strong> 소속이네요.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 재생에너지를 우선 추진하는 퀴어 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/6-a406405c3a4b4ab287b8cbc24836a689'>정의당 정책보기</a>"
  },
  {
    //208
    title: "최초 귀화인" +"\n"+ "국회의원",
    image: './img/results/results-25.png',
    color: '#FFE57F',
    survive: 0 ,
    text: "당신의 이상형은 필리핀 출신 이주민인 이자스민 후보입니다. 19대 국회의원을 지냈고 <strong>정의당</strong> 소속이네요.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 재생에너지를 우선 추진하는 이민자 출신 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/6-a406405c3a4b4ab287b8cbc24836a689'>정의당 정책보기</a>"
  },
  {
    //209
    title: "사연 있는 전과 후보",
    image: './img/results/results-26.png',
    color: '#658FCB',
    survive: 0 ,
    text: "당신의 이상형은 '도곡동 문건'의 주인공 전 대구국세청장 안원구 후보 등 9명입니다. 모두 <strong>열린민주당</strong>인데 집시법, 국가보안법, 뇌물수수, 음주운전 전과 등이 있군요!<br><br> 당신은 진보 성향, 국회 개혁이 가장 중요하고 청와대 경력, 방송 경력 없는 전과 있는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/12-1557779c7f624ba7bf605645a23c169d'>열린민주당 정책보기</a>"
  },
  {
    //210
    title: "고위 공무원",
    image: './img/results/results-19.png',
    color: '#F4809E',
    survive: 0 ,
    text: "당신의 이상형은 외교부 차관을 지낸 조태용, 합동참모본부 차장이었던 신원식, 농림부 장관 출신 정운천 후보 등 3명이에요. 모두 <strong>미래한국당</strong>이에요. 공무원을 좋아하시네요!<br><br> 당신은 보수 성향, 시장경제의 회복이 가장 중요하고 최저임금 재조정을 우선 추진하며 60대 이상이고 공직 경험이 있는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/4-68de39a6e59c4cad82a76eaee080c04f'>미래한국당 정책보기</a>"
  },
  {
    //211
    title: "독립투사의 후손",
    image: './img/results/results-18.png',
    color: '#F4809E',
    survive: 0 ,
    text: "당신의 이상형은 윤봉길 의사의 손녀 윤주경 후보예요. <strong>미래한국당</strong> 소속이네요.<br><br> 당신은 보수 성향, 시장경제의 회복이 가장 중요하고 최저임금 재조정을 우선 추진하며 60대 이상이고 애국선열의 뜻을 계승하려는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/4-68de39a6e59c4cad82a76eaee080c04f'>미래한국당 정책보기</a>"
  },
  {
    //212
    title: "대변인",
    image: './img/results/results-16.png',
    color: '#F4809E',
    survive: 0 ,
    text: "당신의 이상형은 언론 출신이거나 홍보전문가인 조수진, 백현주, 허은아 후보예요. 모두 <strong>미래한국당</strong> 소속이네요.<br><br> 당신은 보수 성향, 시장경제의 회복이 가장 중요하고 최저임금 재조정을 우선 추진하며 40대, 50대이고 언론 경험이 있거나 홍보전문가인 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/4-68de39a6e59c4cad82a76eaee080c04f'>미래한국당 정책보기</a>"
  },
  {
    //213
    title: "오 나의 대표님",
    image: './img/results/results-17.png',
    color: '#F4809E',
    survive: 0 ,
    text: "당신의 이상형은 한국여성벤처협회 회장이었던 이영, 서울시향 대표였던 박현정 후보예요. 모두 <strong>미래한국당</strong> 소속이네요.<br><br> 당신은 보수 성향, 시장경제의 회복이 가장 중요하고 최저임금 재조정을 우선 추진하며 40대, 50대이고 무언가 주도하고 지휘했던 경험이 있는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/4-68de39a6e59c4cad82a76eaee080c04f'>미래한국당 정책보기</a>"
  },
  {
    //214
    title: "모험가",
    image: './img/results/results-12.png',
    color: '#F4809E',
    survive: 0 ,
    text: "당신의 이상형은 장애계를 대표한 이종성, 봅슬레이 스켈레톤 국가대표 감독 이용, 세계기록 보유 모험가 남영호예요. 모두 <strong>미래한국당</strong> 소속이네요.<br><br> 당신은 보수 성향, 시장경제의 회복이 가장 중요하고 최저임금 재조정을 우선 추진하며 40대, 50대이고 좌절을 이겨낸 경험이 있는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/4-68de39a6e59c4cad82a76eaee080c04f'>미래한국당 정책보기</a>"
  },
  {
    //215
    title: "안철수 키즈",
    image: './img/results/results-31.png',
    color: '#EF7D3F',
    survive: 0 ,
    text: "당신의 이상형은 김근태, 김예림 후보 등 5명이에요. 모두 <strong>국민의당</strong> 소속이에요.<br><br> 당신은 진보도 보수도 아닌 성향, 비례후보 10명 이상이고 코로나 긴급지원금 1억 원씩 주는 건 불가능하며 코로나 시국에 질병관리본부를 질병관리청으로 확대 개편하자는 20대, 30대 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/10-7c6de5e18f2f4de8aeb1e78c0f9946af'>국민의당 정책보기</a>"
  },
  {
    //216
    title: "만덕산의 그늘",
    image: './img/results/results-30.png',
    color: '#3CBF82',
    survive: 0 ,
    text: "당신의 이상형은 민생당 상임선대위원장 손학규, 현역 의원인 최도자, 장정숙 후보 등 7명이에요. 모두 <strong>민생당</strong> 소속이네요.<br><br> 당신은 진보도 보수도 아닌 성향, 비례후보 10명 이상이고 코로나 긴급지원금 1억 원씩 주는 건 불가능하며 코로나 시국에 자영업자부터 지원해야 한다는 60대 이상 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/3-10-01b0120b1000454f891830abc2a5f913'>민생당 정책보기</a>"
  },
  {
    //217
    title: "민생은 맡겨라",
    image: './img/results/results-29.png',
    color: '#3CBF82',
    survive: 0 ,
    text: "당신의 이상형은 민생당 대표 김정화 후보 등 9명이에요. 모두 <strong>민생당</strong> 소속이네요.<br><br> 당신은 진보도 보수도 아닌 성향, 비례후보 10명 이상이고 코로나 긴급지원금 1억 원씩 주는 건 불가능하며 코로나 시국에 자영업자부터 지원해야 한다는 30대, 40대, 50대 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/3-10-01b0120b1000454f891830abc2a5f913'>민생당 정책보기</a>"
  },
  {
    //218
    title: "노력하는 아재",
    image: './img/results/results-36.png',
    color: '#328BC9',
    survive: 0 ,
    text: "당신의 이상형은 KBS 부사장을 지냈던 정필모 후보 등 16명! 모두 <strong>더불어시민당</strong>, 평균 연령은 53.7세네요 :)<br><br> 당신은 진보 성향, 여성의 안전이 가장 중요하고 후보자 10명 이상의 정당에 속한 전과 없는 40~60대 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/5-2f0321f246824b4fb5c57006b2113234'>더불어시민당 정책보기</a>"
  },
  {
    //219
    title: "열린민주당 NEWBIE",
    image: './img/results/results-27.png',
    color: '#658FCB',
    survive: 0 ,
    text: "당신의 이상형은 전 법무부 인권국장이었던 황희석 후보 등 8명입니다. 모두 <strong>열린민주당</strong> 후보네요.<br><br> 당신은 진보 성향, 국회 개혁이 가장 중요하고 청와대 경력과 방송 경력이 없고 전과가 없는 40~60대 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/12-1557779c7f624ba7bf605645a23c169d'>열린민주당 정책보기</a>"
  },
  {
    //220
    title: "철수파 신인",
    image: './img/results/results-32.png',
    color: '#EF7D3F',
    survive: 0 ,
    text: "당신의 이상형은 코로나 최전선인 대구동산병원 간호사안 최연숙 후보 등 16명이에요. 모두 <strong>국민의당</strong> 소속이네요.<br><br> 당신은 진보도 보수도 아닌 성향, 비례후보 10명 이상이고 코로나 긴급지원금 1억 원씩 주는 건 불가능하며 코로나 시국에 질병관리본부를 질병관리청으로 확대 개편하자는 40대 이상, 의정 경험이 있는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/10-7c6de5e18f2f4de8aeb1e78c0f9946af'>국민의당 정책보기</a>"
  },
  {
    //221
    title: "철수파 의원",
    image: './img/results/results-33.png',
    color: '#EF7D3F',
    survive: 0 ,
    text: "당신의 이상형은 20대 국회의원 이태규, 권은희 후보 등 5명이에요. 모두 <strong>국민의당</strong> 소속이네요.<br><br> 당신은 진보도 보수도 아닌 성향, 비례후보 10명 이상이고 코로나 긴급지원금 1억 원씩 주는 건 불가능하며 코로나 시국에 질병관리본부를 질병관리청으로 확대 개편하자는 40대 이상, 의정 경험이 있는 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/10-7c6de5e18f2f4de8aeb1e78c0f9946af'>국민의당 정책보기</a>"
  },
  {
    //222
    title: "2030 여성 후보",
    image: './img/results/results-34.png',
    color: '#328BC9',
    survive: 0 ,
    text: "당신의 이상형은 전 기본소득당 대표였던 용혜인 후보를 포함해 신현영, 이소현, 박은수 후보 등 4명입니다. 모두 <strong>더불어시민당</strong>이네요.<br><br> 당신은 진보 성향, 여성의 안전이 가장 중요하고 후보자 10명 이상의 정당에 속한 전과 없는 2030대 여성 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/5-2f0321f246824b4fb5c57006b2113234'>더불어시민당 정책보기</a>"
  },
  {
    //223
    title: "여성과 더불어",
    image: './img/results/results-36.png',
    color: '#328BC9',
    survive: 0 ,
    text: "당신의 이상형은 민달팽이 유니온 위원장이었던 권지웅과 전용기 후보 2명이네요. <strong>더불어시민당</strong> 소속이에요.<br><br> 당신은 진보 성향, 여성의 안전이 가장 중요하고 후보자 10명 이상의 정당에 속한 전과 없는 2030대 남성 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/5-2f0321f246824b4fb5c57006b2113234'>더불어시민당 정책보기</a>"
  },
  {
    //224
    title: "세상을 향해 액션!",
    image: './img/results/results-13.png',
    color: '#FFE57F',
    survive: 0 ,
    text: "당신의 이상형은 영화감독 겸 장애인 운동가인 장혜영 후보 등 <strong>정의당</strong> 후보 7명입니다.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 재생에너지를 우선 추진하는 젊은 2030세대의 여성 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/6-a406405c3a4b4ab287b8cbc24836a689'>정의당 정책보기</a>"
  },
  {
    //225
    title: "정의당 사람들",
    image: './img/results/results-37.png',
    color: '#FFE57F',
    survive: 0 ,
    text: "당신의 이상형은 서울시장 선거에 출마했던 김종철 후보 등 15명이에요. 모두 <strong>정의당</strong> 후보네요.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 재생에너지를 우선 추진하는 40~60대의 정당인 출신 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/6-a406405c3a4b4ab287b8cbc24836a689'>정의당 정책보기</a>"
  },
  {
    //226
    title: "잊을 수 없는 고소함" +"\n"+ "마카다미아",
    image: './img/results/results-38.png',
    color: '#FFE57F',
    survive: 0 ,
    text: "당신의 이상형은 '땅콩갑질' 피해자 박창진과 서울교통공사 역무원 이은주 후보예요. 모두 <strong>정의당</strong> 후보네요.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 재생에너지를 우선 추진하는 40~60대의 교통 분야 종사자 출신 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/6-a406405c3a4b4ab287b8cbc24836a689'>정의당 정책보기</a>"
  },
  {
    //227
    title: "나는 시간강사다",
    image: './img/results/results-39.png',
    color: '#FFE57F',
    survive: 0 ,
    text: "당신의 이상형은 나사렛대학교 시간강사 박종균, 인권강사 심지선 후보 등 총 2명입니다. 모두 <strong>정의당</strong> 소속이네요.<br><br> 당신은 진보 성향, 환경이 가장 중요하고 재생에너지를 우선 추진하는 40~60대의 강사 출신의 후보를 이상형으로 선택했어요.<br><br><a href = 'https://www.notion.so/sbsdata/6-a406405c3a4b4ab287b8cbc24836a689'>정의당 정책보기</a>"
  }
]
