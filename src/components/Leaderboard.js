import { useState, useEffect } from "react";
import { db, getLeaderboard } from "../firebaseConnection"

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState();

  useEffect(() => {
    const lb = getLeaderboard(db);
    async function readLeaderboard(){
      const properLB = await lb;
      console.log(properLB)
      setLeaderboard(properLB)
    }
    readLeaderboard()
  },[])
  console.log(leaderboard)
  return(
    leaderboard ?
      <table>
        <tbody>
        <tr>
          <th>Name</th>
          <th>Result</th>
        </tr>
        {leaderboard.map(entry => {
          return(
            <tr>
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