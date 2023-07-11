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
    const headers = [
          "Environment",
          "Branch",
          "Date",
          "Status",
          "Rollback",
          "Deploy"
    ]
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
    
    return (
      <div className="w-full h-full mx-auto">
        <div className="flex overflow-x-auto h-10 ">
          {
            headers.map((item: any, index: number) => (
              <>
                { headers.length - index === 1 || headers.length - index === 2 ? 
                  <div key={index} className="bg-blue-500 px-3 py-4 w-1/6 flex justify-center">{item}</div>
                  :
                  <div key={index} className="bg-blue-500 px-3 py-4 w-1/6 flex justify-start">{item}</div>
                }
              </>
            ))
          }
          {/* <div className="bg-blue-500 px-3 py-4 w-1/6 flex justify-center">Environment</div>
          <div className="bg-blue-500 px-3 py-4 w-1/6 flex justify-center">Date</div>
          <div className="bg-blue-500 px-3 py-4 w-1/6 flex justify-center">Status</div>
          <div className="bg-blue-500 px-3 py-4 w-1/6 flex justify-center">Rollback</div>
          <div className="bg-blue-500 px-3 py-4 w-1/6 flex justify-center">Deploy</div> */}
        </div>
        <div className="h-fit flex-col"> {/* tbody */ }
        {deployments.map((deployment, index) => (
          <React.Fragment key={index}>
            <div className="flex w-full justify-between h-15" onClick={() => handleRowClick(index)}>  {/* row */}
              <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.branch}</div>
              <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.deployment_date}</div>
              <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.status}</div>
              <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.environment}</div>
              <div className='bg-slate-200 px-3 py-4 w-1/6 flex justify-center'>O</div>
              <div className='bg-slate-200 px-3 py-4 w-1/6 flex justify-center'>O</div>
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