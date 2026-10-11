## Prompt and scope

Model a two-player chess game that validates moves, detects check, checkmate and stalemate, and records move history.
No AI opponent; a user interface is out of scope.

## Model

```text
Game(board, players, turn, history, status)
Board: 8x8 grid of Piece or empty
Piece(color, kind) with polymorphic pseudo_moves(board, from) -> squares
Move(from, to, piece, captured, promotion, is_castle, is_en_passant)
```

Each piece type knows its movement pattern; sliding pieces (rook, bishop, queen) share a helper that walks a direction until blocked.

## Validating a move

1. The piece belongs to the player to move.
2. The destination is among the piece's pseudo-legal moves.
3. After applying the move on a copy (or apply and undo), the mover's king is not attacked.

Step 3 handles pins and moving into check with one rule.
Special moves (castling, en passant, promotion) need extra state: whether the king and rooks have moved, and the last double pawn push.

## Game status

After each move, the opponent is in check if any of the mover's pieces attacks their king.
If the opponent has no legal moves, it is checkmate when in check and stalemate otherwise.

## Tests and follow-up

Test a pinned piece that cannot move, castling through an attacked square (illegal), en passant only immediately after the double push, and promotion.
Follow-ups: undo by storing moves with captured pieces, draw rules (threefold repetition with a position hash, the fifty-move rule), and timers.
