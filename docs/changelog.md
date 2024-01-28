# Change Log

## About

Contains a general history about the changes/improvements made to the project. May also include planned work. 


## [Unreleased] - yyyy-mm-dd

Listed here are future plans and features currently being developed

### Work in Progress

### Future Plans

## [1.0.0] - 2024-01-28

#### *The first version published to Github*

### Added


### Current Features

- Turing Machine editor/configuration tool for making custom machines
  - input areas for adding: states, transition & editing: tape content/initial state
  - ability to delete states and transitions, and deleting states will also remove any transitions related to the deleted state
  - drop down selection for states in transition tool
  - input constraints on symbol length (1), state id/string length (5)
  - currently no constraints on the amount of states./transitions that can be added; duplicate transitions, however, will not be added
    - in fact, every transition input is validated, and an invalid input will lead to a displayed error message for user
- Machine visualizer with step button to perform computations
  - currently shows: set of states, current state, and current tape content, with the tape head index being highlighted
- reasonably responsive (mobile requires scrolling to/from the editor/display)

### Planned Features

- deployed demo
- infinite tape
  - allow tape movements to exceed bounds of the initial tape string (not really infinite b/c computer memory limitations, but large enough)
- visual state diagram graph
  - state nodes with transition edges and labels for transition behavior
- alphabet parameter in editor
  - put constraints on the symbols that can be added to tape/transitions
  - with alphabet and set of states defined, we can generate all possible transitions and let user fill in blank info
- help section
  - basic information about turing machines, their operation, and how to use the configuration component / app