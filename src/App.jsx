import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import BasicTable from "./component/table";
import TableStandings from "./component/table-standings";
import BottomInfo from "./component/bottom-info";
import { initialTeams } from "./component/data";

function sortTeam(val) {
  val?.sort((a, b) => {
    // Compare match_win values
    if (a.match_win !== b.match_win) {
      return b.match_win - a.match_win;
    }

    // Calculate match percentage for both teams
    const matchPercentageA = a.match_win / (a.match_win + a.match_lose);
    const matchPercentageB = b.match_win / (b.match_win + b.match_lose);

    // Compare match percentages
    if (matchPercentageA !== matchPercentageB) {
      return matchPercentageB - matchPercentageA;
    }

    // Calculate game percentage for both teams
    const gamePercentageA = a.game_win / (a.game_win + a.game_lose);
    const gamePercentageB = b.game_win / (b.game_win + b.game_lose);

    // Compare game percentages
    return gamePercentageB - gamePercentageA;
  });
}

function App() {
  const [formData, setFormData] = useState({
    evos: ["", ""],
    btr: "",
    onic: "",
    rrq: "",
    ae: "",
    rbl: "",
    dewa: "",
    aura: "",
    geek: "",
  });

  const [teams, setTeams] = useState(initialTeams);
  const isMobile = window.matchMedia("(max-width: 576px)").matches;

  useEffect(() => {
    sortTeam(teams);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Check if the input value is a valid number
    const isNumeric = !isNaN(value);

    // Use parseInt to convert to a number, or an empty string if it's not a number or empty
    if (!isNumeric) return;

    const newValue = value.trim() === "" ? "" : parseInt(value, 10);

    // Create a copy of the existing formData
    const updatedFormData = { ...formData };

    if (name.startsWith("evos")) {
      const teamIndex = name === "evos" ? 0 : 1;

      updatedFormData["evos"][teamIndex] = newValue;
      setFormData(updatedFormData);
    } else {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
  };

  // Store the original team data
  const originalTeamData = initialTeams.reduce((data, team) => {
    data[team.name] = { ...team };
    return data;
  }, {});

  // useEffect(() => {
  //   const updatedTeams = initialTeams?.map((team) => {
  //     const teamName = team?.name?.toLowerCase();
  //     const newValue = formData[teamName];

  //     if (teamName.startsWith("evos")) {
  //       // Handle "evos" and "evos2" teams separately
  //       const [match1, match2] = newValue || [0, 0]; // Default to [0, 0] if newValue is undefined
  //       let updatedTeam = { ...team };

  //       // Check if it's the "evos" team
  //       if (teamName === "evos") {
  //         if (match1 !== "") {
  //           if (match1 == 2) {
  //             updatedTeam = {
  //               ...updatedTeam,
  //               match_win: updatedTeam.match_win + 1,
  //               game_win: updatedTeam.game_win + 2,
  //             };
  //           } else if (match1 >= 0 && match1 < 2) {
  //             updatedTeam = {
  //               ...updatedTeam,
  //               match_lose: updatedTeam.match_lose + 1,
  //               game_lose: updatedTeam.game_lose + 2,
  //             };
  //           }
  //         }

  //         if (match2 !== "") {
  //           if (match2 == 2) {
  //             updatedTeam = {
  //               ...updatedTeam,
  //               match_win: updatedTeam.match_win + 1,
  //               game_win: updatedTeam.game_win + 2,
  //             };
  //           } else if (match2 >= 0 && match2 < 2) {
  //             updatedTeam = {
  //               ...updatedTeam,
  //               match_lose: updatedTeam.match_lose + 1,
  //               game_lose: updatedTeam.game_lose + 2,
  //             };
  //           }
  //         }
  //       }
  //       return updatedTeam;
  //     } else if (newValue !== "") {
  //       //! kalau menang (input == 2)
  //       if (newValue == 2) {
  //         return {
  //           ...team,
  //           match_win: team.match_win + 1,
  //           game_win: team.game_win + 2,
  //         };
  //       }

  //       //! kalau kalah
  //       if (newValue >= 0 && newValue < 2) {
  //         return {
  //           ...team,
  //           match_lose: team.match_lose + 1,
  //           game_lose: team.game_lose + 2,
  //         };
  //       }
  //     }

  //     return team;
  //   });

  //   sortTeam(updatedTeams);
  //   setTeams(updatedTeams);
  // }, [formData]);

  useEffect(() => {
    const updatedTeams = initialTeams?.map((team) => {
      const teamName = team?.name?.toLowerCase();
      const newValue = formData[teamName];

      // Helper function to calculate the new data based on match result
      const calculateNewData = (matchResult, enemyResult) => {
        const newData = {
          match_win: matchResult === 2 ? 1 : 0,
          match_lose: matchResult === 2 ? 0 : 1,
          game_win: matchResult,
          game_lose: enemyResult ? enemyResult : 0,
        };

        return newData;
      };

      if (teamName.startsWith("evos")) {
        // Handle "evos" and "evos2" teams separately
        const [match1, match2] = Array.isArray(newValue) ? newValue : ["", ""]; // Default to ["", ""] if newValue is not an array
        let updatedTeam = { ...team };

        // Define the base values
        let baseGameWin = updatedTeam.game_win;
        let baseGameLose = updatedTeam.game_lose;

        // Update based on match1 result if it's a number
        if (typeof match1 === "number") {
          const newData = calculateNewData(match1, formData["onic"]);
          updatedTeam = {
            ...updatedTeam,
            match_win: updatedTeam.match_win + newData.match_win,
            match_lose: updatedTeam.match_lose + newData.match_lose,
            game_win: baseGameWin + newData.game_win,
            game_lose:
              baseGameLose + (newData.game_lose ? newData.game_lose : 0),
          };

          // Update the base values
          baseGameWin = updatedTeam.game_win;
          baseGameLose = updatedTeam.game_lose;
        }

        // Update based on match2 result if it's a number
        if (typeof match2 === "number") {
          const newData = calculateNewData(match2, formData["btr"]);
          updatedTeam = {
            ...updatedTeam,
            match_win: updatedTeam.match_win + newData.match_win,
            match_lose: updatedTeam.match_lose + newData.match_lose,
            game_win: baseGameWin + newData.game_win,
            game_lose:
              baseGameLose + (newData.game_lose ? newData.game_lose : 0),
          };
        }

        return updatedTeam;
      } else if (typeof newValue === "number") {
        // Calculate the new data based on the numeric value

        let enemyValue = "";
        switch (teamName) {
          case "rrq":
            enemyValue = "dewa";
            break;
          case "dewa":
            enemyValue = "rrq";
            break;
          case "rbl":
            enemyValue = "geek";
            break;
          case "geek":
            enemyValue = "rbl";
            break;
          case "aura":
            enemyValue = "ae";
            break;
          case "ae":
            enemyValue = "aura";
            break;
          case "onic":
            enemyValue = "evos";
            break;
          case "btr":
            enemyValue = "evos2";
            break;
          default:
            enemyValue = "";
            break;
        }

        const evosArray = formData["evos"];
        const evos1index = evosArray[0];
        const evos2index = evosArray[1];

        const newData = calculateNewData(
          newValue,
          teamName == "onic"
            ? evos1index
            : teamName == "btr"
            ? evos2index
            : formData[enemyValue]
        );

        return {
          ...team,
          match_win: team.match_win + newData.match_win,
          match_lose: team.match_lose + newData.match_lose,
          game_win: team.game_win + newData.game_win,
          game_lose: newData.game_lose
            ? team.game_lose + newData.game_lose
            : team.game_lose,
        };
      }

      return team;
    });

    sortTeam(updatedTeams);
    setTeams(updatedTeams);
  }, [formData]);

  return (
    <div className="main-container">
      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "left",
          textDecoration: "underline",
        }}
      >
        MPL Standings
      </div>
      <TableStandings teams={teams} isMobile={isMobile} />
      <BottomInfo />

      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          textDecoration: "underline",
          marginTop: "12px",
        }}
      >
        Simulation
      </div>

      <div className="container-match">
        <div className="box-day sabtu">
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            SABTU
          </div>
          <div className="match">
            <div className="wrapper-img-input">
              <img src="./rbl.png" alt="rbl" width={40} height={40} />
              <input
                type="text"
                id="rbl"
                name="rbl"
                className="input-text"
                placeholder="input"
                value={formData.rbl}
                onChange={handleInputChange}
                maxLength={1}
              />
            </div>
            <div>-</div>
            <div className="wrapper-img-input">
              <input
                type="text"
                id="geek"
                name="geek"
                className="input-text"
                placeholder="input"
                value={formData.geek}
                onChange={handleInputChange}
                maxLength={1}
              />
              <img src="./geek.png" alt="geek" width={40} height={40} />
            </div>
          </div>
          <div className="match">
            <div className="wrapper-img-input">
              <img src="./aura.png" alt="aura" width={40} height={40} />
              <input
                type="text"
                id="aura"
                name="aura"
                className="input-text"
                placeholder="input"
                value={formData.aura}
                onChange={handleInputChange}
                maxLength={1}
              />
            </div>
            <div>-</div>
            <div className="wrapper-img-input">
              <input
                type="text"
                id="ae"
                name="ae"
                className="input-text"
                placeholder="input"
                value={formData.ae}
                onChange={handleInputChange}
                maxLength={1}
              />
              <img src="./ae.png" alt="ae" width={40} height={40} />
            </div>
          </div>
          <div className="match">
            <div className="wrapper-img-input">
              <img src="./evos.png" alt="evos" width={40} height={40} />
              <input
                type="text"
                id="evos"
                name="evos"
                className="input-text"
                placeholder="input"
                value={formData.evos[0]}
                onChange={handleInputChange}
                maxLength={1}
              />
            </div>
            <div>-</div>
            <div className="wrapper-img-input">
              <input
                type="text"
                id="onic"
                name="onic"
                className="input-text"
                placeholder="input"
                value={formData.onic}
                onChange={handleInputChange}
                maxLength={1}
              />
              <img src="./onic.png" alt="onic" width={40} height={40} />
            </div>
          </div>
        </div>
        <div className="box-day minggu">
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            MINGGU
          </div>
          <div className="match">
            <div className="wrapper-img-input">
              <img src="./btr.png" alt="btr" width={40} height={40} />
              <input
                type="text"
                id="btr"
                name="btr"
                className="input-text"
                placeholder="input"
                value={formData.btr}
                onChange={handleInputChange}
                maxLength={1}
              />
            </div>
            <div>-</div>
            <div className="wrapper-img-input">
              <input
                type="text"
                id="evos2"
                name="evos2"
                className="input-text"
                placeholder="input"
                value={formData.evos[1]}
                onChange={handleInputChange}
                maxLength={1}
              />
              <img src="./evos.png" alt="evos" width={40} height={40} />
            </div>
          </div>
          <div className="match">
            <div className="wrapper-img-input">
              <img src="./rrq.png" alt="rrq" width={40} height={40} />
              <input
                type="text"
                id="rrq"
                name="rrq"
                className="input-text"
                placeholder="input"
                value={formData.rrq}
                onChange={handleInputChange}
                maxLength={1}
              />
            </div>
            <div>-</div>
            <div className="wrapper-img-input">
              <input
                type="text"
                id="dewa"
                name="dewa"
                className="input-text"
                placeholder="input"
                value={formData.dewa}
                onChange={handleInputChange}
                maxLength={1}
              />
              <img src="./dewa.png" alt="dewa" width={40} height={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
