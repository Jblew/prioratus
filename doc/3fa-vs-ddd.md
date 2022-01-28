# 3factor.app (3FA) vs domain-driven-design (DDD)

Between 2017 and 2020 I used to work on two interesting and distinct pieces of software. One was an extremly distributed blockchain app which required prior design of a blockchain protocol that would be extremly hard to be changed afterwards and the second one was a global data-heavy app that despite of storing massive amount of data allowed us to change the api and data model fairly easily (in comparison). So the comparison is: rigid+distributed VS elastic+monolith.

I didn't compare the projects and situations previously as I was immersed in both projects and their time with little time to think. Thankfully in 2021 I had to take a break from software development: I finaly got my MD license and passed the licensing exam at 84%! Now I still have to complete the hospital internships but don't have to prepare for such an immense exam, so I have a lot of room to think.

And this thinking led me to a comparison of the two approaches to designing data-intense web applications: 3-factor-app and domain-driven-design. There was a question in my head: can we use both 3factor app and DDD at the same time? Are they mutually exclusive? Or can they coexist?

To compare the systems first we need to define dimensions of the comparison. "You cannot improve what you cannot measure", but you also cannot improve what you cannot define. Let's look into popular software architecture books then: The Clean Architecture book by Robert C. Martin states that *The goal of software architecture is minimizing the number of people needed to build and maintain a software system*. *Designing data-intensive applications* lists three dimensions of data systems that can be optimized: reliability, scalability, maintainability. We can define them the following way:

- Reliability is the inverse probability of failure and the effects of this failure
- Scalability is the ability of the system to expand in terms of handling more load
- Maintainability is the ability to fix, change and evolve the system.

We can see that this is more than just the definition by Robert C. Martin.

So what are the factors that affect the above:

Reliability is affected by at least:

- Complexity of the system. The more elements with P(failure), the greater Ptotal(failure)
- Error boundaries: sanely simple and small boundaries that are large enough to cope with failures in a logical manner and small enough to not increase complexity by this coping
- Observability: observable system allows faster location of a failure
- Recovery-ability: some systems have superior ability to recover from failures. Especially systems that separate state and commands. Such system can reply failed commands and in such manner come to valid state. Most blockchains work in this manner.

Scalability:

- Statelesness: the less stateful components, the less need for horizontal scaling code. E.g. if there is only single database there will be only single component to be scaled horizontally.
- Distribution: in some cases separating services decreases the load on particular endpoint removing the need to scale.

Maintainability:

- Loose-coupling: detaching components allows more teams to work on separate components
- Complexity: complex systems are more difficult to fix especially if single-responsibility principle is broken thus 
- Understandability: things like having well defined terms (the ubiquitous language) or like discussing the entire system assumptions with members of all teams increase understandability thus increasing ability to expand / maintain the system despite having to change system across multiple components
- Abstraction: sane level of abstraction decreases mental load of understanding models. The UNIX architecture is a perfect example. It hides the complexity of multi-service system under a well defined and time-proof mental model



## What is DDD?

DDD stands for domain-driven design. It was proposed in the **Domain-Driven Design: Tackling Complexity in the Heart of Software*.* book by Eric Evans.

DDD aims at solving the problem of software complexity. As we have seen above , the complexity affects the three of above dimensions. This means that reducing complexity would improve maintainability, reliability and scalability at once. 

DDD aims to solve the issue of complexity by creating another layer, the domain-layer. The domain layer is an abstraction that describes the system using terms and entities resembling the problem space meaning that it models the real world onto plain code entities. 

Requirements of the DDD:

1. There is a code package that contains abstract classes / interfaces that describe entire system purely in the abstract terms
2. The direction of dependency should point from all the other packages towards the domain layer
3. All domain-related changes should be implemented by changing the domain package. Meaning that each time something is changed on the system there is decision to be made: is it a domain problem or is it an implementation (application layer) problem?
4. Domain layer may not contain any storage-related code, eg it should not contain any orm annotations



## What is 3 factor app?

The 3factor.app [was proposed by hasura authors](https://3factor.app/) in order to solve multiple microservice related patterns without loosing the responsibility distribution. It enforces event-driven CQRS in microservice pattern.

The central point of a 3 factor app is a database.

![3 factor app as described on 3factor.app website](./img/3factor-migration.png)

The database stores the current state of the system as well as the commands. Instead of stateless microservices we now have processor functions which may perform similar tasks as would be performed by microservices but now they are stateless and simpler to deploy.

The advantages:

- The event-sourcing and command-query segregation (CQRS) are enforced by design. It would be very inconvenient to break CQRS and event sourcing in this architecture. In my opinion this is the biggest advantage of this architecture.
- All commands are stored as rows in the database table meaning that in case of crash the system can be replayed
- Steteless processor functions are a lot easier to deploy than stateful microservices

The challenges:

- Domain layer should the topmost package in terms of dependency directions meaning either that domain should be modelled inside the database or there is a need for a domain-sidecar which would exist at the same level as the database
- They propose to use auto-GraphQL endpoint hasura.io. While it is easy in small projects, from my experience it slows down work on large projects due to extremly long security configuration (hasura issue) and challenging debugging (problem with GraphQL, especially for teams that are used to work with REST)



## The database-domain layer challenge

So how to solve the problem that database is the topmost stable dependency while the domain layer should remain at this position? Should we make the domain layer out of database?

It is possible to make the database-domain layer. Database is already well suited to express relations of data. But there are some challenges with that approach:

1. Database model does not support abstraction meaning that the models would need to contain implementation data such as data types. On the other hand this is not a huge burden
2. Without ORM it would be challenging to achieve database migrations. This can be mitigated using an ORM-less migration tool, such as [Squitch](https://github.com/sqitchers/sqitch). 
3. Database would need to contain both domain model as well as specific implementation related tables for all processing functions. Solution to that is to create separate schemas: we could have domain schema managed by the orm-less migration tool Squitch as well as specific schemas managed separately by a specific ORM of each processing function separately.
4. Database is fairly complex in terms of defining behaviour. Shure, we can define triggers, views and functions but development and testing in SQL is costly and a company may quickly find itself in a need of expensive SQL developers.

