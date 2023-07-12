import React, { useState } from 'react'

type Deployment = {
  branch: string;
  deployment_date: string;
  status: string;
  environment: string;
  commit_hash: string;
  deployed_by: string;
  deployment_duration: string;
  rollback_status: string;
  error_logs: string;
  test_results: string;
  deployment_notes: string;
};

type Props = {
    deployments: Deployment[];
};

const DeploymentTable: React.FC<Props> = ({ deployments }) => {
    const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
    const headers = [
        "Environment",
        "Branch",
        "Date",
        "Status",
        "Rollback",
        "Deploy"
    ]
    const handleRowClick = (index: number) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
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
            </div>
            <div className="h-fit flex-col">
                {deployments.map((deployment, index) => (
                    <React.Fragment key={index}>
                        <div className="flex w-full justify-between h-15" onClick={() => handleRowClick(index)}>
                            <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.branch}</div>
                            <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.deployment_date}</div>
                            <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.status}</div>
                            <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.environment}</div>
                            <div className='bg-slate-200 px-3 py-4 w-1/6 flex justify-center'>O</div>
                            <div className='bg-slate-200 px-3 py-4 w-1/6 flex justify-center'>O</div>
                        </div>
                        {expandedRows[index] && (
                            <div className="col-span-5 border-t border-gray-200 bg-slate-400 p-2 h-56">
                                <p>{`Branch: ${deployment.branch}`}</p>
                                <p>{`Deployment Date: ${deployment.deployment_date}`}</p>
                                <p>{`Status: ${deployment.status}`}</p>
                                <p>{`Environment: ${deployment.commit_hash}`}</p>
                                <p>{`Environment: ${deployment.deployed_by}`}</p>
                                <p>{`Environment: ${deployment.deployment_duration}`}</p>
                                <p>{`Environment: ${deployment.rollback_status}`}</p>
                                <p>{`Environment: ${deployment.error_logs}`}</p>
                                <p>{`Environment: ${deployment.test_results}`}</p>
                                <p>{`Environment: ${deployment.deployment_notes}`}</p>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default DeploymentTable;
