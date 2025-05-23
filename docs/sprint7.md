# 요구사항

## 기본 요구사항

### 중고마켓

- [x] mongoDB에서 PostgreSQL을 사용하도록 코드를 마이그레이션 해주세요.

#### 공통

- [x] PostgreSQL를 이용해 주세요.
- [x] 데이터 모델 간의 관계를 고려하여 onDelete를 설정해 주세요.
- [x] 데이터베이스 시딩 코드를 작성해 주세요.
- [x] 각 API에 적절한 에러 처리를 해 주세요.
- [x] 각 API 응답에 적절한 상태 코드를 리턴하도록 해 주세요.

#### 자유게시판

- [x] Article 스키마를 작성해 주세요.
- [x] id, title, content, createdAt, updatedAt 필드를 가집니다.
- [x] 게시글 등록 API를 만들어 주세요.
- [x] title, content를 입력해 게시글을 등록합니다.
- [x] 게시글 조회 API를 만들어 주세요.
- [x] id, title, content, createdAt를 조회합니다.
- [x] 게시글 수정 API를 만들어 주세요.
- [x] 게시글 삭제 API를 만들어 주세요.
- [x] 게시글 목록 조회 API를 만들어 주세요.
- [x] id, title, content, createdAt를 조회합니다.
- [x] offset 방식의 페이지네이션 기능을 포함해 주세요.
- [x] 최신순(recent)으로 정렬할 수 있습니다.
- [x] title, content에 포함된 단어로 검색할 수 있습니다.

#### 댓글

- [ ] 댓글 등록 API를 만들어 주세요.
- [ ] content를 입력하여 댓글을 등록합니다.
- [ ] 중고마켓, 자유게시판 댓글 등록 API를 따로 만들어 주세요.
- [ ] 댓글 수정 API를 만들어 주세요.
- [ ] PATCH 메서드를 사용해 주세요.
- [ ] 댓글 삭제 API를 만들어 주세요.
- [ ] 댓글 목록 조회 API를 만들어 주세요.
- [ ] id, content, createdAt 를 조회합니다.
- [ ] cursor 방식의 페이지네이션 기능을 포함해 주세요.
- [ ] 중고마켓, 자유게시판 댓글 목록 조회 API를 따로 만들어 주세요.
