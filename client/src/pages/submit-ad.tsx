import React from 'react';
import AdSubmissionForm from '@/components/forms/ad-submission-form';

const SubmitAd: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-dark">Submit Your Advertisement</h1>
        <p className="text-dark-medium text-lg">
          Create and submit your ad to be featured on our platform.
        </p>
      </div>
      
      <AdSubmissionForm />
    </div>
  );
};

export default SubmitAd;
