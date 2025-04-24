import React from 'react';
import ViewerForm from '@/components/forms/viewer-form';
import { CheckCircle } from 'lucide-react';

const ViewerRegistration: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-dark">Join as a Viewer</h1>
        <p className="text-dark-medium text-lg">
          Follow the challenge and get exclusive updates as our participants compete.
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm max-w-2xl mx-auto overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8">
            <h3 className="text-2xl font-semibold mb-4 text-dark">Viewer Benefits</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="text-success h-5 w-5 mt-1 mr-3" />
                <span className="text-dark-medium">Real-time updates on challenge progress</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-success h-5 w-5 mt-1 mr-3" />
                <span className="text-dark-medium">Access to exclusive content and insights</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-success h-5 w-5 mt-1 mr-3" />
                <span className="text-dark-medium">Voting rights on certain challenge aspects</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-success h-5 w-5 mt-1 mr-3" />
                <span className="text-dark-medium">Early access to Season 2 participation</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-light-bg p-8">
            <h3 className="text-xl font-semibold mb-4 text-dark">Register as Viewer</h3>
            <ViewerForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerRegistration;
