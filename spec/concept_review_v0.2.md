# BridgeWay — Consolidated Product, Social Impact & Innovation Review

**Дата:** 2026-10-03  
**Режим оценки:** максимально строгий  
**Роли:** жюри хакатона + impact-инвестор + product reviewer  
**Основание:** полный текущий репозиторий `DLiHealer/bridgeway`, работающий UI, architecture/spec, mock data, matching logic, замечания предыдущего review Claude.

---

# 1. Executive verdict

## 1.1. Краткий вывод

BridgeWay решает **реальную и социально значимую проблему**: знания о том, как решать локальные социальные проблемы, фрагментированы, хорошие решения плохо переносятся между районами и городами, а граждане, NGO, эксперты, муниципалитеты и источники финансирования существуют в разрозненных системах.

Однако текущая версия BridgeWay пока в первую очередь является:

> **качественно сделанным интерактивным прототипом civic-tech платформы, а не доказанным механизмом решения социальных проблем.**

Главная проблема проекта — не UI и не количество функций.

Главная проблема:

> **у BridgeWay пока недостаточно сильное и явно выраженное уникальное ядро.**

Сегодня продукт визуально сообщает:

> сообщи о проблеме → найди людей → придумай идею → создай проект.

Такие механики уже существуют в разных формах.

Перспективная версия BridgeWay должна сообщать другое:

> **сообщи о проблеме → BridgeWay найдёт решения, которые уже доказали эффективность в похожем контексте → оценит переносимость → адаптирует решение под конкретный город → найдёт исполнителя и финансирование → проследит до измеренного результата.**

Именно эта модель может сделать BridgeWay одновременно:

- инновационным;
- социально значимым;
- масштабируемым;
- интересным муниципалитетам;
- пригодным для B2G/B2B2G модели;
- существенно отличающимся от обычного портала обращений граждан.

---

# 2. Строгая оценка текущего состояния

| Критерий | Оценка | Комментарий |
|---|---:|---|
| Социальная актуальность проблемы | 8.5/10 | Проблема реальна и имеет широкое применение |
| Понятность концепции | 6.5/10 | Понятно, что это civic platform, но не сразу понятно, зачем именно BridgeWay |
| Визуальное качество | 8/10 | Выглядит существенно лучше типичного hackathon prototype |
| UX MVP | 7/10 | Основная навигация и сценарии понятны |
| Инновационность | 4.5/10 | Сильное потенциальное ядро есть, но пока не является центром продукта |
| Matching | 4/10 | Работает, но алгоритм простой и местами имитируется |
| Evidence / real data | 1.5/10 | Практически все продуктовые данные mock |
| Реальное социальное воздействие | 2/10 | Impact пока декларируется, а не измеряется |
| Closed loop | 2.5/10 | Есть Project Room, но нет ответственности реального исполнителя |
| Inclusion / accessibility | 4/10 | Хороший responsive UI и отдельные accessibility элементы есть, но модель доступа не соответствует части ЦА |
| Trust / data integrity | 2.5/10 | Demo-данные выглядят как реальные |
| Реальная multi-user архитектура | 2/10 | Всё хранится в localStorage одного браузера |
| Sustainability / business model | 3.5/10 | Возможная B2G модель очевидна, но в продукте ещё не выражена |
| Hackathon demo potential | 8/10 | После точечной переработки можно сделать очень сильный demo |
| Долгосрочный потенциал | 8.5/10 | При правильном repositioning |

### Строгая текущая интегральная оценка

**≈ 4.5–5/10 как социально-технологический продукт.**

При этом:

**≈ 7/10 как визуально реализованный hackathon prototype.**

И:

**8.5–9/10 потенциально**, если построить вокруг него evidence-based solution transfer engine.

Таким образом, оценка Claude `3.6/10` слишком низкая для качества hackathon execution, но его критика фундаментальных проблем продукта в основном обоснована.

---

# 3. Что в проекте уже действительно сильное

## 3.1. Уже реализован важный элемент будущего USP

В `src/pages/SubmitPage.jsx` пользователь вводит проблему, категорию, город и теги.

После этого вызывается:

`matchAll(...)`

И BridgeWay показывает:

- существующие решения;
- экспертов;
- funding;
- потенциальные организации.

Это важнее, чем кажется.

Проект уже не является только доской объявлений.

---

## 3.2. В продукте уже существует механизм replication

В `SolutionDetail.jsx` есть:

**"Skopiuj to u siebie"**

После выбора города создаётся новый проект.

Это практически прототип будущей ключевой функции:

> **reuse existing solution in another locality**

Это необходимо не удалить, а сделать центральной функцией продукта.

---

## 3.3. Решения описываются не только названием

У solution уже существуют:

- problem;
- solution;
- category;
- location;
- budget;
- duration;
- effect;
- steps;
- risks;
- contacts.

Это хорошая основа для будущего объекта:

**Evidence-backed Solution Case**

---

## 3.4. Есть Project Room

У проекта уже предусмотрены:

- задачи;
- бюджет;
- документы;
- команда;
- чат;
- progress;
- KPI.

Архитектурно это полезно.

Проблема не в наличии этих сущностей.

Проблема в том, что пока они не соединены с реальным жизненным циклом социальной проблемы.

---

# 4. Критические проблемы текущей версии

# P0 — блокеры доверия и demo

---

## BW-0.1. Выдуманные данные выглядят как реальные

На Home отображается:

- 1 248 signals;
- 356 ideas;
- 189 verified solutions;
- 47 municipalities.

В коде реально существует:

- 6 signals;
- 6 ideas;
- 4 solutions;
- 8 cities.

На Analytics:

- 1248 signals;
- 356 ideas;
- 89 projects;
- 68% implementation rate.

Никакого источника этих данных нет.

### Почему это опасно

Для обычного UI mock это допустимо.

Для проекта, который строится на:

- доверии;
- общественных данных;
- evidence;
- социальной эффективности;

это особенно опасно.

Член жюри может задать один вопрос:

> "Skąd macie te dane?"

После ответа "это demo" доверие к следующим показателям падает.

### Нужно

Либо:

**DEMO DATA — fictional examples**

либо реальные данные.

Никаких промежуточных вариантов.

---

## BW-0.2. "Verified" сейчас ничего не означает

Все решения имеют:

`verified: true`

При этом отсутствует:

- кто проверил;
- дата проверки;
- источник;
- methodology;
- evidence;
- ссылка на реализацию;
- уровень достоверности.

### Требование

Заменить boolean:

`verified: true`

на объект:

`evidence`

с полями:

- source;
- sourceUrl;
- organisation;
- implementationPlace;
- implementationDate;
- outcome;
- methodology;
- evidenceLevel;
- verifiedBy;
- verifiedAt.

---

## BW-0.3. Некоторые "эффекты" нельзя показывать без источника

Примеры:

`+40% uczestnictwa`

`-3°C latem`

`120 seniorów objętych`

`+15 budynków`

Сейчас они выглядят как доказанные результаты.

Но источник отсутствует.

### Решение

Каждая цифра результата должна быть одной из:

- `measured`;
- `reported`;
- `target`;
- `estimated`;
- `demo`.

И обязательно иметь источник.

---

## BW-0.4. Funding выглядит реальным, но данные устарели

На дату хакатона — октябрь 2026 — seed funding содержит deadlines:

- February 2026;
- March 2026;
- April 2026;
- May 2026;
- June 2026.

То есть все эти opportunities уже закрыты.

Кроме того, URL части funding ведут на `example.com`.

### Это серьёзный demo-risk.

Если жюри откроет Funding, BridgeWay фактически предлагает просроченное финансирование.

### Нужно

Перед демонстрацией:

- либо подключить реальное funding API;
- либо убрать даты;
- либо пометить все cards как `DEMO`;
- либо показывать только реальные актуальные calls.

---

## BW-0.5. "AI Assistant" сейчас не является AI

`SubmitPage.jsx` показывает:

**Asystent AI**

Но используется:

`src/utils/matching.js`

Текущий алгоритм:

- совпадение категории;
- keywords;
- совпадение города;
- простая сумма score.

Это обычный deterministic scoring.

Он полезен.

Но это **не AI**.

### Риск

Если на защите заявить:

> "AI анализирует проблемы..."

техническое жюри легко обнаружит, что это keyword matcher.

### Варианты

#### Вариант A — честный

Переименовать:

**Smart matching**

или:

**BridgeWay Match**

#### Вариант B — сделать настоящий AI layer

Использовать semantic embeddings + contextual reranking + объяснение результата.

Это намного сильнее.

---

## BW-0.6. На Idea Detail recommendations вообще не являются matching

В `IdeaDetail.jsx` используются:

`data.experts.slice(0, 2)`

`data.solutions.slice(0, 2)`

`data.fundings.slice(0, 2)`

`data.ngos.slice(0, 1)`

То есть пользователь видит "recommended", но фактически получает первые элементы массива.

Это необходимо исправить.

---

## BW-0.7. Основной end-to-end flow содержит серьёзную ошибку

`SolutionDetail` после:

**Skopiuj to u siebie**

создаёт проект и делает:

`navigate('/projekty')`

Но текущий:

`src/pages/ProjectsPage.jsx`

фактически является копией ProfilePage.

То есть пользователь не попадает в нормальный список проектов.

### Это P0 demo blocker.

Самый сильный сценарий продукта:

**solution → copy → implementation**

сейчас ломается в конце.

---

## BW-0.8. Большое количество элементов UI ничего не делает

Примеры:

- global search — mock;
- logout — не logout;
- "save draft" — ничего не сохраняет;
- join team — modal закрывается без действия;
- Project Room upload — ничего не загружает;
- Project Room chat — сообщение не отправляется;
- export PDF — не экспортирует;
- некоторые profile/settings controls декоративны;
- privacy policy — текст без страницы;
- terms — текст без страницы;
- contact — текст без действия.

### Принцип hackathon demo

**Лучше 5 работающих кнопок, чем 25 кнопок, половина из которых fake.**

Всё, что не работает:

- реализовать минимально;
- скрыть;
- пометить как prototype;
- не показывать на demo.

---

## BW-0.9. Community сейчас существует только внутри одного браузера

Текущая архитектура:

React Context + localStorage.

Следовательно:

- два пользователя не видят одни данные;
- NGO не увидит заявку гражданина;
- gmina не увидит problem;
- команда не может реально работать вместе;
- chat не может быть shared;
- status нельзя изменить другой ролью.

Это нормально для визуального prototype.

Но нельзя утверждать, что multi-user interaction уже работает.

---

## BW-0.10. Один из "verified solutions" потенциально опасен

Текущий case:

**"Podjazdy sąsiedzkie"**

описан как:

> простые деревянные рампы, построенные соседями.

Для accessibility infrastructure нельзя без evidence предлагать импровизированное строительное решение как доказанную практику.

Здесь возникают:

- безопасность;
- ответственность;
- требования объекта;
- разрешения;
- доступность;
- строительные нормы.

### Рекомендация

Убрать этот кейс либо заменить на:

> проведение accessibility audit → назначение ответственной организации → технически утверждённая адаптация.

BridgeWay не должен рекомендовать потенциально небезопасные physical interventions без доказательной базы.

---

# 5. Главная стратегическая проблема

Сегодня implicit positioning:

> **Bridge between problem and solution.**

Это слишком широко.

Под это определение подходят сотни civic-tech продуктов.

---

# 6. Рекомендуемое позиционирование

## BridgeWay должен стать системой переноса доказанных социальных решений

### Основная формулировка

> **Одна и та же социальная проблема не должна решаться в каждом городе заново.**

BridgeWay:

1. выявляет проблему;
2. структурирует её;
3. ищет похожие проблемы;
4. находит доказанные решения;
5. оценивает, насколько они подходят местному контексту;
6. адаптирует решение;
7. определяет организации, которые могут действовать;
8. находит финансирование;
9. отслеживает реализацию;
10. измеряет результат;
11. возвращает результат в knowledge base.

---

# 7. Потенциальный настоящий USP

## Evidence-Based Social Solution Transfer Engine

Это уже не:

- карта проблем;
- каталог NGO;
- портал жалоб;
- база идей;
- crowdfunding portal.

Это система:

> **Problem → Evidence → Context Matching → Adaptation → Actor → Funding → Implementation → Outcome → Reuse**

---

# 8. Как сделать это инновационным

## 8.1. Solution Evidence Graph

Создать граф сущностей:

`Problem`

↓

`Context`

↓

`Solution Case`

↓

`Evidence`

↓

`Organisation`

↓

`Funding`

↓

`Implementation`

↓

`Measured Outcome`

↓

`Reusable Knowledge`

Каждое решение становится не текстовой карточкой, а структурированным evidence object.

---

## 8.2. Solution Transfer Score

Для каждого решения BridgeWay должен рассчитывать:

**Transferability Score**

Например:

`84% fit`

Но score должен иметь объяснение.

Пример:

**Why 84%?**

- + same problem category
- + similar share of population 65+
- + similar municipality size
- + required services exist locally
- + implementation budget fits
- - volunteer density lower
- - no equivalent NGO found yet

Это намного инновационнее обычного "AI says 84%".

---

## 8.3. Context-aware matching

Сравнивать не только keywords.

Контекст может включать:

- population;
- age structure;
- population density;
- unemployment;
- income;
- public-service availability;
- disability accessibility;
- NGO presence;
- transport;
- environmental parameters;
- city size;
- rural / urban;
- municipal budget indicators.

Тогда BridgeWay действительно может отвечать:

> решение работало в городе X, но насколько оно переносимо в город Y?

---

## 8.4. Evidence Score

Каждое решение получает уровень доказательности.

Пример:

### Evidence A
Результат измерен официальным источником / peer reviewed / public institution.

### Evidence B
Результат опубликован implementing NGO с методикой.

### Evidence C
Есть documented implementation, но слабая outcome evaluation.

### Evidence D
Идея или proposal, пока без доказанного результата.

Это позволит избежать слова:

**verified**

как пустого маркетингового badge.

---

## 8.5. AI должен выполнять конкретную функцию

LLM не должен решать:

> "это хорошее решение или нет"

из головы.

Правильная архитектура:

### Retrieval
найти реальные cases и structured data.

### Matching
semantic similarity + context similarity + hard constraints.

### Evidence
проверить source-backed facts.

### LLM
использовать только для:

- summarization;
- adaptation plan;
- plain-language explanation;
- translation;
- explanation of match;
- extraction of structured fields из документов.

Таким образом AI становится полезным, но evidence остаётся проверяемым.

---

# 9. Социальная значимость: как сделать её реальной

## 9.1. Сегодня impact — заявленный

Проект показывает:

- количество problems;
- ideas;
- users;
- projects.

Но это mostly output metrics.

---

## 9.2. Нужны outcome metrics

BridgeWay должен измерять не:

> сколько было проблем зарегистрировано?

а:

> сколько проблем было реально решено?

Примеры:

- % problems с назначенным responsible actor;
- median time to first response;
- % cases resolved within 30/60/90 days;
- number of people whose accessibility improved;
- number of seniors who started using digital services;
- number of successful solution transfers;
- cost per beneficiary;
- replication time;
- failed implementations;
- number of interventions with measured outcomes.

---

## 9.3. Очень важный новый KPI

### Reuse Rate

> Какой процент новых проблем был решён с использованием уже существующего solution case?

Это может стать фирменной метрикой BridgeWay.

---

## 9.4. Второй сильный KPI

### Time-to-Action

Время:

`problem reported → responsible actor assigned`

---

## 9.5. Третий сильный KPI

### Time-to-Outcome

Время:

`problem reported → measurable result`

---

# 10. Inclusion: проект не должен исключать тех, кому помогает

Заявленные области включают:

- seniors;
- people with disabilities;
- digital exclusion.

Но основной интерфейс:

- smartphone;
- web app;
- map;
- forms.

Это противоречие.

---

## Требуемая модель

### Assisted reporting

Кнопка:

**"Zgłaszam w imieniu innej osoby"**

Роли:

- family member;
- volunteer;
- social worker;
- librarian;
- NGO employee;
- municipality employee.

---

## Возможные assisted access points

- library;
- senior club;
- NGO;
- social-services office;
- neighbourhood centre.

---

## Accessibility minimum

Цель:

**WCAG 2.2 AA**

Нужно предусмотреть:

- keyboard navigation;
- screen-reader semantics;
- contrast;
- font scaling;
- accessible forms;
- simple-language mode;
- no map-only interaction;
- alternative list view.

---

# 11. Privacy и safety

Особенно чувствительные категории:

- lonely seniors;
- disability;
- health-related issues;
- vulnerable households.

Их нельзя показывать точкой:

> "здесь живёт одинокий пожилой человек"

на публичной карте.

---

## Необходимы

### Location privacy

Для sensitive report:

- точный address хранится privately;
- public map показывает район / grid / approximate location.

### Moderation

- report;
- flag;
- takedown;
- abuse handling.

### Third-party personal data

Запретить публикацию персональных данных другого человека без правового основания.

### Organisation verification

NGO и organisations должны иметь подтверждённую идентичность.

---

# 12. Closed loop — ключевое изменение

Сегодня:

`problem → idea → people → project`

Неясно:

> кто обязан что-то сделать?

---

## Новая модель

Каждый problem получает:

### Owner / Duty Holder

Например:

- municipality department;
- housing association;
- road authority;
- NGO;
- school;
- social-service unit.

### Public state

`Reported`

→ `Validated`

→ `Responsible actor identified`

→ `Accepted`

→ `Action planned`

→ `Implementation`

→ `Outcome measured`

→ `Resolved`

или:

→ `Rejected + reason`

---

## SLA

Можно хранить:

- expected response;
- due date;
- escalation date.

Не обязательно юридический SLA.

Это может быть:

**community transparency SLA**

---

# 13. Recommended core domain model

## ProblemSignal

- id
- category
- description
- location
- visibility
- reporter
- proxyReporter
- evidence
- createdAt

## PlaceContext

- municipalityId
- TERYT
- population
- ageStructure
- publicServices
- infrastructure
- socioeconomicIndicators

## SolutionCase

- id
- problemDefinition
- intervention
- implementationContext
- requirements
- cost
- duration
- evidence
- outcomes
- risks
- source

## EvidenceSource

- type
- publisher
- url
- publicationDate
- methodology
- reliabilityLevel

## SolutionMatch

- problemId
- solutionId
- semanticScore
- contextScore
- constraintScore
- transferScore
- explanation

## Organisation

- legalId
- KRS
- REGON
- roles
- geography
- capabilities
- verifiedAt

## FundingOpportunity

- source
- eligibility
- geography
- deadline
- amount
- categories
- liveStatus

## Implementation

- solutionId
- problemId
- owner
- status
- tasks
- budget
- timeline

## Outcome

- metric
- baseline
- target
- actual
- measurementDate
- evidence

---

# 14. Roadmap

---

# ITERATION 0 — Trust & Demo Survival

**Цель:** убрать всё, что может разрушить доверие жюри.

**Срок:** несколько часов / максимум 1 день.

## BW-0.1
Пометить mock data.

### Acceptance criteria
Все synthetic data имеют явное `Demo`.

---

## BW-0.2
Убрать hardcoded Home counters.

### Сделать
Показывать:

- реальные текущие seed counts;

или:

- убрать counters.

---

## BW-0.3
Исправить `/projekty`.

### Acceptance criteria

Flow:

`Solution → Copy → Project → Project Room`

работает полностью.

---

## BW-0.4
Переименовать "AI Assistant".

До появления настоящего AI:

**Smart matching**

---

## BW-0.5
IdeaDetail должен использовать `matchAll`.

Не первые элементы массива.

---

## BW-0.6
Скрыть или реализовать dead buttons.

Приоритет:

- join;
- search;
- draft;
- project actions;
- chat;
- upload;
- PDF export.

---

## BW-0.7
Убрать просроченное funding.

---

## BW-0.8
Удалить/заменить небезопасный ramp example.

---

## BW-0.9
Hero rewrite.

Вместо:

> Most między problemem a rozwiązaniem

главный message:

> **Problem został już gdzieś rozwiązany. BridgeWay pomaga znaleźć gdzie i przenieść rozwiązanie do Twojej społeczności.**

---

# ITERATION 1 — Evidence-Based Solution Engine

**Цель:** создать настоящую инновационную основу продукта.

---

## BW-1.1
Переделать `Solution`.

Добавить:

- source;
- implementation;
- evidence;
- outcomes;
- context;
- evidenceLevel.

---

## BW-1.2
Добавить минимум 20 реальных solution cases.

Не fake.

Каждый должен иметь источник.

---

## BW-1.3
Semantic matching.

Сравнивать:

problem description

с:

problem / solution case embeddings.

---

## BW-1.4
Context matching.

Подключить реальные municipality indicators.

---

## BW-1.5
Transfer Score.

Результат:

`84% dopasowania`

с объяснением факторов.

---

## BW-1.6
AI adaptation.

После выбора solution:

**"Dostosuj do mojej gminy"**

AI формирует:

- prerequisites;
- local actors;
- expected budget;
- steps;
- risks;
- funding opportunities.

Каждый factual claim должен иметь source.

---

### Definition of Done Iteration 1

Пользователь вводит новую проблему.

BridgeWay:

1. находит минимум 3 реальные похожие implementations;
2. показывает evidence;
3. считает transfer score;
4. объясняет score;
5. создаёт local adaptation plan.

---

# ITERATION 2 — Responsibility & Closed Loop

**Цель:** BridgeWay должен не только советовать, но доводить дело до реализации.

---

## BW-2.1
Duty-holder matching.

Определить потенциально ответственную организацию.

---

## BW-2.2
Organisation verification.

Использовать KRS/REGON.

---

## BW-2.3
Case timeline.

Добавить:

- status history;
- owner;
- expected action;
- deadline;
- reason for rejection.

---

## BW-2.4
Escalation.

Если case не получает response:

- reminder;
- reassignment;
- public "awaiting response".

---

## BW-2.5
Project Room связать с исходным Problem.

Всегда должна существовать цепочка:

`Problem`

→ `Solution`

→ `Implementation`

→ `Outcome`

---

### Definition of Done Iteration 2

Для каждого active case видно:

**кто отвечает, что должен сделать и что произошло.**

---

# ITERATION 3 — Real Data Platform

**Цель:** заменить mock intelligence реальным контекстом.

---

## BW-3.1 — GUS BDL

Приоритет: **очень высокий**

Использовать для:

- demographics;
- seniors;
- housing;
- unemployment;
- environment;
- local socio-economic conditions;
- municipality comparisons.

Источник: `[API-1]`

---

## BW-3.2 — GUS SMUP

Приоритет: **максимальный**

SMUP особенно хорошо соответствует BridgeWay.

Он содержит показатели local public services по:

- social policy;
- education;
- transport;
- environment;
- culture;
- real estate;
- municipal finances.

Причём показатели оценивают:

- quantity;
- quality;
- accessibility;
- financial efficiency.

Источник: `[API-2]`

### Возможность

BridgeWay может автоматически показать:

> "Эта проблема встречается в муниципалитетах с похожими service indicators."

---

## BW-3.3 — dane.gov.pl API

Приоритет: **очень высокий**

Использовать как data discovery layer.

Можно искать:

- municipal datasets;
- public infrastructure;
- accessibility data;
- social services;
- EU projects;
- public expenditure;
- local datasets.

Источник: `[API-3]`

---

## BW-3.4 — OpenStreetMap / Overpass API

Приоритет: **высокий**

Использовать для local context:

- community centres;
- libraries;
- clinics;
- schools;
- public transport;
- benches;
- toilets;
- pedestrian infrastructure;
- ramps;
- wheelchair accessibility;
- entrances;
- elevators;
- social facilities.

Источник: `[API-4]`

### Пример

Problem:

> difficult access for wheelchair users.

BridgeWay может проверить nearby:

- wheelchair-tagged entrances;
- accessible public transport;
- lifts;
- public services.

---

## BW-3.5 — Nominatim

Приоритет: средний.

Для:

- address → coordinates;
- place search;
- reverse geocoding.

Источник: `[API-5]`

### Ограничение

Public instance нельзя использовать как high-volume production geocoder.

Использовать с cache и low request rate либо self-host later.

---

## BW-3.6 — Geoportal / GUGiK

Приоритет: высокий.

Использовать official Polish spatial data:

- address points;
- streets;
- administrative boundaries;
- transport networks;
- buildings;
- governmental/public services.

Источник: `[API-6]`

Это более authoritative complement к OSM.

---

## BW-3.7 — KRS Open API

Приоритет: высокий.

Использовать для:

- проверки NGO;
- foundation;
- association;
- company;
- legal organisation.

Источник: `[API-7]`

### Результат

Badge:

**Organisation verified**

будет означать реальное registry verification.

---

## BW-3.8 — REGON API

Приоритет: средний.

Дополнительная организация/entity verification.

Поиск возможен по:

- REGON;
- NIP;
- KRS.

Сервис бесплатный, но требует регистрации для production access.

Источник: `[API-8]`

---

## BW-3.9 — GIOŚ Air Quality API

Приоритет: средний.

Для environmental cases:

- PM;
- air pollution;
- monitoring stations;
- environmental evidence.

Источник: `[API-9]`

### Пример

Житель сообщает:

> плохое качество воздуха возле района.

BridgeWay может сразу добавить:

**official measurement context**

вместо субъективной оценки.

---

## BW-3.10 — Eurostat API

Приоритет: средний / высокий после Польши.

Использовать для:

- international benchmarking;
- ageing;
- poverty;
- digital exclusion;
- employment;
- housing;
- urban indicators.

Источник: `[API-10]`

Позволяет масштабировать BridgeWay из Poland-first в EU.

---

## BW-3.11 — EU Funding & Tenders public APIs

Приоритет: высокий для funding module.

API предоставляет public data по:

- calls for proposals;
- grants;
- tenders;
- topics;
- organisations;
- partner searches;
- projects and results.

Источник: `[API-11]`

### Это позволяет заменить текущие mock funding cards.

---

## BW-3.12 — GUS STRATEG / SDG

Приоритет: средний.

Использовать для:

- social cohesion;
- public-policy indicators;
- sustainable development;
- SDG alignment.

Источник: `[API-12]`

### Возможность

Каждый project может показывать:

**SDG alignment**

например:

- SDG 10;
- SDG 11;
- SDG 3.

Но не как marketing badge, а как связь с измеримыми indicators.

---

# 15. Рекомендуемая data architecture

Не делать прямые API calls из каждой страницы.

Создать ingestion layer.

## Pipeline

`External API`

→

`Raw Source`

→

`Normalizer`

→

`BridgeWay Knowledge Store`

→

`Evidence Graph`

→

`Matching Engine`

→

`UI`

---

## Зачем

External APIs:

- меняются;
- имеют rate limits;
- имеют разные schemas;
- могут временно падать.

BridgeWay должен хранить:

- source;
- retrieval timestamp;
- original id;
- last updated;
- license;
- normalized fields.

---

# ITERATION 4 — Inclusion, Trust & Safety

**Цель:** продукт должен быть реально пригоден для уязвимых групп.

---

## BW-4.1
Proxy reporting.

---

## BW-4.2
Plain-language mode.

---

## BW-4.3
WCAG 2.2 AA audit.

---

## BW-4.4
Sensitive-location privacy.

---

## BW-4.5
Moderation.

---

## BW-4.6
Organisation vetting.

---

## BW-4.7
Privacy Policy / Terms / retention.

Не decorative footer labels.

Реальные страницы.

---

# ITERATION 5 — Social Impact Measurement

**Цель:** доказать, что BridgeWay улучшает жизнь людей.

---

## BW-5.1
Theory of Change.

### Inputs

data + users + NGOs + authorities + funding

### Activities

matching + adaptation + implementation

### Outputs

projects initiated

### Outcomes

problems resolved

### Impact

measurable improvement of local quality of life

---

## BW-5.2
Baseline.

Перед implementation фиксировать состояние.

---

## BW-5.3
Target.

---

## BW-5.4
Outcome measurement.

---

## BW-5.5
Failure recording.

Очень важно.

Необходимо хранить не только successful cases.

Нужно знать:

> какое решение НЕ сработало и почему.

Это значительно повышает ценность knowledge base.

---

## BW-5.6
Learning loop.

`Outcome`

обновляет:

`Solution Evidence`

и влияет на будущий:

`Transfer Score`.

---

# ITERATION 6 — Platform & Business Model

## Основной payer

### Municipality / gmina

Residents:

**free**

NGOs:

**free/basic**

Municipality:

**SaaS**

---

## Municipality dashboard

- unresolved problems;
- problem clusters;
- suggested proven solutions;
- responsible departments;
- response times;
- outcome metrics;
- neighbourhood analytics;
- funding opportunities.

---

## Возможная модель

### BridgeWay Community
Free.

### BridgeWay for Municipalities
Paid SaaS.

### BridgeWay Evidence API
Для research organisations / NGOs / public bodies.

---

# 16. Go-to-market: не сужать vision, сузить первый сценарий

Не нужно превращать BridgeWay навсегда в:

> приложение только для seniors.

Но demo и первый pilot должны быть узкими.

---

## Рекомендуемый первый wedge

### Accessibility of public/local services

Почему:

- проблема легко понимается;
- её можно картографировать;
- есть responsible actors;
- outcome можно измерить;
- есть OSM/Geoportal data;
- легко показать before/after;
- высокая социальная значимость.

---

# 17. Рекомендуемый hackathon demo

## Persona

Anna сообщает:

> "Osoba poruszająca się na wózku nie może dostać się do lokalnego centrum usług społecznych."

---

## Step 1

BridgeWay принимает problem.

---

## Step 2

Определяет:

**Accessibility**

---

## Step 3

Показывает context:

- building;
- area;
- nearby accessible alternatives;
- municipality indicators.

---

## Step 4

Находит:

### 3 похожих documented interventions

Например:

**Case A — Gdańsk**

`89% context fit`

**Case B — Wrocław**

`82%`

**Case C — Brno**

`71%`

---

## Step 5

Пользователь открывает Case A.

Видит:

- источник;
- organisation;
- cost;
- timeline;
- measured outcome;
- evidence grade.

---

## Step 6

Нажимает:

**Dostosuj do mojej gminy**

---

## Step 7

BridgeWay предлагает:

- responsible body;
- NGO;
- relevant funding;
- adaptation steps;
- expected cost;
- risks.

---

## Step 8

**Start implementation**

---

## Step 9

Появляется Project Room.

---

## Step 10

Через outcome tracking решение становится новым evidence case.

---

# 18. Почему этот demo сильнее текущего

Он демонстрирует не:

> "смотрите, у нас есть 12 страниц"

а:

> **"смотрите, новая социальная проблема за 60 секунд превращается в evidence-backed action plan."**

Это и есть wow effect.

---

# 19. Что делать с существующими разделами

| Текущий раздел | Решение |
|---|---|
| Mapa | оставить |
| Pomysły | понизить приоритет |
| Rozwiązania | сделать центром платформы |
| Eksperci | оставить как resource layer |
| NGO | оставить как implementation layer |
| Finansowanie | оставить, заменить данные на live |
| Projekty | оставить, связать с implementation |
| Analytics | перестроить на outcome metrics |
| Profile | secondary |
| Search | сделать global evidence search |

---

# 20. Главная Home после repositioning

## Hero

### Headline

**Problem został już gdzieś rozwiązany.**

### Subheadline

**BridgeWay znajduje sprawdzone rozwiązania podobnych problemów, ocenia czy zadziałają w Twojej społeczności i pomaga przejść od zgłoszenia do działania.**

### CTA 1

**Zgłoś problem**

### CTA 2

**Znajdź rozwiązanie**

---

## Следующий блок

### Jak działa BridgeWay

1. **Zgłoś**
2. **Dopasuj**
3. **Dostosuj**
4. **Wdróż**
5. **Zmierz**
6. **Skaluj**

---

# 21. Что необходимо перестать делать

## Не строить ещё 20 CRUD-страниц.

Они не повышают инновационность.

---

## Не называть keyword matching AI.

---

## Не показывать invented metrics как реальные.

---

## Не использовать слово "verified" без evidence.

---

## Не считать количество reports social impact.

---

## Не делать LLM источником фактов.

---

## Не пытаться решить все социальные проблемы сразу в первом pilot.

---

## Не делать карту центральным продуктом.

Карта — интерфейс.

Knowledge + matching + transfer — продукт.

---

# 22. Что является потенциальным moat

Не UI.

Не React.

Не карта.

Не AI chat.

Не список NGO.

---

## Потенциальный defensible asset BridgeWay

### 1. Structured database of social interventions

+

### 2. Evidence attached to outcomes

+

### 3. Context data

+

### 4. History of transfers between municipalities

+

### 5. Measured success/failure

---

Со временем BridgeWay сможет знать:

> **какие социальные interventions работают, где, для кого, при каких условиях и сколько стоят.**

Это уже серьёзный продукт.

---

# 23. Инвестиционная перспектива

## Сейчас

Не investment-ready.

Причины:

- mock data;
- no validation;
- no backend;
- no organisations committed;
- unclear payer;
- no impact evidence.

---

## После Iterations 1–3

Проект становится интересным как:

**Civic Intelligence / GovTech / Social Impact SaaS**

---

## После первых pilots

Инвестору нужны будут доказательства:

- 1–3 municipalities;
- реальные NGO;
- реальные problem cases;
- хотя бы 10–20 implementations;
- measurable outcome;
- evidence of solution reuse;
- сокращение time-to-action.

---

# 24. Главный north-star metric

Не:

**number of users**

и не:

**number of reports**

---

## Рекомендуемый North Star

### Successfully transferred solutions

Количество случаев, когда:

1. проблема появилась в новом месте;
2. BridgeWay нашёл существующее решение;
3. решение было адаптировано;
4. внедрено;
5. результат измерен.

---

# 25. Итоговый verdict

Текущий BridgeWay:

> **хорошо сделанный hackathon prototype слишком широкой civic platform.**

Потенциальный BridgeWay:

> **evidence-driven infrastructure for transferring successful social solutions between communities.**

Это существенная разница.

В первом случае основные конкуренты — civic reporting portals, community platforms, NGO directories и participatory platforms.

Во втором случае продукт отвечает на намного более интересный вопрос:

> **Почему муниципалитет B должен заново изобретать решение социальной проблемы, которую муниципалитет A уже успешно решил?**

Если BridgeWay сможет отвечать:

- какое решение;
- где оно сработало;
- насколько надёжны доказательства;
- подходит ли оно этому городу;
- что нужно изменить;
- кто может реализовать;
- где взять финансирование;
- какой получен результат;

то проект приобретает одновременно:

**инновационность + социальную значимость + измеримый impact + коммерческую ценность.**

---

# 26. Приоритет roadmap одной строкой

### NOW

`Data honesty → fix broken flow → honest matching → strong demo`

### NEXT

`real evidence → semantic/context matching → transfer score → adaptation`

### THEN

`responsible actor → closed loop → real APIs → shared backend`

### AFTER

`accessibility → impact measurement → pilots → B2G`

### SCALE

`cross-city evidence graph → EU data → learning system → BridgeWay API`

---

# 27. Самые важные 10 задач в порядке выполнения

1. `BW-0.1` — убрать fake credibility.
2. `BW-0.3` — починить Solution → Project flow.
3. `BW-0.5` — настоящий matching во всех recommendations.
4. `BW-0.9` — reposition Home вокруг solution reuse.
5. `BW-1.1` — evidence-backed Solution schema.
6. `BW-1.2` — загрузить реальные solution cases.
7. `BW-1.5` — Transfer Score + explanation.
8. `BW-2.1` — responsible actor / closed loop.
9. `BW-3.1 + BW-3.2` — BDL + SMUP context.
10. `BW-5.x` — outcome measurement + learning loop.

Если сделать только эти 10 вещей, BridgeWay уже будет концептуально другим продуктом.