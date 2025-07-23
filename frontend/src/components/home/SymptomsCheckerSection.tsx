
import SymptomsChecker from "@/components/SymptomsChecker";

const SymptomsCheckerSection = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-healthcare-dark mb-4">Try Our Symptoms Checker</h2>
        <p className="text-gray-600">
          Get a preliminary assessment based on your symptoms. Our AI will analyze your input and provide guidance.
        </p>
      </div>
      <SymptomsChecker />
    </div>
  );
};

export default SymptomsCheckerSection;
