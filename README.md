### React Checkers - Shehbaj Dhillon

- Dependencies Used --
  - React Beautiful Drag and Drop -- Drag and drop library. Powerful onDragStart and onDragEnd methods.
  - Chakra UI -- Styled components. Built in dark mode. Saved time otherwise spent on writing CSS.
  - TypeScript -- Strong typechecking, interfaces, and intellisense.


- Features Implemented
  - Basic mechanics -- Players can move checkers and jump over enemy checkers.
  - Drag and Drop -- Players can drag and drop checkers onto valid squares. Valid squares highlight on the board when player starts to drag a movable token. Movable tokens are highlighted on the board.
  - Force jump -- If player can capture enemy checkers, then those capture moves are the only valid moves.
  - Combo Jumps -- If a token that has captured an enemy token can capture more enemy tokens, then those capture moves are the only valid moves.
  - Checkers and 8x8 Checker Board -- Made using Chakra UI components. Each element connected to each other using React Beautiful Drag and Drop. Logic handling of moves done by custom utility functions.
  - Browser Support -- Game runs stable across Brave, FireFox, and Chrome and across all major screen sizes. Game feels fantastic on touch screens and tablets.


- Extra Features Implemented --
  - King Mechanics -- Checker can move backwards once it hits last row. This is indicated by a crown symbol on the checker.
  - Persistent Game State -- Game restores its state if page is refreshed.
  - Reset Game -- Reset game to initial state.
  - Undo Last Move -- Can undo upto the first last move played.
  - Dark Mode -- Switch to toggle between dark and light mode.


- Features not implemented --
  - No-brain AI Player


- Deployed version --
  - [Netlify Link](https://condescending-mayer-b1a045.netlify.app/)


