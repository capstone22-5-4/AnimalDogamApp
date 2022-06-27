##### 2022-01 CAUSW Capstone-Design(2) Team 05-04

# 신비한 동물도감
<div align="center">
  <img src="https://user-images.githubusercontent.com/79308015/175909307-3a3fb0f4-325e-4811-883e-41fda14f4e98.png"  width="274" height="180"/>
</div>
<div align="center">
  <h3>아이들을 위한 동물수집 애플리케이션, 신비한 동물도감</h3>
</div>
<br />

## :two_men_holding_hands: 팀원 소개
| <img alt="윤진호" src="https://avatars.githubusercontent.com/u/79308015?s=70&v=4" height="50"/> | <img alt="임창환" src="https://avatars.githubusercontent.com/u/33221641?s=70&v=4" height="50"/> | <img alt="최윤호" src="https://avatars.githubusercontent.com/u/74705447?v=4" height="50"/> |
| :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|                            [윤진호](https://github.com/jhyoon9705)                             |                          [임창환](https://github.com/DogRing)                           |                          [최윤호](https://github.com/yunho303)                           |
|                                    Frontend + UI                                |                                       Backend                                        |                                     Data research & AI + Frontend                                    |

<br />

## :memo: 프로젝트 소개
- 우리나라의 반려동물 양육가구 수의 증가와 함께, 매년 동물보호법 위반과 동물학대 사례가 급증하고 있습니다. 이러한 문제를 해결하기 위해서는 아이들에게 어릴 때부터 동물들에 대한 올바른 관심 유도와 기본적인 교육이 필요합니다. 또한, 아이들이 동물들을 괴롭히는 행위는 동물에 대한 호기심과 탐색 심리에서 비롯되며, 어릴 때의 이러한 동물 학대 행위는 성인이 되어 저지르는 범죄 행위로 이어질 가능성이 있다고 알려져 있습니다. 따라서 아이들의 동물에 대한 호기심을 올바른 방법으로 해소해주는 방안이 절대적으로 필요합니다. 이뿐만 아니라, 동물을 매개로 하는 교육과 체험은 아동의 정서지능과 심리적 건강, 친사회성 증진에도 좋은 영향을 가져다 준다는 연구결과가 많습니다. 
- 아이들에게 동물들에 대한 지식과 동물 보호의식을 재미있게 일깨워줄 수 있는 방법이 없을까요? 단순히 동물원을 견학시켜주거나 동물 관련 책 또는 동영상 콘텐츠를 보여주는 것은 부족하지 않나요? 아이들이 좀 더 재미있게 동물들을 접하고 동물에 대한 지식을 배양하며, 이로써 생명 존중 의식을 증진시킬 수 있도록 돕기 위해 <신비한 동물도감>을 제작하였습니다.
- 아이들이 주위에서 동물을 보거나 동물원에 방문했을 때, 그냥 지나치거나 사진을 찍고 마는 경우가 많습니다. 신비한 동물도감(이하 '앱')은 아이들에게 동물 사진을 찍고 그 사진을 앱에 업로드하도록 유도합니다. 이때, 아이들은 자신이 찍은 동물이 어떤 동물인지 모를수도 있습니다. 그래도 괜찮습니다. 앱에서 사진을 자동으로 분석하여 사진 속 동물 이름을 알려주기 때문입니다. 아이들이 사진을 올리면 사진은 이렇게 자동으로 분석된 동물 이름이 라벨링 되어 자신만의 도감에 등록되게 됩니다. 도감에 동물 사진이 등록되면 아이들은 언제든지 자신의 도감에 방문하여 자신이 찍었던 사진을 볼 수 있습니다. 또한 도감에 있는 동물들에 대한 정보를 앱에서 적극적으로 제공하기 때문에 아이들은 동물들을 자신의 도감에 차곡차곡 모아가며 성취감과 수집의 재미를 얻을 수 있으며 여러 동물들에 대해 자연스럽게 알아가게 될 것입니다. 
- 여기에서 더 나아가, 앱 내의 상점에서 동물들의 먹이를 구매하여 '토끼에게 먹이주기'와 같은 퀘스트를 통해 동물들의 섭식 정보와 서식 환경 등을 재미있게 알아갈 수 있을 것입니다. 이러한 퀘스트와 앱에서 수행할 수 있는 여러가지 업적들을 통해 실제 동물들과 인터렉션(interaction)하는 느낌을 받을 수 있습니다. 마지막으로, 모든 사용자들이 올린 사진의 메타데이터를 수집하여 사진이 찍힌 위치와 그곳에서 찍힌 동물 이름을 지도상에 모두 표시해주기 때문에 주위에 어떤 동물들이 목격되었는지와 어떤 동물들이 서식하고 있는지 한눈에 알아볼 수 있습니다. 이를 통해 주위에 동물이 목격되었던 장소가 있다면 아이들은 그 동물을 적극적으로 찾아나서게 될 것입니다.


<br />

## :iphone: 서비스 Workflow
- 앱의 전체적인 workflow는 다음과 같습니다.

<div align="center">
  <img src="https://user-images.githubusercontent.com/79308015/175902257-bd528c0c-6a5c-4ec8-9d08-ba9911e66406.png"/>
</div>

- 사용자가 동물 사진을 촬영하여 앱에 업로드 하면 머신러닝을 이용한 동물 분류 모델을 이용하여 사진 속 동물이 어떤 동물인지(ex, 호랑이, 토끼, 고양이) 분석하여 결과를 도출하게 됩니다. 이렇게 도출된 동물 이름을 사진에 라벨링하여 사진과 함께 사용자의 도감에 등록합니다. 또한 사용자는 도감 속 동물, 즉 자신이 찍어 올린 동물들을 바탕으로 관련 설명을 제공받고, 업적 및 퀘스트를 수행하며 동물들과 인터렉션할 수 있게 됩니다.

<br />

## :computer: 사용 기술
<div align="center">
  <img src="https://user-images.githubusercontent.com/79308015/175905388-79281c99-8282-43a0-a59c-5e71182ae289.png"/>
</div>

- **App**: React native + WebView
- **Server**: Node.js, Express, AWS ec2
- **Database**: MySQL
- **Machine learning**: Teachable machine


<br />


## :books: 결과물
![image](https://user-images.githubusercontent.com/79308015/175905932-f84c970e-7a13-4229-bcfd-ab5f21ed15ce.png)

![image](https://user-images.githubusercontent.com/79308015/175906007-3b477e14-9314-442c-9468-17025c3e4b9e.png)

![image](https://user-images.githubusercontent.com/79308015/175906743-20f74a20-2263-49e7-a1f8-28feb3473183.png)
![image](https://user-images.githubusercontent.com/79308015/175906192-a399b6ce-7a40-485f-91d5-ba4c300c3b67.png)

![image](https://user-images.githubusercontent.com/79308015/175906248-dd60e821-9217-4243-ab1d-c64dc45f4d62.png)

![image](https://user-images.githubusercontent.com/79308015/175906294-6e460893-009e-4dae-86dd-274ba454fd7a.png)

![image](https://user-images.githubusercontent.com/79308015/175906362-70e8e731-9d6c-450e-bf91-578fbdb55758.png)
![image](https://user-images.githubusercontent.com/79308015/175906408-0ce8ad61-4f12-4a01-a661-6be126515b1b.png)

![image](https://user-images.githubusercontent.com/79308015/175906465-eb3aae28-71c2-4d73-87dd-8da5824160f8.png)
![image](https://user-images.githubusercontent.com/79308015/175906502-001f5350-044e-453d-8c56-10c0e5f03a41.png)

![image](https://user-images.githubusercontent.com/79308015/175906546-03c7916d-4a4a-42b3-8463-82d8253b53ed.png)

![image](https://user-images.githubusercontent.com/79308015/175906580-236b75a7-ea0d-4108-a9f3-84e5be128bb4.png)

<br />


## :clapper: 소개 영상
[![신비한 동물도감 데모영상](https://img.youtube.com/vi/7jdbCWQiHic/0.jpg)](https://youtu.be/7jdbCWQiHic)

___

Backend: https://github.com/capstone22-5-4/nodejs
