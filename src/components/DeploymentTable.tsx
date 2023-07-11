import React, { useState } from 'react'

type Deployment = {
    branch: string;
    deployment_date: string;
    status: string;
    environment: string;
  };
  
  type Props = {
    deployments: Deployment[];
  };
  
  const DeploymentTable: React.FC<Props> = ({ deployments }) => {
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
  
    const handleRowClick = (index: number) => {
      const currentIndex = expandedRows.indexOf(index);
      const newExpandedRows = [...expandedRows];
  
      if (currentIndex === -1) {
        newExpandedRows.push(index);
      } else {
        newExpandedRows.splice(currentIndex, 1);
      }
  
      setExpandedRows(newExpandedRows);
    };
    
    // <div className="border-b font-medium dark:border-neutral-500 px-6 py-4">Heading</div>
    return (
      <div className="w-full h-full mx-auto">
        <div className="flex overflow-x-auto h-10 ">
          <div className="bg-blue-500 px-3 py-4 w-1/5">heading</div>
          <div className="bg-blue-500 px-3 py-4 w-1/5">heading</div>
          <div className="bg-blue-500 px-3 py-4 w-1/5">heading</div>
          <div className="bg-blue-500 px-3 py-4 w-1/5">heading</div>
          <div className="bg-blue-500 px-3 py-4 w-1/5">heading</div>
        </div>
        <div className="h-fit flex-col"> {/* tbody */ }
        {deployments.map((deployment, index) => (
          <React.Fragment key={index}>
            <div className="flex w-full justify-between" onClick={() => handleRowClick(index)}>  {/* row */}
              <div className='bg-slate-200 px-3 py-4 w-1/5'>{deployment.branch}</div>
              <div className='bg-slate-200 px-3 py-4 w-1/5'>{deployment.deployment_date}</div>
              <div className='bg-slate-200 px-3 py-4 w-1/5'>{deployment.status}</div>
              <div className='bg-slate-200 px-3 py-4 w-1/5'>{deployment.environment}</div>
              <div className='bg-slate-200 px-3 py-4 w-1/5'>cell</div>
            </div>
            {expandedRows.includes(index) && (
              <div className="col-span-5 border-t border-gray-200 bg-slate-400 p-2 h-56">
                <p>HELLO</p>
              </div>
            )}
          </React.Fragment>
        ))}
        </div>
      </div>
    );

    // return (
    //   <div className="grid grid-cols-5 gap-4">
    //     <div className="flex-row w-max justify-between">
    //       <div className="font-bold">Branch</div>
    //       <div className="font-bold">Deployment Date</div>
    //       <div className="font-bold">Status</div>
    //       <div className="font-bold">Environment</div>
    //     </div>
    //   <div className="font-bold"></div>
    //   {deployments.map((deployment, index) => (
    //     <React.Fragment key={index}>
    //       <div className="border border-gray-200 p-2">{deployment.branch}</div>
    //       <div className="border border-gray-200 p-2">{deployment.deployment_date}</div>
    //       <div className="border border-gray-200 p-2">{deployment.status}</div>
    //       <div className="border border-gray-200 p-2">{deployment.environment}</div>
    //       <div className="border border-gray-200 p-2">
    //         <button className="text-blue-500" onClick={() => handleRowClick(index)}>
    //           {expandedRows.includes(index) ? 'Hide details' : 'Show details'}
    //         </button>
    //       </div>
    //       {expandedRows.includes(index) && (
    //         <div className="col-span-5 border-t border-gray-200 p-2">
    //           {/* Add your expandable content here */}
    //         </div>
    //       )}
    //     </React.Fragment>
    //   ))}
    // </div>
    // );
  };
  
  export default DeploymentTable;