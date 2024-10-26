import { Console } from "@woowacourse/mission-utils";
import RaceController from "./controllers/RaceController.js";
import Validator from "./utils/Validator.js";
import UserInput from "./views/UserInput.js";
import DisplayController from "./views/DisplayController.js";

class App {
  constructor() {
    this.userInput = new UserInput();
    this.validator = new Validator();
    this.raceController = new RaceController();
    this.displayController = new DisplayController();
  }
  async run() {
    const userInput = await this.userInput.getUserInputCars();
    const userInputArray = userInput.split(",");

    this.validator.validateNameLength(userInputArray);

    let positions = this.raceController.createPlayersPositions(userInputArray.length);

    const userInputCount = await this.userInput.getUserInputCount();

    this.validator.validateRound(userInputCount);


    // Game start
    Console.print("\n실행 결과");
    for (let i = 0; i < userInputCount; i++) {

      let nextPostions = this.raceController.movePlayersRandomly(positions);

      positions = nextPostions;
      this.displayController.displayPlayerPositions(userInputArray, positions);
    }

    let winnerArray = this.raceController.getRaceWinnersIndex(positions);

    this.displayController.displayWinners(userInputArray, winnerArray);

  }
}

export default App;
