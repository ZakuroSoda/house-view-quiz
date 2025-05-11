export function StatCard ({ 
  number, 
  description 
}: { 
  number: number; 
  description: string;
}) {
  return (
    <div className="flex flex-col items-start mb-4">
      <div className="text-3xl text-violet-700 mb-1">
        {formatNumber(number)}
      </div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">
        {description}
      </h3>
    </div>
  );
};

function formatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
