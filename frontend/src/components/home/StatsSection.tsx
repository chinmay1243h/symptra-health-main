
const StatsSection = () => {
  return (
    <div className="bg-healthcare-primary/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <p className="text-4xl font-bold text-healthcare-primary">10k+</p>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-healthcare-primary">95%</p>
            <p className="text-gray-600">Accuracy Rate</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-healthcare-primary">500+</p>
            <p className="text-gray-600">Healthcare Providers</p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-healthcare-primary">24/7</p>
            <p className="text-gray-600">AI Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
