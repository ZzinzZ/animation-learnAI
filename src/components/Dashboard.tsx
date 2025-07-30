import React from "react";
import CourseGrid from "./CourseGrid";
import Calendar from "./Calendar";
import LearningInsights from "./LearningInsights";
import RecommendedSection from "./RecommendedSection";
import QuickLinks from "./QuickLinks";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Left Column - Courses */}
        <div className="lg:col-span-3 space-y-6">
          <CourseGrid />
        </div>

        {/* Center Column - Calendar & Recommendations */}
        <div className="lg:col-span-4 space-y-6">
          <Calendar />
          <RecommendedSection />
        </div>

        {/* Right Column - Insights & Quick Links */}
        <div className="lg:col-span-3 space-y-6">
          <LearningInsights />
          <QuickLinks />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
