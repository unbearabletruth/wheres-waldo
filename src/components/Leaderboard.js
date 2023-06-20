import { useState, useEffect } from "react";
import { db, getLeaderboard } from "../firebaseConnection"
import uniqid from "uniqid";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState();

  useEffect(() => {
    const lbPromise = getLeaderboard(db);

    async function readLeaderboard(){
      const lbArray = await lbPromise;
      //lbArray.sort((a, b) => a.time - b.time);
      setLeaderboard(lbArray)
    }
    readLeaderboard()
  },[])

  return(
    leaderboard ?
      <table>
        <caption id="leaderboardCaption">Leaderboard's top ten</caption>
        <tbody>
        <tr>
          <th>Name</th>
          <th>Result</th>
        </tr>
        {leaderboard.map(entry => {
          return(
            <tr key={uniqid()}>
              <td>{entry.name}</td>
              <td>{entry.time}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    : null
  )
}

export default Leaderboard;