import NumbersCards from "@/helper-components/Dashboard/NumbersCards";
import AverageRatesSection from "@/helper-components/Dashboard/AverageRatesSection";
import AgeChartSection from "@/helper-components/Dashboard/AgeChartSection";
import MaleFemaleChartSection from "@/helper-components/Dashboard/MaleFemaleChartSection";
import FeedbackAnalysis from "@/helper-components/Dashboard/FeedbackAnalysis";
import FeedbackNumbersCards from "@/helper-components/Dashboard/FeedbackNumberCards";
import FeedbackNumbersSection from "@/helper-components/Dashboard/FeedbackNumbersSection";

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-1 justify-center px-10 py-12">
      <h2 className="text-2xl font-bold leading-7 text-customPurple mb-5">
        Dashboard
      </h2>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 ">
          <NumbersCards />
          <FeedbackNumbersCards />
          <AverageRatesSection />
          <AgeChartSection />
          <MaleFemaleChartSection />
          <FeedbackAnalysis />
          <FeedbackNumbersSection />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
