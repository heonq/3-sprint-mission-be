# 요구사항

## 기본 요구사항

### 공통

- [ ] Github에 위클리 미션 PR을 만들어 주세요.
- [ ] React.js 혹은 Next.js를 사용해 진행합니다.
- [ ] RESTful를 설계하고 백엔드 코드를 변경하세요.
- [ ] (풀스택) 설계한 백엔드 코드에 맞게 프론트엔드 코드를 변경해 주세요.
- [ ] https://panda-market-api.vercel.app의 API를 사용한 코드를 본인의 백엔드 API 코드로 변경하세요.
- [ ] (백엔드) 프론트엔드 코드에 맞게 백엔드 코드를 변경해 주세요.
- [ ] 백엔드 코드에 swagger를 추가해 API 명세 문서를 생성해 주세요.

### 프론트엔드 구현 요구사항

#### 중고마켓 페이지

- [ ] 디폴트 이미지로 처리한 이미지를 실제 Product Get API에서 가져온 이미지로 변경해 주세요.
- [ ] 좋아요 순 정렬 기능을 붙여주세요.
- [ ] 베스트 상품 기능을 추가해 주세요. 베스트 상품은 가장 많이 좋아요를 받은 순으로 PC 기준 최대 4개까지 조회 가능합니다.

#### 상품 등록하기 페이지

- [ ] 상품 이미지 등록 기능을 구현합니다. 파일을 선택해 이미지를 업로드하고, preview를 볼 수 있도록 구현합니다. 이미지는 최대 3개까지만 등록 가능하도록 구현해 주세요.
- [ ] 동일하게 상품 이미지 수정 기능도 추가합니다.
- [ ] 상품 등록 성공 시 중고마켓 페이지로 이동해 주세요.

### 백엔드 구현 요구사항

#### 상품 등록

- [ ] "상품 등록하기" 버튼 클릭 시, 상품 정보 등록 API 엔드포인트에 요청을 보내 상품을 등록합니다.
- [ ] 상품 등록 시 필요한 필드(이름, 설명, 가격 등)의 유효성을 검증하는 미들웨어를 구현합니다.
- [ ] `multer` 미들웨어를 사용하여 이미지 업로드 API를 구현해 주세요.
- [ ] 업로드된 이미지는 서버에 저장하고, 해당 이미지의 경로를 response 객체에 포함해 반환합니다.

#### 상품 상세

- [ ] 상품을 조회할 때, 해당 상품에 대한 댓글 리스트, 사용자가 '좋아요'를 눌렀는지 여부를 확인할 수 있도록 응답 객체에 포함시켜 반환해 주세요.

#### 좋아요 기능

- [ ] '좋아요' API를 만들어 주세요.
- [ ] 사용자는 상품 또는 게시글에 '좋아요'를 할 수 있습니다.
- [ ] `$transaction`을 사용해 주세요.
- [ ] '좋아요' 취소 API를 만들어 주세요.
- [ ] 사용자는 상품 또는 게시글에 '좋아요'를 취소할 수 있습니다.
- [ ] `$transaction`을 사용해 주세요.
- [ ] 상품 또는 게시글을 조회할 때, 사용자가 '좋아요'를 누른 항목인지 확인할 수 있도록 `isLiked` 필드를 응답 객체에 포함시켜 반환해 주세요.

#### 에러 처리

- [ ] 모든 예외 상황을 처리할 수 있는 에러 핸들러 미들웨어를 구현합니다.
- [ ] 서버 오류(500), 사용자 입력 오류(400 시리즈), 리소스 찾을 수 없음(404) 등 상황에 맞는 상태값을 반환합니다.

#### 라우트 중복 제거

- [ ] 중복되는 라우트 경로(예: `/users`에 대한 `get` 및 `post` 요청)를 `app.route()`로 통합해 중복을 제거합니다.
- [ ] `express.Router()`를 활용하여 중고마켓/자유게시판 관련 라우트를 별도의 모듈로 구분합니다.

#### 인증

- [ ] User 스키마를 작성해 주세요.
- [ ] `id`, `email`, `nickname`, `image`, `encryptedPassword`, `createdAt`, `updatedAt` 필드를 가집니다.
- [ ] 회원가입 API를 만들어 주세요.
- [ ] `email`, `nickname`, `password` 를 입력하여 회원가입을 진행합니다.
- [ ] `password`는 해싱해 저장합니다.
- [ ] 로그인 API를 만들어 주세요.
- [ ] 사용자의 신원을 확인하고, 성공적인 인증 후에는 액세스 토큰을 발급해 response 객체에 포함해 반환합니다.

#### 상품 기능 인가

- [ ] 로그인한 사용자만 상품을 등록할 수 있습니다.
- [ ] 상품을 등록한 사용자만 해당 상품의 정보를 수정 및 삭제를 할 수 있습니다.
- [ ] 로그인한 사용자만 상품에 '좋아요'를 추가하거나 삭제할 수 있습니다.

#### 게시글 기능 인가

- [ ] 로그인한 사용자만 게시글을 등록할 수 있습니다.
- [ ] 게시글을 등록한 사용자만 해당 게시글 정보를 수정 및 삭제할 수 있습니다.
- [ ] 로그인한 사용자만 게시글에 '좋아요'를 추가하거나 삭제할 수 있습니다.

#### 댓글 기능 인가

- [ ] 로그인한 사용자만 상품에 댓글을 등록할 수 있습니다.
- [ ] 로그인한 사용자만 게시글에 댓글을 등록할 수 있습니다.
- [ ] 댓글을 등록한 사용자만 댓글을 수정하거나 삭제할 수 있습니다.

## 심화 요구사항

### 상태코드 (웹 API 관련)

- [ ] 프론트엔드에서는 서버 응답의 상태코드에 따라 적절한 사용자 피드백을 제공합니다.

### 인증

- [ ] 토큰 기반 방식을 사용할 경우, 만료된 액세스 토큰을 새로 발급하는 리프레시 토큰 발급 기능을 구현합니다.(jwt sliding session 적용)

### OAuth를 활용한 인증

- [ ] 구글 OAuth를 사용하여 회원가입 및 로그인 기능을 구현합니다.

### 프로젝트 구조 변경

- [ ] 프로젝트의 구조와 복잡성을 관리하기 위해 MVC 패턴이나 Layered Architecture와 같은 설계 방식을 적용해 보세요.

### (생략 가능) 자유게시판 게시물 등록

- [ ] 프론트엔드를 Next.js로 Migration 했을 경우에만 진행해 주세요.
- [ ] 게시물 등록 시 이미지 등록 기능을 구현합니다. 파일을 선택해 이미지를 업로드하고, preview를 볼 수 있도록 구현합니다. 이미지는 최대 3개까지만 등록 가능하도록 구현해 주세요.
- [ ] 게시물 등록 시 필요한 필드(제목, 내용 등)의 유효성 검증하는 미들웨어를 구현합니다.
- [ ] `multer` 미들웨어를 사용하여 이미지 업로드 API를 구현해 주세요.
- [ ] 업로드된 이미지는 서버에 저장하고, 해당 이미지의 경로를 response 객체에 포함해 반환합니다.