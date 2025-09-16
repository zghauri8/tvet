import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, AlertTriangle, ArrowRight } from "lucide-react";

interface NoTestsWarningProps {
  onStartTest: () => void;
}

export default function NoTestsWarning({ onStartTest }: NoTestsWarningProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="p-8 max-w-2xl w-full">
        <div className="text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-yellow-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Assessment Tests Found</h1>
          
          <p className="text-lg text-gray-600 mb-6">
            You haven't taken any personality assessment tests yet. To get started with your personalized learning journey, 
            please complete at least one assessment test.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-blue-800">Why Take Assessment Tests?</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-blue-800">Discover Your Strengths</h4>
                  <p className="text-blue-700 text-sm">Identify your natural talents and abilities</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-blue-800">Personalized Learning</h4>
                  <p className="text-blue-700 text-sm">Get customized course recommendations</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-blue-800">Career Guidance</h4>
                  <p className="text-blue-700 text-sm">Receive targeted career path suggestions</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-blue-800">Track Progress</h4>
                  <p className="text-blue-700 text-sm">Monitor your development over time</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={onStartTest}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              <Brain className="w-5 h-5 mr-2" />
              Start Your First Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-sm text-gray-500">
              Assessment tests take approximately 10-15 minutes to complete
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
