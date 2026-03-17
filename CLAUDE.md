# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
./gradlew build          # 전체 빌드
./gradlew bootRun        # 애플리케이션 실행
./gradlew test           # 전체 테스트 실행
./gradlew clean build    # 클린 빌드
./gradlew compileJava    # 컴파일만 실행 (Q파일 재생성 포함)
```

DB는 Docker Compose로 실행:
```bash
docker-compose up -d
```

## 아키텍처

**Spring Boot 3.5.9 / Java 17 / MySQL 8.0** 기반 e-commerce 백엔드.

### 패키지 구조

```
project.shop/
├── domain/          # 도메인별 패키지 (user, item, order, cart)
│   └── {domain}/
│       ├── entity/
│       ├── repository/      # JpaRepository + Custom(QueryDSL) 분리
│       ├── service/
│       ├── controller/      # admin/v1, api/v1 로 버전 및 역할 구분
│       ├── dto/             # request / response / search condition
│       └── enums/
└── global/
    ├── config/              # QuerydslConfig (JPAQueryFactory 빈)
    ├── entity/              # BaseEntity (JPA Auditing)
    └── exception/           # ExceptionHandlerAdvice (작업 중)
```

### 핵심 패턴

**Repository 패턴:**
- `XxxRepository` extends `JpaRepository` + `XxxRepositoryCustom`
- `XxxRepositoryImpl`에서 `JPAQueryFactory`로 QueryDSL 쿼리 구현
- 동적 필터링은 `BooleanExpression` 헬퍼 메서드로 처리

**Entity 규칙:**
- 모든 엔티티는 `BaseEntity` 상속 (created_at, modified_at 자동 관리)
- 테이블명 접두사: `TB_` (예: `TB_USER`, `TB_ITEM`)
- 연관관계는 `FetchType.LAZY` 기본
- Enum 필드는 `@Enumerated(EnumType.STRING)` 필수
- 정적 팩토리 메서드 패턴 사용 (예: `User.createUser()`)

**컨트롤러 규칙:**
- admin과 user API를 별도 컨트롤러로 분리
- 버전 포함 경로: `/admin/v1/...`, `/api/v1/...`
- 같은 도메인에 컨트롤러 여러 개일 경우 `@RestController("BeanName")`으로 명시

**DTO 규칙:**
- Request DTO는 Java Record 사용
- QueryDSL 프로젝션은 `@QueryProjection` + `QXxxResponse` 활용

### QueryDSL

- Q파일은 빌드 시 APT가 `src/main/generated/`에 자동 생성 (git 제외)
- 엔티티 변경 후 Q파일 갱신이 필요하면 `./gradlew compileJava` 실행

### 미완성 영역 (작업 중)

- `ExceptionHandlerAdvice` — 전역 예외 처리 미구현
- `Order` 엔티티의 status, paymentStatus, paymentMethod — String → Enum 전환 필요
- `Category` 엔티티의 status — Enum 전환 필요

### DDD 원칙 고려
- 항상 DDD 도메인 규칙을 지켜서 코드 로직 작성