import "./styles/index.css";
import { StatisticsHandler, SubmissionHandler } from "./lib";
import { OverallStats } from "./components/OverallStats";
import { AttemptTypeStats } from "./components/AttemptTypeStats";
import { AttemptDistribution } from "./components/AttemptDistribution";

function App() {
  const submission = SubmissionHandler.loadSubmission();
  const stats = StatisticsHandler.calculateStats(submission, null);

  return (
    <div className="app">
      <div className="container">
        <OverallStats stats={stats.overallStats} />
        <AttemptTypeStats submission={submission} />
        <AttemptDistribution
          distribution={stats.overallStats.attemptDistribution}
        />
      </div>
    </div>
  );
}

export default App;
