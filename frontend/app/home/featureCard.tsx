import React from 'react';

export function FeatureCard ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex flex-col items-start mb-8">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};