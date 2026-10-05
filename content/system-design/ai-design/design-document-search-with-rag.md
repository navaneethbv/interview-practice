## Prompt and requirements

Design an assistant that answers questions from a company's internal documents and cites the evidence it used.
Assume documents change, different employees have different access, and some questions have no supported answer.
Begin by asking about corpus size, update delay, acceptable latency, and the consequences of an incorrect answer.
This is an original design exercise reviewed October 4, 2026.

## Architecture

```text
Documents -> parse and normalize -> chunks with document/version/access metadata
                                  -> lexical and vector indexes

Question + verified user identity -> authorized retrieval -> candidate reranking
                                  -> selected evidence -> answer + citations
```

Choose a simple baseline before adding an agent.
For a small authorized document set, passing the relevant documents directly may be sufficient.
For a larger corpus, retrieval limits the evidence sent to the model.
Lexical search helps exact identifiers; semantic search helps paraphrases.
Compare them with a combined approach using the same held-out questions.

## Worked example

A user asks whether contractors can access the staging environment.
An old policy permits access, but the current policy requires a named sponsor.
Store document versions and effective dates, retire superseded chunks, and cite the current policy.
A semantically similar document is not automatically authoritative.
If two current sources disagree, show the conflict or route the question to an owner instead of inventing a resolution.

## Security and freshness

Apply authorization while selecting candidates and recheck it before presenting evidence.
Include access scope in cache keys; a globally cached answer can leak another user's documents.
A revoked document must stop appearing in results even if its embedding or cached answer remains stored temporarily.
Treat retrieved instructions as document content, not permission to operate tools or change the assistant's task.

## Measure and challenge

Build a small evaluation set with exact lookups, paraphrases, no-answer cases, stale documents, conflicting policies, and forbidden documents.
Measure whether the correct evidence was retrieved separately from whether the answer faithfully used it.
Test citations by resolving them back to the same document version.
A high retrieval score does not establish answer correctness.

Follow up by doubling the corpus and tightening the latency budget.
Discuss which stages can be cached, what must be invalidated, and what quality you would measure before reducing candidate counts.

## Source

[Anthropic's Contextual Retrieval article](https://www.anthropic.com/engineering/contextual-retrieval) discusses lexical and embedding retrieval, chunk context, and reranking.
The authorization scenario and proposed checks here are original design exercises.
