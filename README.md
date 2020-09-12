# covid19-hcheck-auto
새로운 자가진단 사이트에서 작동할 수 있도록 제작한 자동화 스크립트입니다.

## 기능
* 새로운 자가진단 사이트에서 잘 작동합니다.
* **비밀번호를 입력하지 않아도 됩니다!**

## 사용법
1. 이 저장소를 clone합니다.
```
git clone https://github.com/comjun04/covid19-hcheck-auto.git
cd covid19-hcheck-auto
```
2. [config.example.json](./config.example.json) 파일을 `config.json`으로 복사합니다.
3. `config.json`을 열고 정보를 입력합니다.
```json
{
  "school": {
    "region": "서울",
    "level": "중학교",
    "name": "테스트중"
  },
  "studentName": "홍길동",
  "birthday": "050123"
}
```
| 항목 | 설명 | 타입 |
| ---- | ---- | ---- |
| `school.region` | 학교가 있는 지역 이름 (서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종, 경기, 강원 충북, 충남, 전북, 전남, 경북, 경남, 제주 중 하나)| `string` |
| `school.level` | 학교급 (유치원, 초등학교, 중학교, 고등학교, 특수학교 중 하나) | `string` |
| `school.level` | 학교 이름 | `string` |
| `studentName` | 학생 이름 | `string` |
| `birthday` | 생년월일 (yyMMDD 형식) | `string` |

모든 항목은 **필수 입력**입니다.

4. 스크립트를 실행합니다.
```
yarn start
```
